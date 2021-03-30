import React, { FC, RefObject, useCallback, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, ScrollView, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { SharedElement } from 'react-navigation-shared-element';
import { useRoute, useTheme } from '@react-navigation/native';

import ChipType from '!/components/ChipType';
import Pressable from '!/components/Pressable';
import usePress from '!/hooks/use-press';
import { constants } from '!/services/theme';
import { MainRouteProp } from '!/types';
import getSpriteSilhouette from '!/utils/get-sprite-silhouette';

import styles from './styles';

interface Props {
  scrollY: Animated.Value;
  scrollX: Animated.Value;
  maxHeight: number;
  infoScrollDistance: number;
  containerHeight: number;
  footerHeight: number;
  viewWidth: number;
  scrollHorizontalRef: RefObject<ScrollView>;
  handleScrollBackUpPressable: () => void;
}

const HeaderInfo: FC<Props> = ({
  scrollY,
  scrollX,
  maxHeight,
  infoScrollDistance,
  containerHeight,
  footerHeight,
  viewWidth,
  scrollHorizontalRef,
  handleScrollBackUpPressable,
}) => {
  const { params } = useRoute<MainRouteProp<'PokemonDetails'>>();
  const { id, types, spriteUrl, backgroundColor, skipShared } = params;

  const { colors } = useTheme();

  const buttonWidths = useRef<number[]>([]);
  const [pokemonSpriteError, setPokemonSpriteError] = useState(false);

  const handlePokemonSpriteError = useCallback(() => {
    setPokemonSpriteError(true);
  }, []);

  const opacity = scrollY.interpolate({
    inputRange: [0, infoScrollDistance],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerInfoTranslateY = scrollY.interpolate({
    inputRange: [0, infoScrollDistance],
    outputRange: [0, -infoScrollDistance],
    extrapolate: 'clamp',
  });

  const opacity1 = scrollX.interpolate({
    inputRange: [0, viewWidth],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity2 = scrollX.interpolate({
    inputRange: [0, viewWidth, viewWidth * 2],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity3 = scrollX.interpolate({
    inputRange: [viewWidth, viewWidth * 2, viewWidth * 3],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity4 = scrollX.interpolate({
    inputRange: [viewWidth * 2, viewWidth * 3],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });

  const scaleXLine = scrollX.interpolate({
    inputRange: [0, viewWidth, viewWidth * 2, viewWidth * 3],
    outputRange: buttonWidths.current.length
      ? [buttonWidths.current[0], buttonWidths.current[1], buttonWidths.current[2], buttonWidths.current[3]]
      : [0, 0, 0, 0],
    extrapolate: 'clamp',
  });
  const translateXLine = scrollX.interpolate({
    inputRange: [0, viewWidth, viewWidth * 2, viewWidth * 3],
    outputRange: buttonWidths.current.length
      ? [
          (buttonWidths.current[0] + constants.grid) / 2,
          (buttonWidths.current[0] + constants.grid) / 2 +
            (buttonWidths.current[1] - constants.gridSmall - 2),
          (buttonWidths.current[0] + constants.grid) / 2 +
            buttonWidths.current[1] +
            constants.gridSmall +
            buttonWidths.current[2] +
            constants.gridSmall / 2,
          buttonWidths.current[0] +
            constants.gridSmall +
            buttonWidths.current[1] +
            constants.grid +
            buttonWidths.current[2] +
            buttonWidths.current[3] -
            constants.gridSmall,
        ]
      : [0, 0, 0, 0],
    extrapolate: 'clamp',
  });

  const handleLayoutAbout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    buttonWidths.current[0] = width - constants.grid;
  }, []);
  const handleLayoutStats = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    buttonWidths.current[1] = width - constants.grid;
  }, []);
  const handleLayoutEvolution = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    buttonWidths.current[2] = width - constants.grid;
  }, []);
  const handleLayoutMoves = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    buttonWidths.current[3] = width - constants.grid;
  }, []);

  const handlePressAbout = usePress(() => {
    requestAnimationFrame(() => {
      handleScrollBackUpPressable();
      scrollHorizontalRef.current?.scrollTo({ x: 0 * viewWidth });
    });
  });
  const handlePressBaseStats = usePress(() => {
    requestAnimationFrame(() => {
      handleScrollBackUpPressable();
      scrollHorizontalRef.current?.scrollTo({ x: 1 * viewWidth });
    });
  });
  const handlePressEvolution = usePress(() => {
    requestAnimationFrame(() => {
      handleScrollBackUpPressable();
      scrollHorizontalRef.current?.scrollTo({ x: 2 * viewWidth });
    });
  });
  const handlePressMoves = usePress(() => {
    requestAnimationFrame(() => {
      handleScrollBackUpPressable();
      scrollHorizontalRef.current?.scrollTo({ x: 3 * viewWidth });
    });
  });

  return (
    <Animated.View
      style={[
        styles.headerInfoContainer,
        {
          top: maxHeight,
          height: containerHeight,
          backgroundColor,
          transform: [{ translateY: headerInfoTranslateY }],
        },
      ]}
    >
      <View style={[styles.pokeballContainer, { bottom: footerHeight / 2 }]}>
        <FastImage
          source={require('!/assets/pokeball.png')}
          style={styles.pokeball}
          tintColor={constants.colors.white}
        />
      </View>

      <View
        style={[
          styles.headerFooter,
          { height: footerHeight, backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          androidRipple={{ borderless: false }}
          onLayout={handleLayoutAbout}
          onPress={handlePressAbout}
          style={[styles.headerFooterPressable, { height: footerHeight }]}
        >
          <Animated.Text style={[styles.headerFooterText, { color: colors.text, opacity: opacity1 }]}>
            About
          </Animated.Text>
        </Pressable>
        <Pressable
          androidRipple={{ borderless: false }}
          onLayout={handleLayoutStats}
          onPress={handlePressBaseStats}
          style={[styles.headerFooterPressable, { height: footerHeight }]}
        >
          <Animated.Text style={[styles.headerFooterText, { color: colors.text, opacity: opacity2 }]}>
            Stats / Type
          </Animated.Text>
        </Pressable>
        <Pressable
          androidRipple={{ borderless: false }}
          onLayout={handleLayoutEvolution}
          onPress={handlePressEvolution}
          style={[styles.headerFooterPressable, { height: footerHeight }]}
        >
          <Animated.Text style={[styles.headerFooterText, { color: colors.text, opacity: opacity3 }]}>
            Evolution
          </Animated.Text>
        </Pressable>
        <Pressable
          androidRipple={{ borderless: false }}
          onLayout={handleLayoutMoves}
          onPress={handlePressMoves}
          style={[styles.headerFooterPressable, { height: footerHeight }]}
        >
          <Animated.Text style={[styles.headerFooterText, { color: colors.text, opacity: opacity4 }]}>
            Moves
          </Animated.Text>
        </Pressable>
      </View>

      <Animated.View style={{ opacity }}>
        <View style={styles.headerRow}>
          {types.map((each) => (
            <ChipType
              containerStyle={{ marginTop: constants.gridSmall, marginRight: constants.gridSmall }}
              key={each.slot.toString() + each.type.name}
              type={each.type}
            />
          ))}
        </View>

        {skipShared || pokemonSpriteError ? (
          <FastImage
            onError={handlePokemonSpriteError}
            source={pokemonSpriteError ? getSpriteSilhouette() : { uri: spriteUrl }}
            style={styles.spriteImage}
          />
        ) : (
          <SharedElement id={`pokemon.sprite.${id}`}>
            <FastImage
              onError={handlePokemonSpriteError}
              source={pokemonSpriteError ? getSpriteSilhouette() : { uri: spriteUrl }}
              style={styles.spriteImage}
            />
          </SharedElement>
        )}
      </Animated.View>

      <Animated.View
        style={[
          styles.headerFooterLine,
          {
            backgroundColor: colors.primary,
            transform: [{ translateX: translateXLine }, { scaleX: scaleXLine }],
          },
        ]}
      />
    </Animated.View>
  );
};

export default HeaderInfo;
