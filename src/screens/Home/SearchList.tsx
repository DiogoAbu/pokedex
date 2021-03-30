import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Bottleneck from 'bottleneck';
import { IApiResource } from 'pokeapi-typescript';
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

limiter.on('error', (err) => {
  console.log('Limiter error', err);
});

const keyExtractor = (item: Partial<ResultData>) => String(item.id);

type ResultData = {
  id: number;
  name: string;
  type: PokeApiEndpoint;
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

  const [results, setResults] = useState<ResultData[]>([]);

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
              <Text>{endpointToName(item.type)}</Text>
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

async function getResults(
  searchQuery: string,
  endpoint: PokeApiEndpoint,
  results: IApiResource<any>[],
  setResults: React.Dispatch<React.SetStateAction<ResultData[]>>,
  setIsSearchbarLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    if (!searchQuery) {
      setIsSearchbarLoading(false);
      setResults([]);
      return;
    }

    const resultsFound = await limiter.schedule(async () => {
      const tasks = resolveList(searchQuery, endpoint, results);
      return Promise.all(tasks);
    });

    setIsSearchbarLoading(false);
    requestAnimationFrame(() => {
      setResults((prev) =>
        [...prev, ...resultsFound.filter(notEmpty)].sort((a, b) => {
          const scoreA = stringSimilarity.compareTwoStrings(searchQuery, a.name!);
          const scoreB = stringSimilarity.compareTwoStrings(searchQuery, b.name!);
          return scoreB - scoreA;
        }),
      );
    });
  } catch (err) {
    console.log(err);
  }
}

function resolveList(searchQuery: string, endpoint: PokeApiEndpoint, results: IApiResource<any>[]) {
  return results.map(async (pokemon) => {
    try {
      const name: string = (pokemon as any).name;
      if (!name.toUpperCase().includes(searchQuery.toUpperCase())) {
        return null;
      }

      const data = await resolve<any>({
        endpoint: 'Pokemon',
        id: getIdFromUrl(pokemon.url),
      });
      if (!data) {
        return null;
      }

      let names = null;

      if (data.species) {
        names = await resolve<any>({ endpoint: 'PokemonSpecies', id: getIdFromUrl(data.species.url) });
        if (!names) {
          return null;
        }
      }

      return {
        id: data.id,
        type: endpoint,
        name: names?.names.find((e: any) => e.language.name === 'en')?.name,
      } as ResultData;
    } catch (err) {
      return null;
    }
  });
}

function endpointToName(endpoint: PokeApiEndpoint): string {
  switch (endpoint) {
    case 'Pokemon':
      return 'Pokémon';
    case 'Move':
      return 'Move';
    case 'Ability':
      return 'Ability';
    case 'Item':
    default:
      return 'Item';
  }
}

export default SearchList;
