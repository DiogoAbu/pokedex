import React, { FC } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';
import { ResourceType } from '!/types';

import Pressable from './Pressable';

export interface CardProps {
  resource?: ResourceType;
  backgroundColor?: string;
  right?: boolean;
  bottom?: boolean;
  pokeballTintColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  outerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const CardBackground: FC<CardProps> = ({
  resource,
  backgroundColor: bgColor,
  right,
  bottom,
  pokeballTintColor,
  onPress,
  children,
  style,
  outerStyle,
  disabled,
}) => {
  const { colors } = useTheme();

  let backgroundColor = colors.card;
  if (bgColor) {
    backgroundColor = bgColor;
  } else if (resource) {
    backgroundColor = constants.colors[resource];
  }

  return (
    <View
      style={[
        styles.outerContainer,
        right && styles.outerContainerRight,
        bottom && styles.outerContainerBottom,
        disabled && styles.outerContainerDisabled,
        outerStyle,
      ]}
    >
      <Pressable
        androidRipple={{ borderless: false }}
        disabled={disabled}
        onPress={onPress}
        style={[styles.pressable, { backgroundColor }, style]}
      >
        <FastImage
          source={require('!/assets/pokeball.png')}
          style={[styles.pokeball, !pokeballTintColor && styles.pokeballOpacity]}
          tintColor={pokeballTintColor || constants.colors.white}
        />
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    borderRadius: constants.grid,
    overflow: 'hidden',
    marginRight: constants.grid,
    marginBottom: constants.grid,
    shadowColor: constants.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  outerContainerRight: {
    marginRight: 0,
  },
  outerContainerBottom: {
    marginBottom: 0,
  },
  outerContainerDisabled: {
    opacity: 0.3,
  },
  pressable: {
    flex: 1,
    padding: constants.grid,
  },
  pokeball: {
    width: 96,
    height: 96,
    position: 'absolute',
    bottom: -13,
    right: -16,
    marginTop: -(constants.gridBig - constants.gridSmall),
  },
  pokeballOpacity: {
    opacity: 0.15,
  },
});

export default CardBackground;
