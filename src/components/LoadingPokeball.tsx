import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import Animated, { concat } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';
import { loop } from '!/utils/loop';

const FastImageAnim = Animated.createAnimatedComponent(FastImage);

const LoadingPokeball: FC = () => {
  const { colors } = useTheme();

  const rotateZ = loop({ value: 0, toValue: 360 });

  return (
    <View style={styles.container}>
      <FastImageAnim
        source={require('!/assets/pokeball.png')}
        style={[
          styles.image,
          {
            transform: [{ rotateZ: concat(rotateZ, 'deg') }] as any,
          },
        ]}
        tintColor={colors.border}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: constants.grid,
  },
  image: {
    width: 32,
    height: 32,
  },
});

export default LoadingPokeball;
