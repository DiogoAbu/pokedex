import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { useTheme } from '@react-navigation/native';

interface Props extends ViewProps {
  stat: number;
  max?: number;
  fillColor?: string;
}

const STAT_MAX = 255;

const StatsBar: FC<Props> = ({ stat, max, fillColor, style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <View
      {...rest}
      style={[styles.background, { backgroundColor: colors.background, borderColor: colors.border }, style]}
    >
      <View
        style={[
          styles.fill,
          {
            flex: parseFloat((stat / (max ?? STAT_MAX)).toFixed(2)),
            backgroundColor: fillColor ?? colors.primary,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  fill: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 16,
    borderRadius: 8,
  },
});

export default StatsBar;
