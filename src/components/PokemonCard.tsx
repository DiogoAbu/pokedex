import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import FastImage from 'react-native-fast-image';
import { IPokemon } from 'pokeapi-typescript';

import { constants } from '!/services/theme';
import capitalize from '!/utils/capitalize';
import getSpriteUrl from '!/utils/get-sprite-url';
import getTypeColor from '!/utils/get-type-color';

import CardBackground from './CardBackground';
import Chip from './Chip';
import Text from './Text';

interface Props {
  data: Partial<IPokemon>;
  style?: StyleProp<ViewStyle>;
}
const PokemonCard: FC<Props> = ({ data, style }) => {
  const backgroundColor = getTypeColor(data?.types);

  return (
    <CardBackground backgroundColor={backgroundColor} outerStyle={[styles.outerContainer, style]} right>
      <FastImage source={{ uri: getSpriteUrl(data.name!) }} style={styles.image} />

      <Text shadow style={[styles.text, { color: constants.colors.white }]}>
        {capitalize(data.name, true)}
      </Text>

      {data.types?.map((e) => (
        <Chip containerStyle={{ marginTop: constants.gridSmall }} key={e.slot.toString() + e.type.name}>
          {capitalize(e.type.name)}
        </Chip>
      ))}
    </CardBackground>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    minHeight: 160,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 128,
    height: 128,
  },
});

export default PokemonCard;
