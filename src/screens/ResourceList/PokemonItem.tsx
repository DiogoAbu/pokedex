import React, { FC, memo, useCallback, useState } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import { IApiResource, IPokemon } from 'pokeapi-typescript';

import CardBackground from '!/components/CardBackground';
import Icon from '!/components/Icon';
import Text from '!/components/Text';
import usePokeApi from '!/hooks/use-poke-api';
import usePress from '!/hooks/use-press';
import { constants } from '!/services/theme';
import { MainNavigationProp } from '!/types';
import getIdFromUrl from '!/utils/get-id-from-url';
import getSpriteUrl from '!/utils/get-sprite-big';
import getSpriteSilhouette from '!/utils/get-sprite-silhouette';
import getTypeColor from '!/utils/get-type-color';

import ChipType from '../../components/ChipType';

import PokemonItemSkeleton from './PokemonItemSkeleton';
import styles from './styles';

const mutateDataPokemon = ({ id, name, types, species }: IPokemon): Partial<IPokemon> => ({
  id,
  name,
  types,
  species,
});

const PokemonItem: FC<ListRenderItemInfo<IApiResource<IPokemon>> & { height: number }> = ({
  item,
  height,
}) => {
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();

  const [pokemonSpriteError, setPokemonSpriteError] = useState(false);

  const { data: pokemon } = usePokeApi({
    endpoint: 'Pokemon',
    id: getIdFromUrl(item.url),
    page: undefined,
    mutateData: mutateDataPokemon,
  });

  const { data: species } = usePokeApi({
    endpoint: 'PokemonSpecies',
    id: pokemon?.species?.url ? getIdFromUrl(pokemon.species.url) : undefined,
    page: undefined,
    mutateData: undefined,
  });

  const backgroundColor = getTypeColor(pokemon?.types);
  const displayName = species?.names.find((e) => e.language.name === 'en')?.name;

  const handlePokemonSpriteError = useCallback(() => {
    setPokemonSpriteError(true);
  }, []);

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

  if (!pokemon || !species) {
    return <PokemonItemSkeleton height={height} />;
  }

  return (
    <CardBackground
      backgroundColor={backgroundColor}
      onPress={pokemon ? handleGoToDetails : undefined}
      outerStyle={{ height }}
      right
    >
      <SharedElement id={`pokemon.sprite.${pokemon.id!}`} style={styles.cardSpriteImageContainer}>
        <FastImage
          onError={handlePokemonSpriteError}
          source={{ uri: getSpriteUrl(pokemon.name!) }}
          style={styles.cardSpriteImage}
        />
      </SharedElement>
      {pokemonSpriteError ? (
        <View style={styles.cardSpriteImageContainer}>
          <FastImage source={getSpriteSilhouette()} style={styles.cardSpriteImage} />
        </View>
      ) : null}

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

export default memo(PokemonItem, (prev, next) => {
  return prev.item.url === next.item.url;
});
