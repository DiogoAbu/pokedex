import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';

export interface ListItemProps {
  renderCenter?: React.ReactElement;
  renderLeft?: React.ReactElement;
  renderRight?: React.ReactElement;
  loading?: boolean;
}

const ListItem: FC<ListItemProps> = ({ renderCenter, renderLeft, renderRight, loading }) => {
  const { colors } = useTheme();

  if (loading) {
    return (
      <SkeletonContent
        boneColor={colors.card}
        containerStyle={styles.container}
        duration={constants.shimmerDuration}
        highlightColor={colors.primary}
        isLoading
        layout={[
          {
            key: 'row',
            flexDirection: 'row',
            paddingLeft: constants.grid,
            children: [
              {
                key: 'left',
                width: constants.grid * 2.5,
                height: constants.grid * 2.5,
                borderRadius: constants.grid * 2,
              },
              {
                key: 'center',
                flexDirection: 'column',
                paddingHorizontal: constants.grid,
                children: [
                  {
                    key: 'title',
                    width: 200,
                    height: constants.grid,
                  },
                  {
                    key: 'description',
                    width: 120,
                    marginTop: constants.grid,
                    height: constants.gridSmall,
                  },
                ],
              },
            ],
          },
        ]}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderLeft ? <View style={styles.containerLeft}>{renderLeft}</View> : null}
      {renderCenter ? <View style={styles.containerCenter}>{renderCenter}</View> : null}
      {renderRight ? <View style={styles.containerRight}>{renderRight}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: constants.grid * 5,
  },
  containerLeft: {
    paddingLeft: constants.grid,
  },
  containerCenter: {
    flex: 1,
    paddingHorizontal: constants.grid,
  },
  containerRight: {
    paddingRight: constants.grid,
  },
});

export default ListItem;
