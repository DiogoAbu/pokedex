import React, { FC } from 'react';
import { FlatList, Platform } from 'react-native';

import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useTheme } from '@react-navigation/native';
import { IPokemonSpecies } from 'pokeapi-typescript';

import Separator from '!/components/Separator';
import Text from '!/components/Text';
import usePokeApi from '!/hooks/use-poke-api';
import { constants } from '!/services/theme';
import getEvolutionChain, { EvolutionChainOne } from '!/utils/get-evolution-chain';
import getIdFromUrl from '!/utils/get-id-from-url';

import EvolutionItem from './EvolutionItem';
import styles from './styles';

interface Props {
  species: IPokemonSpecies;
  displayFooterImage: boolean;
}

const Evolution: FC<Props> = ({ species, displayFooterImage }) => {
  const { colors } = useTheme();

  const { data: evolution, loading } = usePokeApi({
    endpoint: 'EvolutionChain',
    id: getIdFromUrl(species.evolution_chain.url),
    page: undefined,
    mutateData: undefined,
  });

  const evolutionChain = evolution ? getEvolutionChain(evolution) : [];

  return (
    <>
      <FlatList
        contentContainerStyle={{ padding: constants.grid }}
        data={evolutionChain.filter((item) => item.fromSpecies) as Required<EvolutionChainOne>[]}
        initialNumToRender={10}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.fromSpecies.name + item.toSpecies.name}
        ListEmptyComponent={
          loading || !evolution ? (
            <SkeletonContent
              boneColor={colors.card}
              containerStyle={styles.evolutionContainer}
              duration={constants.shimmerDuration}
              highlightColor={colors.primary}
              isLoading
              layout={[
                {
                  key: 'pokemon-from',
                  width: 96,
                  height: 96,
                  borderRadius: 96,
                },
                {
                  key: 'condition',
                  width: 64,
                  height: constants.gridBig,
                },
                {
                  key: 'pokemon-to',
                  width: 96,
                  height: 96,
                  borderRadius: 96,
                },
              ]}
            />
          ) : (
            <Text style={styles.tabEmptyText}>No evolution found!</Text>
          )
        }
        maxToRenderPerBatch={2}
        removeClippedSubviews={Platform.OS === 'android'}
        renderItem={(props) => <EvolutionItem {...props} />}
        scrollEventThrottle={16}
        updateCellsBatchingPeriod={100}
        windowSize={16}
      />

      {displayFooterImage ? (
        <FastImage resizeMode='contain' source={require('!/assets/snorlax.png')} style={styles.footerImage} />
      ) : null}
    </>
  );
};

export default Evolution;
