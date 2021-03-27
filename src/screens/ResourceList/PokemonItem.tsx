import React, { memo, useEffect } from 'react';
import { InteractionManager, ListRenderItem, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation, useTheme } from '@react-navigation/native';
import { IApiResource, IPokemon } from 'pokeapi-typescript';

import CardBackground from '!/components/CardBackground';
import Icon from '!/components/Icon';
import Text from '!/components/Text';
import usePokeApi from '!/hooks/use-poke-api';
import usePress from '!/hooks/use-press';
import { constants } from '!/services/theme';
import { MainNavigationProp } from '!/types';
import getIdFromUrl from '!/utils/get-id-from-url';
import getSpriteUrl from '!/utils/get-sprite-url';
import getTypeColor from '!/utils/get-type-color';

import ChipType from '../../components/ChipType';

import styles from './styles';

const mutateDataPokemon = ({ id, name, types, species }: IPokemon): Partial<IPokemon> => ({
  id,
  name,
  types,
  species,
});

const PokemonItem: ListRenderItem<IApiResource<IPokemon>> = ({ item }) => {
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();
  const { colors } = useTheme();

  const { data: pokemon, loading: loadingPokemon, makeRequest: makeRequestPokemon } = usePokeApi({
    endpoint: 'Pokemon',
    id: getIdFromUrl(item.url),
    page: undefined,
    mutateData: mutateDataPokemon,
    autoRequest: false,
  });

  const { data: species, loading: loadingSpecies } = usePokeApi({
    endpoint: 'PokemonSpecies',
    id: pokemon?.species?.url ? getIdFromUrl(pokemon.species.url) : undefined,
    page: undefined,
    mutateData: undefined,
  });

  const backgroundColor = getTypeColor(pokemon?.types);
  const displayName = species?.names.find((e) => e.language.name === 'en')?.name;

  const handleGoToDetails = usePress(() => {
    if (pokemon && species) {
      requestAnimationFrame(() => {
        navigation.navigate('PokemonDetails', {
          resource: 'pokemons',
          id: pokemon.id!,
          name: species.name!,
          displayName: displayName!,
          types: pokemon.types!,
          spriteUrl: getSpriteUrl(pokemon.name!),
          backgroundColor: backgroundColor!,
        });
      });
    }
  });

  useEffect(() => {
    void InteractionManager.runAfterInteractions(() => {
      void makeRequestPokemon();
    });
  }, [makeRequestPokemon]);

  if (loadingPokemon || loadingSpecies) {
    return (
      <SkeletonContent
        boneColor={colors.card}
        containerStyle={[styles.skeletonContainer, { backgroundColor: colors.card }]}
        duration={800}
        highlightColor={colors.primary}
        isLoading
        layout={[
          {
            key: 'column',
            children: [
              {
                key: 'title',
                width: 192,
                height: 24,
                marginLeft: constants.gridSmall,
                marginTop: constants.grid,
              },
              {
                key: 'type',
                width: 64,
                height: 16,
                marginLeft: constants.gridSmall,
                marginTop: constants.grid,
              },
            ],
          },
          {
            key: 'image',
            width: 96,
            height: 96,
            borderRadius: 48,
            marginBottom: constants.gridSmall,
            alignSelf: 'flex-end',
          },
        ]}
      />
    );
  }

  if (!pokemon || !species) {
    return null;
  }

  return (
    <CardBackground
      backgroundColor={backgroundColor}
      onPress={pokemon ? handleGoToDetails : undefined}
      outerStyle={styles.cardContainer}
      right
    >
      <SharedElement id={`pokemon.sprite.${pokemon.id!}`} style={styles.cardSpriteImageContainer}>
        <FastImage source={{ uri: getSpriteUrl(pokemon.name!) }} style={styles.cardSpriteImage} />
      </SharedElement>

      <View style={styles.cardTopContainer}>
        <Text style={[styles.cardName, { color: constants.colors.white }]}>
          {displayName?.replace(/[♀♂]/g, '')}{' '}
          {displayName?.endsWith('♀') ? (
            <Icon color={constants.colors.white} name='gender-female' size={24} />
          ) : displayName?.endsWith('♂') ? (
            <Icon color={constants.colors.white} name='gender-male' size={24} />
          ) : null}
        </Text>
        <Text style={[styles.cardNumber, { color: constants.colors.white }]}>#{pokemon.id}</Text>
      </View>

      {pokemon.types?.map((each) => (
        <ChipType
          containerStyle={{ marginTop: constants.gridSmall }}
          key={each.slot.toString() + each.type.name}
          type={each.type}
        />
      ))}
    </CardBackground>
  );
};

export default memo(PokemonItem);
