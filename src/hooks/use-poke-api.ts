import { useCallback, useEffect, useRef, useState } from 'react';

import { MMKV as storage } from 'react-native-mmkv';
import PokeAPI, { IApiResourceList } from 'pokeapi-typescript';

import { GenericOfPokeApi, PokeApiEndpoint } from '!/types';

const limit = 20;

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
  autoRequest = true,
}: {
  endpoint: Endpoint;
  id?: number;
  page?: Page;
  mutateData?: MutateFunc;
  autoRequest?: boolean;
}) {
  const isMounted = useRef(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<ResponseData | null>(null);

  const makeRequest = useCallback(async () => {
    if (!isMounted.current) {
      return;
    }

    setLoading(true);

    if (!endpoint) {
      // console.log('usePokeApi "endpoint" must be defined', { endpoint });
      return;
    }
    if (!id && !page) {
      // console.log('usePokeApi "id" or "page" must be defined', { endpoint, id, page });
      return;
    }

    const storageKey = getStorageKey({ endpoint, id, page });

    let responseData: ResponseData | null = null;
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
      try {
        // Find out what to fetch
        if (id) {
          // @ts-ignore
          responseData = await PokeAPI[endpoint].fetch(id);
        } else if (page) {
          const offset = (page! - 1) * limit;
          // @ts-ignore
          responseData = await PokeAPI[endpoint].list(limit, offset);
        }
        // Write to storage
        storage.set(storageKey, JSON.stringify(responseData));
      } catch (err) {
        console.error(err);

        requestAnimationFrame(() => {
          if (!isMounted.current) {
            return;
          }

          setError(err?.toString() ?? 'Something went wrong');
        });
      }
    }

    if (responseData && mutateData) {
      responseData = mutateData(responseData as Required<ResponseData>);
    }

    requestAnimationFrame(() => {
      if (!isMounted.current) {
        return;
      }

      setLoading(false);

      if (page && responseData) {
        // Append to previous data
        setData((prev) => {
          return {
            ...responseData,
            results: [...((prev as any)?.results || []), ...(responseData as any)?.results],
          } as any;
        });
      } else {
        // Overwrite data
        setData(responseData);
      }
    });
  }, [endpoint, id, page, mutateData]);

  useEffect(() => {
    isMounted.current = true;

    if (autoRequest) {
      requestAnimationFrame(() => {
        void makeRequest();
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [makeRequest, autoRequest]);

  return { loading, error, data, makeRequest };
}

function getStorageKey({ endpoint, id, page }: { endpoint: string; id?: number; page?: number }): string {
  if (page) {
    return `${endpoint}/page/${String(page)}`;
  }
  return `${endpoint}/${String(id)}`;
}
