import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '@react-navigation/native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Separator: FC<Props> = ({ style }) => {
  const { colors } = useTheme();

  return <View style={[styles.line, { backgroundColor: colors.border }, style]} />;
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
  },
});

export default Separator;
