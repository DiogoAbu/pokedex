import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/core';

import usePress from '!/hooks/use-press';
import { constants } from '!/services/theme';
import { MainNavigationProp, ResourceType } from '!/types';
import getResourceName from '!/utils/get-resource-name';

import ButtonTitle from './ButtonTitle';
import Pressable from './Pressable';

interface Props {
  resource: ResourceType;
  right?: boolean;
  bottom?: boolean;
}

const ButtonCard: FC<Props> = ({ resource, right, bottom }) => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();

  const name = getResourceName(resource);

  const handleGoToScreen = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('ResourceList', { resource });
    });
  });

  // @ts-ignore
  const typeOverlay = constants.colors[resource + 'Overlay'];

  return (
    <View
      style={[
        styles.outerContainer,
        right && styles.outerContainerRight,
        bottom && styles.outerContainerBottom,
      ]}
    >
      <Pressable
        androidRipple={{ borderless: false }}
        onPress={handleGoToScreen}
        style={[styles.pressable, { backgroundColor: constants.colors[resource] }]}
      >
        <FastImage source={require('!/assets/pokeball.png')} style={styles.image} tintColor={typeOverlay} />
        <SharedElement id={`${resource}.card.name`}>
          <ButtonTitle>{name}</ButtonTitle>
        </SharedElement>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    borderRadius: constants.grid,
    overflow: 'hidden',
    marginRight: constants.grid,
    marginBottom: constants.grid,
    shadowColor: constants.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  outerContainerRight: {
    marginRight: 0,
  },
  outerContainerBottom: {
    marginBottom: 0,
  },
  pressable: {
    paddingHorizontal: constants.grid,
    paddingVertical: constants.gridBig - constants.gridSmall,
  },
  image: {
    width: 96,
    height: 96,
    position: 'absolute',
    top: '55%',
    right: -16,
    marginTop: -(constants.gridBig - constants.gridSmall),
  },
});

export default ButtonCard;
