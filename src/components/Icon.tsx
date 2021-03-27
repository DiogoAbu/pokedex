import React, { FC } from 'react';

import RawIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';

interface Props {
  name: string;
  size?: number;
  color?: string;
}

const Icon: FC<Props> = ({ name, size, color }) => {
  const { colors } = useTheme();

  return <RawIcon color={color ?? colors.text} name={name} size={size ?? 40} />;
};

export default Icon;
