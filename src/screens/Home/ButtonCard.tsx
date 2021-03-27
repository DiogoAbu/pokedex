import React, { FC, memo } from 'react';
import { StyleSheet, Text } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import usePress from '!/hooks/use-press';
import { constants } from '!/services/theme';
import { MainNavigationProp, ResourceType } from '!/types';
import getResourceName from '!/utils/get-resource-name';

import CardBackground, { CardProps } from '../../components/CardBackground';

interface Props extends CardProps {
  resource: ResourceType;
}

const ButtonCard: FC<Props> = ({ resource, ...rest }) => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();

  const handleGoToList = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('ResourceList', { resource });
    });
  });

  // @ts-ignore
  const typeOverlay = constants.colors[resource + 'Overlay'];

  return (
    <CardBackground
      {...rest}
      onPress={handleGoToList}
      pokeballTintColor={typeOverlay}
      resource={resource}
      style={{ paddingVertical: constants.grid + constants.gridSmall }}
    >
      <Text style={styles.title}>{getResourceName(resource)}</Text>
    </CardBackground>
  );
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  title: {
    color: constants.colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textShadowColor: 'rgba(0,0,0,0.4)',
  },
});

export default memo(ButtonCard);
