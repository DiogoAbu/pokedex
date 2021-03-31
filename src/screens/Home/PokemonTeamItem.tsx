import React, { memo } from 'react';
import { ListRenderItem, View } from 'react-native';

import Pressable from '!/components/Pressable';
import Text from '!/components/Text';
import { PokeTeam } from '!/hooks/use-team';

import PokemonTeamSprite from './PokemonTeamSprite';
import styles from './styles';

const PokemonTeamItem: ListRenderItem<PokeTeam> = ({ item: team }) => {
  return (
    <Pressable
      androidRipple={{ borderless: false }}
      onPress={() => undefined}
      style={styles.pokemonTeamContainer}
    >
      <Text style={styles.pokemonTeamName}>{team.name}</Text>

      <View style={styles.pokemonTeamRow}>
        {team.pokemonIds.map((id, index) => (
          <PokemonTeamSprite key={`${id}-${index.toString()}`} pokemonId={id} />
        ))}
      </View>
    </Pressable>
  );
};

export default memo(PokemonTeamItem, (prev, next) => {
  return (
    prev.item.name === next.item.name ||
    prev.item.pokemonIds.every((id, index) => id === next.item.pokemonIds[index])
  );
});
