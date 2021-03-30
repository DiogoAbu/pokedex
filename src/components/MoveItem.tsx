import React, { memo } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';

import { IItem, IPokemonMove } from 'pokeapi-typescript';

import Badge from '!/components/Badge';
import ChipType from '!/components/ChipType';
import ListItem from '!/components/ListItem';
import Text from '!/components/Text';
import usePokeApi from '!/hooks/use-poke-api';
import { LearnMethodName } from '!/types';
import getIdFromUrl from '!/utils/get-id-from-url';
import getTypeColor from '!/utils/get-type-color';

const mutateDataMachineItem = ({ names }: IItem): Partial<IItem> => ({ names });

const MoveItem: ListRenderItem<IPokemonMove> = ({ item, index }) => {
  const { data: move } = usePokeApi({
    endpoint: 'Move',
    id: getIdFromUrl(item.move.url),
    page: undefined,
  });

  const { data: machine } = usePokeApi({
    endpoint: 'Machine',
    id: move?.machines?.[0]?.machine?.url ? getIdFromUrl(move.machines[0].machine.url) : undefined,
    page: undefined,
  });

  const { data: machineItem } = usePokeApi({
    endpoint: 'Item',
    id: machine?.item.url ? getIdFromUrl(machine?.item.url) : undefined,
    page: undefined,
    mutateData: mutateDataMachineItem,
  });

  const backgroundColor = getTypeColor(move?.type.name);
  const learnMethodName = item.version_group_details[0].move_learn_method.name as LearnMethodName;

  let learn = '...';
  if (learnMethodName === 'level-up') {
    const levelLearnedAt = item.version_group_details[0].level_learned_at;
    learn = `Learn at Lv.${levelLearnedAt}`;
  } else if (learnMethodName === 'machine') {
    learn = `Learn by using: ${machineItem?.names?.find((e) => e.language.name === 'en')?.name ?? '...'}`;
  } else if (learnMethodName === 'egg') {
    learn = `Learn by breeding`;
  } else if (learnMethodName === 'tutor') {
    learn = `Learn by tutoring`;
  }

  if (!move && index >= 10) {
    return null;
  }

  return (
    <ListItem
      loading={!move && index < 10}
      renderCenter={
        <>
          <Text style={styles.moveItemName}>{move?.names.find((e) => e.language.name === 'en')?.name}</Text>
          <Text>{learn}</Text>
        </>
      }
      renderLeft={<Badge>{move?.generation.name.split('-').pop()?.toUpperCase()}</Badge>}
      renderRight={<ChipType containerStyle={{ backgroundColor }} type={move?.type} />}
    />
  );
};

const styles = StyleSheet.create({
  moveItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(MoveItem, (prev, next) => {
  return prev.item.move.url === next.item.move.url;
});
