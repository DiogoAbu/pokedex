import React, { FC } from 'react';
import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';

import ButtonTitle from '!/components/ButtonTitle';
import Icon from '!/components/Icon';
import Pressable from '!/components/Pressable';
import usePress from '!/hooks/use-press';
import { constants } from '!/services/theme';
import { MainNavigationProp, ResourceType } from '!/types';
import getResourceName from '!/utils/get-resource-name';

import styles from './styles';

interface Props {
  resource: ResourceType;
}

const ResourceHeader: FC<Props> = ({ resource }) => {
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();
  const insets = useSafeAreaInsets();

  const handleGoBack = usePress(() => {
    navigation.pop();
  });

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: constants.colors[resource], paddingTop: insets.top },
      ]}
    >
      <Pressable onPress={handleGoBack} style={{ marginRight: constants.grid }}>
        <Icon color={constants.colors.white} name='chevron-left' shadow />
      </Pressable>

      <SharedElement id={`${resource}.card.name`}>
        <ButtonTitle>{getResourceName(resource)}</ButtonTitle>
      </SharedElement>
    </View>
  );
};

export default ResourceHeader;
