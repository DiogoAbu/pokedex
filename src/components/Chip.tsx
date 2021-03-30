import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';

export interface ChipProps {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  loading?: boolean;
}

const Chip: FC<ChipProps> = ({ children, containerStyle, style, loading }) => {
  const { colors } = useTheme();

  if (loading) {
    return (
      <SkeletonContent
        boneColor={colors.card}
        containerStyle={[styles.skeletonContainer, containerStyle]}
        duration={constants.shimmerDuration}
        highlightColor={colors.primary}
        isLoading
        layout={[
          {
            key: 'chip',
            width: 64,
            height: 22,
          },
        ]}
      />
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 200,
    paddingHorizontal: constants.gridSmall,
    paddingVertical: 3,
  },
  text: {
    color: constants.colors.white,
    fontSize: 14,
    textAlignVertical: 'center',
  },

  skeletonContainer: {
    alignSelf: 'flex-start',
  },
});

export default Chip;
