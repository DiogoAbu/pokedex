import React, { FC, memo } from 'react';
import { Animated } from 'react-native';

import { useRoute } from '@react-navigation/core';

import Icon from '!/components/Icon';
import { constants } from '!/services/theme';
import { MainRouteProp } from '!/types';

import styles from './styles';

interface Props {
  scrollY: Animated.Value;
  statusBarHeight: number;
  maxHeight: number;
  scrollDistance: number;
}

const HeaderTitle: FC<Props> = ({ scrollY, statusBarHeight, maxHeight, scrollDistance }) => {
  const { params } = useRoute<MainRouteProp<'PokemonDetails'>>();
  const { id, displayName, backgroundColor } = params;

  const translateY = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [0, -scrollDistance],
    extrapolate: 'clamp',
  });

  const translateX = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [constants.grid, 64],
    extrapolate: 'clamp',
  });

  const scale = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [1, 0.85],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, scrollDistance],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.headerInfoTopContainer,
        {
          backgroundColor,
          height: maxHeight,
          paddingTop: statusBarHeight,
          transform: [{ translateY }],
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.headerName,
          {
            color: constants.colors.white,
            paddingBottom: constants.grid - 4,
            transform: [{ scale }, { translateX }],
          },
        ]}
      >
        {displayName?.replace(/[♀♂]/g, '')}{' '}
        {displayName?.endsWith('♀') ? (
          <Icon color={constants.colors.white} name='gender-female' size={24} />
        ) : displayName?.endsWith('♂') ? (
          <Icon color={constants.colors.white} name='gender-male' size={24} />
        ) : null}
      </Animated.Text>

      <Animated.Text style={[styles.headerNumber, { color: constants.colors.white, opacity }]}>
        #{id}
      </Animated.Text>
    </Animated.View>
  );
};

export default memo(HeaderTitle);
