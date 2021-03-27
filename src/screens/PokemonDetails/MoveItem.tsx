import React, { memo } from 'react';
import { InteractionManager, ListRenderItem } from 'react-native';

import { IItem, IPokemonMove } from 'pokeapi-typescript';

import Badge from '!/components/Badge';
import ChipType from '!/components/ChipType';
import ListItem from '!/components/ListItem';
import Text from '!/components/Text';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePokeApi from '!/hooks/use-poke-api';
import getIdFromUrl from '!/utils/get-id-from-url';
import getTypeColor from '!/utils/get-type-color';

import styles from './styles';

const mutateDataMachineItem = ({ names }: IItem): Partial<IItem> => ({ names });

const MoveItem: ListRenderItem<IPokemonMove> = ({ item }) => {
  const { data: move, makeRequest } = usePokeApi({
    endpoint: 'Move',
    id: getIdFromUrl(item.move.url),
    page: undefined,
    autoRequest: false,
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

  useFocusEffect(() => {
    void InteractionManager.runAfterInteractions(() => {
      void makeRequest();
    });
  }, [makeRequest]);

  if (!move) {
    return null;
  }

  const backgroundColor = getTypeColor(move.type.name);
  const learnMethodName = item.version_group_details[0].move_learn_method.name;

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

  return (
    <ListItem
      renderCenter={
        <>
          <Text style={styles.moveItemName}>{move?.names.find((e) => e.language.name === 'en')?.name}</Text>
          <Text>{learn}</Text>
        </>
      }
      renderLeft={<Badge>{move.generation.name.split('-').pop()?.toUpperCase()}</Badge>}
      renderRight={<ChipType containerStyle={{ backgroundColor }} type={move.type} />}
    />
  );
};

export default memo(MoveItem);
