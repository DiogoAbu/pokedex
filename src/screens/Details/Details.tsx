import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { useRoute } from '@react-navigation/core';

import Text from '!/components/Text';
import useStatusBarStyle from '!/hooks/use-status-bar-style';
import { MainRouteProp } from '!/types';

import styles from './styles';

const Details: FC = () => {
  const { params } = useRoute<MainRouteProp<'Details'>>();

  useStatusBarStyle();

  return (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.itemText}>Index #{params.index}</Text>
    </ScrollView>
  );
};

export default Details;
