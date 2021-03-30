import React, { FC } from 'react';

import { IconProps as RawIconProps } from 'react-native-vector-icons/Icon';
import RawIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';

export type IconProps = RawIconProps;

const Icon: FC<IconProps> & { hasIcon(name: string): boolean } = ({ name, size, color, style, ...rest }) => {
  const { colors } = useTheme();

  return <RawIcon {...rest} color={color ?? colors.text} name={name} size={size ?? 40} style={style} />;
};

Icon.hasIcon = (...args) => RawIcon.hasIcon(...args);

export default Icon;
