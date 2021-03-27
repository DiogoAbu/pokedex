import React, { FC, useMemo } from 'react';
import { FlatList, Platform } from 'react-native';

import { IPokemon } from 'pokeapi-typescript';
import sortArray from 'sort-array';

import Separator from '!/components/Separator';
import Text from '!/components/Text';
import getIdFromUrl from '!/utils/get-id-from-url';

import MoveItem from './MoveItem';
import styles from './styles';

interface Props {
  pokemon: IPokemon;
}

const Moves: FC<Props> = ({ pokemon }) => {
  const moves = useMemo(() => {
    return sortArray(pokemon.moves, {
      by: ['learnMethod', 'levelLearnedAt', 'learnMethodId', 'moveId'],
      order: ['learnMethod', 'levelLearnedAt', 'learnMethodId', 'moveId'],
      customOrders: {
        learnMethod: [
          'level-up',
          'machine',
          'egg',
          'tutor',
          'stadium-surfing-pikachu',
          'light-ball-egg',
          'colosseum-purification',
          'xd-shadow',
          'xd-purification',
          'form-change',
        ],
      },
      computed: {
        learnMethod: (item) => {
          return item.version_group_details[0].move_learn_method.name;
        },
        learnMethodId: (item) => {
          return getIdFromUrl(item.version_group_details[0].move_learn_method.url);
        },
        levelLearnedAt: (item) => {
          return item.version_group_details[0].level_learned_at;
        },
        moveId: (item) => {
          return getIdFromUrl(item.move.url);
        },
      },
    });
  }, [pokemon.moves]);

  return (
    <FlatList
      data={moves}
      initialNumToRender={10}
      ItemSeparatorComponent={Separator}
      keyExtractor={(item) => item.move.name}
      ListEmptyComponent={<Text style={styles.tabEmptyText}>No moves found!</Text>}
      maxToRenderPerBatch={2}
      removeClippedSubviews={Platform.OS === 'android'}
      renderItem={(props) => <MoveItem {...props} />}
      scrollEventThrottle={16}
      updateCellsBatchingPeriod={100}
      windowSize={16}
    />
  );
};

export default Moves;
