import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import Icon, { IconProps } from './Icon';

// https://github.com/callstack/react-native-paper/blob/main/src/components/CrossFadeIcon.tsx
const CrossFadeIcon: FC<IconProps> = ({ name, size, ...rest }) => {
  const [currentIcon, setCurrentIcon] = useState<string>(() => name);
  const [previousIcon, setPreviousIcon] = useState<string | null>(null);
  const { current: fade } = useRef<Animated.Value>(new Animated.Value(1));

  if (currentIcon !== name) {
    setPreviousIcon(() => currentIcon);
    setCurrentIcon(() => name);
  }

  useEffect(() => {
    const isValid = previousIcon ? Icon.hasIcon(previousIcon) : false;
    if (isValid && previousIcon !== currentIcon) {
      fade.setValue(1);

      Animated.timing(fade, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [currentIcon, previousIcon, fade]);

  const opacityPrev = fade;
  const opacityNext = previousIcon
    ? fade.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      })
    : 1;

  const rotatePrev = fade.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  const rotateNext = previousIcon
    ? fade.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-180deg'],
      })
    : '0deg';

  return (
    <View style={[styles.content, { height: size, width: size }]}>
      {previousIcon ? (
        <Animated.View style={[styles.icon, { opacity: opacityPrev, transform: [{ rotate: rotatePrev }] }]}>
          <Icon {...rest} name={previousIcon} size={size} />
        </Animated.View>
      ) : null}
      <Animated.View style={[styles.icon, { opacity: opacityNext, transform: [{ rotate: rotateNext }] }]}>
        <Icon {...rest} name={currentIcon} size={size} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default CrossFadeIcon;
