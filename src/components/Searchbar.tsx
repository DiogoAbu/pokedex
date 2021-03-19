import React, { FC } from 'react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';

import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';

import Icon from './Icon';

interface Props {
  style: StyleProp<ViewStyle>;
}

const Searchbar: FC<Props> = ({ style }) => {
  const { dark, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.border }, style]}>
      <Icon name='magnify' size={32} />
      <TextInput
        placeholder='Search Pokémon, Move, Ability, etc...'
        placeholderTextColor={dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
        returnKeyType='search'
        style={[styles.input, { color: colors.text }]}
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 200,
    paddingVertical: constants.gridSmall / 2,
    paddingHorizontal: constants.grid,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    marginHorizontal: constants.gridSmall,
    marginRight: constants.gridBig,
    fontSize: 16,
  },
});

export default Searchbar;
