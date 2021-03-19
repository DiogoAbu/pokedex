import React, { FC, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { MainNavigationProp, MainRouteProp } from '!/types';

import ResourceHeader from './ResourceHeader';
import styles from './styles';

const ResourceList: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();
  const { params } = useRoute<MainRouteProp<'ResourceList'>>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.contentContainer}>
      <ResourceHeader resource={params.resource} />
    </ScrollView>
  );
};

export default ResourceList;
