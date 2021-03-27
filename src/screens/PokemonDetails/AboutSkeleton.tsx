import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';

import styles from './styles';

const AboutSkeleton: FC = () => {
  const layout = useWindowDimensions();
  const { colors } = useTheme();

  return (
    <SkeletonContent
      boneColor={colors.card}
      containerStyle={[styles.aboutSkeleton, { width: layout.width }]}
      duration={800}
      highlightColor={colors.primary}
      isLoading
      layout={[
        {
          key: 'row-1',
          flexDirection: 'row',
          children: [
            {
              key: 'title-1',
              width: 96,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
            {
              key: 'text-1',
              width: 160,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
          ],
        },
        {
          key: 'row-2',
          flexDirection: 'row',
          children: [
            {
              key: 'title-2',
              width: 96,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
            {
              key: 'text-2',
              width: 160,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
          ],
        },
        {
          key: 'row-3',
          flexDirection: 'row',
          children: [
            {
              key: 'title-3',
              width: 96,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
            {
              key: 'text-3',
              width: 160,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
          ],
        },
        {
          key: 'row-4',
          flexDirection: 'row',
          children: [
            {
              key: 'title-4',
              width: 96,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
            {
              key: 'text-4',
              width: 160,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
          ],
        },
        {
          key: 'row-5',
          flexDirection: 'row',
          children: [
            {
              key: 'title-5',
              width: 96,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
            {
              key: 'text-5',
              width: 160,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
          ],
        },
        {
          key: 'row-6',
          flexDirection: 'row',
          children: [
            {
              key: 'title-6',
              width: 96,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
            {
              key: 'text-6',
              width: 160,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
          ],
        },
        {
          key: 'row-7',
          flexDirection: 'row',
          children: [
            {
              key: 'title-7',
              width: 96,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
            {
              key: 'text-7',
              width: 160,
              height: 16,
              marginRight: constants.gridBig,
              marginBottom: constants.grid,
            },
          ],
        },
      ]}
    />
  );
};

export default AboutSkeleton;
