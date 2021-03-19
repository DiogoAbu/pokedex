import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

import { constants } from '!/services/theme';

interface Props {
  children: React.ReactNode;
}

const ButtonTitle: FC<Props> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  title: {
    color: constants.colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textShadowColor: 'rgba(0,0,0,0.4)',
  },
});

export default ButtonTitle;
