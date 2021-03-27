import React, { memo } from 'react';
import { ListRenderItem, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import { IEvolutionDetail, IPokemon, IPokemonSpecies } from 'pokeapi-typescript';

import Chip from '!/components/Chip';
import Pressable from '!/components/Pressable';
import Text from '!/components/Text';
import usePokeApi from '!/hooks/use-poke-api';
import usePress from '!/hooks/use-press';
import { MainNavigationProp } from '!/types';
import capitalize from '!/utils/capitalize';
import { EvolutionChainOne } from '!/utils/get-evolution-chain';
import getIdFromUrl from '!/utils/get-id-from-url';
import getSpriteUrl from '!/utils/get-sprite-url';
import getTypeColor from '!/utils/get-type-color';

import styles from './styles';

const mutateDataSpecies = ({ names, varieties }: IPokemonSpecies): Partial<IPokemonSpecies> => ({
  names,
  varieties,
});
const mutateDataPokemon = ({ id, name, types }: IPokemon): Partial<IPokemon> => ({ id, name, types });

const EvolutionItem: ListRenderItem<Required<EvolutionChainOne>> = ({ item: evolution }) => {
  const navigation = useNavigation<MainNavigationProp<'PokemonDetails'>>();
  const { colors } = useTheme();

  const { data: fromSpecies } = usePokeApi({
    endpoint: 'PokemonSpecies',
    id: getIdFromUrl(evolution.fromSpecies.url),
    page: undefined,
    mutateData: mutateDataSpecies,
  });
  const { data: toSpecies } = usePokeApi({
    endpoint: 'PokemonSpecies',
    id: getIdFromUrl(evolution.toSpecies.url),
    page: undefined,
    mutateData: mutateDataSpecies,
  });

  const fromSpeciesPokemonUrl = fromSpecies?.varieties?.find((e) => e.is_default)?.pokemon.url;
  const { data: fromPokemon } = usePokeApi({
    endpoint: 'Pokemon',
    id: fromSpeciesPokemonUrl ? getIdFromUrl(fromSpeciesPokemonUrl) : undefined,
    page: undefined,
    mutateData: mutateDataPokemon,
  });
  const toSpeciesPokemonUrl = toSpecies?.varieties?.find((e) => e.is_default)?.pokemon.url;
  const { data: toPokemon } = usePokeApi({
    endpoint: 'Pokemon',
    id: toSpeciesPokemonUrl ? getIdFromUrl(toSpeciesPokemonUrl) : undefined,
    page: undefined,
    mutateData: mutateDataPokemon,
  });

  const fromDisplayName = fromSpecies?.names?.find((e) => e.language.name === 'en')?.name;
  const toDisplayName = toSpecies?.names?.find((e) => e.language.name === 'en')?.name;

  const handleGoToFromPokemon = usePress(() => {
    if (!fromPokemon) {
      return;
    }
    const backgroundColor = getTypeColor(fromPokemon?.types)!;
    requestAnimationFrame(() => {
      navigation.push('PokemonDetails', {
        resource: 'pokemons',
        id: fromPokemon.id!,
        name: fromPokemon.name!,
        displayName: fromDisplayName!,
        types: fromPokemon.types!,
        spriteUrl: getSpriteUrl(fromPokemon.name!),
        backgroundColor,
      });
    });
  });

  const handleGoToToPokemon = usePress(() => {
    if (!toPokemon) {
      return;
    }
    const backgroundColor = getTypeColor(toPokemon?.types)!;
    requestAnimationFrame(() => {
      navigation.push('PokemonDetails', {
        resource: 'pokemons',
        id: toPokemon.id!,
        name: toPokemon.name!,
        displayName: toDisplayName!,
        types: toPokemon.types!,
        spriteUrl: getSpriteUrl(toPokemon.name!),
        backgroundColor,
        skipShared: true,
      });
    });
  });

  if (!fromPokemon || !toPokemon || !fromDisplayName || !toDisplayName) {
    return null;
  }

  const conditions = getEvolutionConditions(evolution.condition);

  return (
    <View style={styles.evolutionContainer}>
      <Pressable onPress={handleGoToFromPokemon} style={styles.evolutionPressable}>
        <FastImage
          source={require('!/assets/pokeball.png')}
          style={styles.evolutionPokeballImage}
          tintColor={colors.background}
        />

        <FastImage source={{ uri: getSpriteUrl(fromPokemon.name!) }} style={styles.evolutionPokemonSprite} />

        <Text style={styles.evolutionPokemonName}>{fromDisplayName}</Text>
      </Pressable>

      <Pressable onPress={handleGoToToPokemon} style={styles.evolutionPressable}>
        <FastImage
          source={require('!/assets/pokeball.png')}
          style={styles.evolutionPokeballImage}
          tintColor={colors.background}
        />

        <FastImage source={{ uri: getSpriteUrl(toPokemon.name!) }} style={styles.evolutionPokemonSprite} />

        <Text style={styles.evolutionPokemonName}>{toDisplayName}</Text>
      </Pressable>

      <View style={styles.evolutionConditionContainer}>
        {conditions.map(([key, value]) => (
          <Chip containerStyle={styles.evolutionChip} key={key}>
            {capitalize(key.replace(/[_-]/g, ' '), true)}
            {': '}
            {value?.name || value
              ? capitalize(String(value?.name ?? value).replace(/[_-]/g, ' '), true)
              : null}
          </Chip>
        ))}
      </View>
    </View>
  );
};

function getEvolutionConditions(condition: IEvolutionDetail) {
  const entries = Object.entries(condition).filter(([key, value]) => {
    return key !== 'trigger' && value;
  });
  return entries;
}

export default memo(EvolutionItem);
