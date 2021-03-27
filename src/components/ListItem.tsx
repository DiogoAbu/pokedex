import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { constants } from '!/services/theme';

export interface ListItemProps {
  renderCenter?: React.ReactElement;
  renderLeft?: React.ReactElement;
  renderRight?: React.ReactElement;
}

const ListItem: FC<ListItemProps> = ({ renderCenter, renderLeft, renderRight }) => {
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
