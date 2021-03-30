import React, { forwardRef } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';

import CrossFadeIcon from './CrossFadeIcon';
import LoadingPokeball from './LoadingPokeball';
import Pressable from './Pressable';
import SlideIn from './SlideIn';

interface Props extends TextInputProps {
  isLoading?: boolean;
  showBackButton?: boolean;
  onIconPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  onContainerPress?: () => void;
  onContainerLayout?: (event: LayoutChangeEvent) => void;
}

const Searchbar = forwardRef<TextInput, Props>(
  (
    {
      isLoading,
      showBackButton,
      onIconPress,
      containerStyle,
      onContainerPress,
      onContainerLayout,
      style,
      ...rest
    },
    ref,
  ) => {
    const { dark, colors } = useTheme();

    return (
      <TouchableOpacity
        activeOpacity={1}
        onLayout={onContainerLayout}
        onPress={onContainerPress}
        style={[
          styles.container,
          { backgroundColor: colors.background, borderColor: colors.border },
          containerStyle,
        ]}
      >
        <Pressable disabled={!onIconPress} onPress={onIconPress}>
          <CrossFadeIcon name={showBackButton ? 'chevron-left' : 'magnify'} size={32} />
        </Pressable>
        <TextInput
          multiline={false}
          numberOfLines={1}
          placeholder='Search Pokémon, Move, Ability, etc...'
          placeholderTextColor={dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
          ref={ref}
          returnKeyType='search'
          style={[styles.input, { color: colors.text }, style]}
          underlineColorAndroid='transparent'
          {...rest}
        />
        {isLoading ? (
          <SlideIn amount={20} direction='right'>
            <LoadingPokeball size={28} />
          </SlideIn>
        ) : null}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: constants.gridSmall / 2,
    paddingHorizontal: constants.grid,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderRadius: 200,
  },
  input: {
    flex: 1,
    marginHorizontal: constants.gridSmall,
    fontSize: 16,
    textAlignVertical: 'center',
  },
});

export default Searchbar;
