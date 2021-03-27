import React, { FC } from 'react';
import { StyleSheet, Text as NativeText, TextProps } from 'react-native';

import { useTheme } from '@react-navigation/native';

interface Props extends TextProps {
  shadow?: boolean;
}

const Text: FC<Props> = ({ children, shadow, style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <NativeText {...rest} style={[{ color: colors.text }, shadow && styles.shadow, style]}>
      {children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  shadow: {
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textShadowColor: 'rgba(0,0,0,0.4)',
  },
});

export default Text;
