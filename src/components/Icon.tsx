import React, { FC } from 'react';
import { TextProps } from 'react-native';

import RawIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';

interface Props extends TextProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon: FC<Props> = ({ color, size, ...rest }) => {
  const { colors } = useTheme();

  return <RawIcon color={color ?? colors.text} size={size ?? 40} {...rest} />;
};

export default Icon;
