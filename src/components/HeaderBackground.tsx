import React, { FC } from 'react';
import { Animated, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  style: StyleProp<ViewStyle>;
}

const HeaderBackground: FC<Props> = ({ style, ...rest }) => {
  return <Animated.View style={[styles.container, style]} {...rest} />;
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    shadowColor: 'transparent',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowOpacity: 0.85,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: StyleSheet.hairlineWidth,
        },
      },
      default: {
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
});

export default HeaderBackground;
