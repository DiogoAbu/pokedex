import React, { FC, useEffect, useRef } from 'react';

import Animated, { Easing, timing, Value } from 'react-native-reanimated';

interface Props {
  amount?: number;
  direction?: 'up' | 'right' | 'down' | 'left';
}

const SlideIn: FC<Props> = ({ children, amount, direction }) => {
  const value = useRef(new Value(0)).current;

  const vertical = direction === 'up' || direction === 'down';
  const initialPos = amount! * (direction === 'up' || direction === 'left' ? -1 : 1);

  const translateValue = value.interpolate({
    inputRange: [0, 1],
    outputRange: [initialPos, 0],
  });

  let transform: Animated.AnimatedTransform;
  if (vertical) {
    transform = [{ translateY: translateValue }];
  } else {
    transform = [{ translateX: translateValue }];
  }

  useEffect(() => {
    timing(value, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }, [value]);

  return <Animated.View style={{ opacity: value, transform }}>{children}</Animated.View>;
};

SlideIn.defaultProps = {
  amount: 50,
  direction: 'right',
};

export default SlideIn;
