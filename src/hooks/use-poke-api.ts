import { useCallback, useEffect, useRef, useState } from 'react';

import { MMKV as storage } from 'react-native-mmkv';
import Snackbar from 'react-native-snackbar';
import PokeAPI, { Endpoint as EndpointClass, IApiResourceList } from 'pokeapi-typescript';

import limiter from '!/services/limiter';
import { GenericOfPokeApi, PokeApiEndpoint } from '!/types';
import { dismissSingletonSnackbar, showSingletonSnackbar } from '!/utils/show-singleton-snackbar';

const LIST_LIMIT = 20;
const FETCH_TIMEOUT = 60000;

type OneOrMany<Page, ResponseData> = Page extends number ? IApiResourceList<ResponseData> : ResponseData;
// eslint-disable-next-line @typescript-eslint/ban-types
type IsPartial<MutateFunc, ResponseData> = MutateFunc extends Function ? Partial<ResponseData> : ResponseData;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function usePokeApi<
  Endpoint extends PokeApiEndpoint,
  Page extends number | undefined,
  MutateFunc extends ((data: Required<ResponseData>) => ResponseData) | undefined,
  ResponseData extends IsPartial<MutateFunc, OneOrMany<Page, GenericOfPokeApi<typeof PokeAPI[Endpoint]>>>
>({
  endpoint,
  id,
  page,
  mutateData,
  priority,
}: {
  endpoint: Endpoint;
  id?: number;
  page?: Page;
  mutateData?: MutateFunc;
  priority?: number;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<ResponseData | null>(null);
  const isMounted = useRef(false);
  const abortController = useRef<AbortController | null>(null);

  const makeRequest = useCallback(() => {
    if (!isMounted.current) {
      // console.log('NOT MOUNTED -> Stopping request');
      return () => {
        isMounted.current = false;
        abortController.current?.abort();
      };
    }

    // Prepare abort signal
    abortController.current = new AbortController();

    const fetchOptions: RequestInit = { signal: abortController.current.signal };

    setLoading(true);

    if (!endpoint) {
      // console.log('usePokeApi "endpoint" must be defined', { endpoint });
      return () => {
        isMounted.current = false;
        abortController.current?.abort();
      };
    }
    if (typeof id !== 'number' && typeof page !== 'number') {
      // console.log('usePokeApi "id" or "page" must be defined', { endpoint, id, page });
      return () => {
        isMounted.current = false;
        abortController.current?.abort();
      };
    }

    limiter
      .schedule({ priority }, async () => {
        if (!isMounted.current) {
          // console.log('NOT MOUNTED -> Skipping data retrieval');
          return;
        }

        // Start abort timeout
        const abortTimeoutHandler = setTimeout(() => {
          abortController.current?.abort();
        }, FETCH_TIMEOUT);

        let responseData: ResponseData | null = await resolve<ResponseData>({
          endpoint,
          id,
          page,
          fetchOptions,
        });

        clearTimeout(abortTimeoutHandler);

        if (responseData && mutateData) {
          responseData = mutateData(responseData as Required<ResponseData>);
        }

        if (!isMounted.current) {
          // console.log('NOT MOUNTED -> Skipping set data');
          return;
        }
        // console.log('MOUNTED -> Setting response data');

        requestAnimationFrame(() => {
          setLoading(false);
          setError('');

          if (page && responseData) {
            // Append to previous data
            setData((prev) => {
              return {
                ...responseData,
                results: [
                  ...((prev as Record<string, never>)?.results || []),
                  ...(responseData as Record<string, never>)?.results,
                ],
              } as ResponseData;
            });
          } else {
            // Overwrite data
            setData(responseData);
          }
        });
      })
      .catch((err) => {
        // API fetch error
        console.log('API fetch error', endpoint, `id: ${String(id)}`, `page: ${String(page)}`, err);

        let text = 'Some data could not be retrieved. Please, check you internet connection.';
        if (err.name === 'SyntaxError') {
          text = 'The API returned invalid data. Please, try again later.';
        } else if (err.name === 'AbortError') {
          text = 'The API took too long to respond. Please, try again later.';
        }

        showSingletonSnackbar({
          text,
          numberOfLines: 4,
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: 'OK',
            onPress: () => dismissSingletonSnackbar(),
          },
        });

        requestAnimationFrame(() => {
          if (!isMounted.current) {
            // console.log('NOT MOUNTED -> Skipping set error');
            return;
          }
          setLoading(false);
          setError(err?.toString() ?? 'Something went wrong');
        });
      });

    return () => {
      isMounted.current = false;
      abortController.current?.abort();
    };
  }, [endpoint, id, page, priority, mutateData]);

  useEffect(() => {
    isMounted.current = true;
    return makeRequest();
  }, [makeRequest]);

  return {
    loading,
    error,
    data,
    makeRequest,
  };
}

export async function resolve<ResponseData = never>({
  endpoint,
  id,
  page,
  fetchOptions,
}: {
  endpoint: PokeApiEndpoint;
  id?: number;
  page?: number;
  fetchOptions?: RequestInit;
}): Promise<ResponseData | null> {
  let responseData: ResponseData | null = null;
  const storageKey = getStorageKey({ endpoint, id, page });

  try {
    // Read from storage
    const dataStored = storage.getString(storageKey);
    if (!dataStored) {
      // Storage invalid, get from api
      throw new Error('Data from storage is invalid');
    }
    // Got data
    responseData = JSON.parse(dataStored);
  } catch {
    // Get from api
    if (id) {
      // Fetch by id
      responseData = ((await apiFetch({ endpoint, id, fetchOptions })) as unknown) as ResponseData;
    } else if (typeof page === 'number') {
      if (page === 0) {
        // Fetch all results
        responseData = ((await apiListAll({ endpoint, fetchOptions })) as unknown) as ResponseData;
      } else if (page > 0) {
        // Fetch results by page
        responseData = ((await apiList({ endpoint, page, fetchOptions })) as unknown) as ResponseData;
      }
    }

    // Write to storage
    storage.set(storageKey, JSON.stringify(responseData));
  }

  return responseData;
}

/**
 * Build key used to store data
 */
function getStorageKey({
  endpoint,
  id,
  page,
}: {
  endpoint: PokeApiEndpoint;
  id?: number;
  page?: number;
}): string {
  if (page) {
    return `${endpoint}?page=${String(page)}`;
  }
  return `${endpoint}/${String(id)}`;
}

/**
 * Make api call to Pok??API fetching one result for the endpoint
 */
async function apiFetch({
  endpoint,
  id,
  fetchOptions,
}: {
  endpoint: PokeApiEndpoint;
  id: number;
  fetchOptions?: RequestInit;
}) {
  // @ts-ignore
  const api = PokeAPI[endpoint] as EndpointClass<typeof endpoint>;
  return api.fetch(id, false, fetchOptions);
}

/**
 * Make api call to Pok??API fetching multiple results for the endpoint
 */
async function apiList({
  endpoint,
  page,
  fetchOptions,
}: {
  endpoint: PokeApiEndpoint;
  page: number;
  fetchOptions?: RequestInit;
}) {
  // @ts-ignore
  const api = PokeAPI[endpoint] as EndpointClass<typeof endpoint>;
  const offset = (page - 1) * LIST_LIMIT;
  return api.list(LIST_LIMIT, offset, fetchOptions);
}

/**
 * Make api call to Pok??API fetching all results for the endpoint
 */
async function apiListAll({
  endpoint,
  fetchOptions,
}: {
  endpoint: PokeApiEndpoint;
  fetchOptions?: RequestInit;
}) {
  // @ts-ignore
  const api = PokeAPI[endpoint] as EndpointClass<typeof endpoint>;
  return api.listAll(false, fetchOptions);
}
