import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { useRoute } from '@react-navigation/native';

import Text from '!/components/Text';
import { MainRouteProp } from '!/types';

import styles from './styles';

const Details: FC = () => {
  const { params } = useRoute<MainRouteProp<'Details'>>();

  return (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.itemText}>Index #{params.index}</Text>
    </ScrollView>
  );
};

export default Details;
