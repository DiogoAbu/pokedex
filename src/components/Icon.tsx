import React, { FC } from 'react';
import { StyleSheet, TextProps } from 'react-native';

import RawIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';

interface Props extends TextProps {
  name: string;
  size?: number;
  color?: string;
  shadow?: boolean;
}

const Icon: FC<Props> = ({ color, size, shadow, ...rest }) => {
  const { colors } = useTheme();

  return <RawIcon color={color ?? colors.text} size={size ?? 40} style={shadow && styles.shadow} {...rest} />;
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  shadow: {
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textShadowColor: 'rgba(0,0,0,0.4)',
  },
});

export default Icon;
