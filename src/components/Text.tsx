import React, { FC } from 'react';
import { Text as NativeText, TextProps } from 'react-native';

import { useTheme } from '@react-navigation/native';

const Text: FC<TextProps> = ({ children, style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <NativeText {...rest} style={[{ color: colors.text }, style]}>
      {children}
    </NativeText>
  );
};

export default Text;
