import * as React from 'react';
import { Platform, Pressable as RawPressable, PressableProps } from 'react-native';

import { useTheme } from '@react-navigation/native';

const ANDROID_VERSION_LOLLIPOP = 21;
const ANDROID_SUPPORTS_RIPPLE = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

type Props = PressableProps & {
  pressColor?: string;
  pressOpacity?: number;
  androidRipple?: PressableProps['android_ripple'];
};

const Pressable: React.FC<Props> = ({ androidRipple, pressColor, pressOpacity, style, ...rest }) => {
  const { dark } = useTheme();

  const pressColorAndroid =
    pressColor !== undefined ? pressColor : dark ? 'rgba(255, 255, 255, .32)' : 'rgba(0, 0, 0, .32)';

  const hasPress = rest.onPress || rest.onPressIn || rest.onPressOut || rest.onLongPress;

  return (
    <RawPressable
      {...rest}
      android_ripple={
        ANDROID_SUPPORTS_RIPPLE && hasPress
          ? { color: pressColorAndroid, borderless: true, ...androidRipple }
          : undefined
      }
      style={({ pressed }) => [
        { opacity: pressed && !ANDROID_SUPPORTS_RIPPLE ? pressOpacity : 1 },
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
    />
  );
};

export default Pressable;
