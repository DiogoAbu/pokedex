import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { constants } from '!/services/theme';

const Badge: FC = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    width: constants.grid * 2.5,
    height: constants.grid * 2.5,
    borderRadius: constants.grid * 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: constants.colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Badge;
