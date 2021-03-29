import React, { FC, useMemo } from 'react';
import { FlatList, Platform } from 'react-native';

import { IPokemon } from 'pokeapi-typescript';

import MoveItem from '!/components/MoveItem';
import Separator from '!/components/Separator';
import Text from '!/components/Text';
import sortMoves from '!/utils/sort-moves';

import styles from './styles';

interface Props {
  pokemon: IPokemon;
}

const Moves: FC<Props> = ({ pokemon }) => {
  const moves = useMemo(() => sortMoves(pokemon.moves), [pokemon.moves]);

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
