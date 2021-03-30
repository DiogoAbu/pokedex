import React, { FC } from 'react';
import { ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import FastImage from 'react-native-fast-image';
import Animated, { concat } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';

import { loop } from '!/utils/loop';

const FastImageAnim = Animated.createAnimatedComponent(FastImage);

interface LoadingPokeballProps {
  size?: number;
  tintColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const LoadingPokeball: FC<LoadingPokeballProps> = ({ size, tintColor, containerStyle, imageStyle }) => {
  const { colors } = useTheme();

  const rotateZ = loop({ value: 0, toValue: 360 });

  return (
    <View style={[styles.container, containerStyle]}>
      <FastImageAnim
        source={require('!/assets/pokeball.png')}
        style={[
          {
            width: size,
            height: size,
          },
          imageStyle,
          {
            transform: [{ rotateZ: concat(rotateZ, 'deg') }],
          },
        ]}
        tintColor={tintColor ?? colors.border}
      />
    </View>
  );
};

LoadingPokeball.defaultProps = {
  size: 32,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingPokeball;
