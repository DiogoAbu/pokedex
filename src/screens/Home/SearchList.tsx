import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Bottleneck from 'bottleneck';
import { IApiResource, IName, IPokemon, IPokemonSpecies } from 'pokeapi-typescript';
import stringSimilarity from 'string-similarity';

import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import Separator from '!/components/Separator';
import Text from '!/components/Text';
import usePokeApi, { resolve } from '!/hooks/use-poke-api';
import { PokeApiEndpoint } from '!/types';
import getIdFromUrl from '!/utils/get-id-from-url';
import notEmpty from '!/utils/not-empty';

import styles from './styles';

const limiter = new Bottleneck({
  maxConcurrent: 3,
});

const keyExtractor = (item: SearchResult) => `${item.type}/${item.name}/${String(item.id)}`;

type CommonResponse = {
  id: number;
  names: IName[];
  species?: IPokemon['species'];
};

type SearchResult = {
  id: number;
  name: string;
  type: string;
};

export interface SearchListProps {
  searchQuery: string;
  setIsSearchbarLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchList: FC<SearchListProps> = ({ searchQuery, setIsSearchbarLoading }) => {
  const insets = useSafeAreaInsets();

  const { data: pokemonList } = usePokeApi({
    endpoint: 'Pokemon',
    id: undefined,
    page: 0,
  });
  const { data: moveList } = usePokeApi({
    endpoint: 'Move',
    id: undefined,
    page: 0,
  });
  const { data: abilityList } = usePokeApi({
    endpoint: 'Ability',
    id: undefined,
    page: 0,
  });
  const { data: itemList } = usePokeApi({
    endpoint: 'Item',
    id: undefined,
    page: 0,
  });

  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    setResults([]);
  }, [searchQuery]);

  useEffect(() => {
    if (pokemonList) {
      void getResults(searchQuery, 'Pokemon', pokemonList.results, setResults, setIsSearchbarLoading);
    }
  }, [pokemonList, searchQuery, setIsSearchbarLoading]);

  useEffect(() => {
    if (moveList) {
      void getResults(searchQuery, 'Move', moveList.results, setResults, setIsSearchbarLoading);
    }
  }, [moveList, searchQuery, setIsSearchbarLoading]);

  useEffect(() => {
    if (abilityList) {
      void getResults(searchQuery, 'Ability', abilityList.results, setResults, setIsSearchbarLoading);
    }
  }, [abilityList, searchQuery, setIsSearchbarLoading]);

  useEffect(() => {
    if (itemList) {
      void getResults(searchQuery, 'Item', itemList.results, setResults, setIsSearchbarLoading);
    }
  }, [itemList, searchQuery, setIsSearchbarLoading]);

  return (
    <FlatList
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
        },
      ]}
      data={results}
      initialNumToRender={10}
      ItemSeparatorComponent={Separator}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={2}
      renderItem={({ item }) => (
        <ListItem
          renderCenter={
            <>
              <Text style={styles.searchListItemTitle}>{item.name}</Text>

              <Text>{item.type}</Text>
            </>
          }
          renderRight={<Icon name='chevron-right' size={32} />}
        />
      )}
      updateCellsBatchingPeriod={100}
      windowSize={16}
    />
  );
};

async function getResults<Response extends unknown>(
  searchQuery: string,
  endpoint: PokeApiEndpoint,
  results: IApiResource<Response>[],
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>,
  setIsSearchbarLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  try {
    // No query, so we have no results
    if (!searchQuery) {
      setIsSearchbarLoading(false);
      setResults([]);
      return;
    }

    // Limit api calls
    const resultsFound = await limiter.schedule(async () => {
      setIsSearchbarLoading(true);

      // For each api result get search result data
      const tasks = results.map(async (each) => {
        return resolveOneResource<IApiResource<Response>>(each, searchQuery, endpoint);
      });

      return Promise.all(tasks);
    });

    setIsSearchbarLoading(false);
    requestAnimationFrame(() => {
      setResults((prev) =>
        [...prev, ...resultsFound.filter(notEmpty)].sort((a, b) => {
          const scoreA = stringSimilarity.compareTwoStrings(searchQuery, a.name);
          const scoreB = stringSimilarity.compareTwoStrings(searchQuery, b.name);
          return scoreB - scoreA;
        }),
      );
    });
  } catch (err) {
    console.log(err);
  }
}

async function resolveOneResource<Each = unknown, Response extends CommonResponse = CommonResponse>(
  resource: Each,
  searchQuery: string,
  endpoint: PokeApiEndpoint,
): Promise<SearchResult | null> {
  try {
    const each = (resource as unknown) as Record<string, string>;

    const resourceName = each.name.toLowerCase().replace(/[^a-z0-9]/g, ' ');
    const nameWords = resourceName.split(' ');

    const query = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, ' ');
    if (!resourceName.includes(query) && !nameWords.some((word) => word.includes(query))) {
      return null;
    }

    // Get main data
    const data = await resolve<Response>({
      endpoint,
      id: getIdFromUrl(each.url),
    });
    if (!data) {
      return null;
    }

    // Get names in various languages
    let names: IName[] = data.names ?? [];

    // If it has species, get the name from it
    if (data.species) {
      const species = await resolve<IPokemonSpecies>({
        endpoint: 'PokemonSpecies',
        id: getIdFromUrl(data.species.url),
      });
      names = species?.names ?? [];
    }

    // No name available, skip this one
    if (!names.length) {
      return null;
    }

    // Find name for current language
    const name = names.find((e) => e.language.name === 'en')!.name;

    return { id: data.id, type: endpointToName(endpoint), name };
  } catch (err) {
    return null;
  }
}

function endpointToName(endpoint: PokeApiEndpoint): string {
  switch (endpoint) {
    case 'Pokemon':
      return 'Pokémon';
    default:
      return endpoint;
  }
}

export default SearchList;
