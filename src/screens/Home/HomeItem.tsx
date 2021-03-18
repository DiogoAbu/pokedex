import React from 'react';
import { ListRenderItem, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import Text from '!/components/Text';
import usePress from '!/hooks/use-press';
import { MainNavigationProp } from '!/types';

import styles from './styles';

const HomeItem: ListRenderItem<number> = ({ index }) => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();

  const handleGoToDetails = usePress(() => {
    navigation.navigate('Details', { index });
  });

  return (
    <TouchableOpacity onPress={handleGoToDetails}>
      <Text style={styles.itemText}>#{index}</Text>
    </TouchableOpacity>
  );
};

export default HomeItem;
