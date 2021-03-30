import React, { FC } from 'react';
import { View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { IPokemon } from 'pokeapi-typescript';

import usePokeApi from '!/hooks/use-poke-api';
import getSpriteDefault from '!/utils/get-sprite-small';

import styles from './styles';

export interface PokemonTeamSpriteProps {
  pokemonId: number;
}

const mutateDataPokemon = ({ sprites }: IPokemon): Partial<IPokemon> => ({ sprites });

const PokemonTeamSprite: FC<PokemonTeamSpriteProps> = ({ pokemonId }) => {
  const { data: pokemon } = usePokeApi({
    endpoint: 'Pokemon',
    id: pokemonId,
    page: undefined,
    mutateData: mutateDataPokemon,
  });

  return (
    <View style={styles.pokemonTeamSpriteContainer}>
      <View style={styles.pokemonTeamPokeballContainer}>
        <FastImage source={require('!/assets/pokeball.png')} style={styles.pokemonTeamPokeball} />
      </View>
      {pokemon ? (
        <FastImage source={{ uri: getSpriteDefault(pokemon.sprites!) }} style={styles.pokemonTeamSprite} />
      ) : null}
    </View>
  );
};

export default PokemonTeamSprite;
