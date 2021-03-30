import React, { FC, memo } from 'react';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';

import styles from './styles';

export interface PokemonItemSkeletonProps {
  height: number;
  isLoading?: boolean;
}

const PokemonItemSkeleton: FC<PokemonItemSkeletonProps> = ({ height, isLoading }) => {
  const { colors } = useTheme();

  return (
    <SkeletonContent
      boneColor={colors.card}
      containerStyle={[styles.skeletonContainer, { height, backgroundColor: colors.card }]}
      duration={constants.shimmerDuration}
      highlightColor={colors.primary}
      isLoading={isLoading ?? true}
      layout={[
        {
          key: 'column',
          children: [
            {
              key: 'title',
              width: 192,
              height: 24,
              marginLeft: constants.gridSmall,
              marginTop: constants.grid,
            },
            {
              key: 'type',
              width: 64,
              height: 22,
              marginLeft: constants.gridSmall,
              marginTop: constants.grid,
            },
          ],
        },
        {
          key: 'image',
          width: 96,
          height: 96,
          borderRadius: 48,
          marginBottom: constants.gridSmall,
          alignSelf: 'flex-end',
        },
      ]}
    />
  );
};

export default memo(PokemonItemSkeleton);
