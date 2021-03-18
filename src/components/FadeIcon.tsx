import React from 'react';
import { StyleProp, StyleSheet, TextProps, View, ViewStyle } from 'react-native';

import Animated, { Easing, timing, Value } from 'react-native-reanimated';

import Icon from './Icon';

const ANIM_SCALE = 1;

interface Props extends TextProps {
  name: string;
  size?: number;
  color?: string;
  visible: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

type State = {
  currentVisible: boolean;
  previousVisible?: boolean;
  fade: Value<number>;
};

class FadeIcon extends React.Component<Props, State> {
  static defaultProps = {
    size: 40,
  };

  static getDerivedStateFromProps(nextProps: Props, nextState: State): Partial<State> | null {
    if (nextState.currentVisible === nextProps.visible) {
      return null;
    }

    return {
      currentVisible: nextProps.visible,
      previousVisible: nextState.currentVisible,
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      currentVisible: props.visible,
      fade: new Value(0),
    };
  }

  componentDidMount(): void {
    this.animate();
  }

  shouldComponentUpdate(prev: Readonly<Props>): boolean {
    const { props } = this;
    if (prev.visible !== props.visible) {
      return true;
    }
    return false;
  }

  componentDidUpdate(): void {
    this.animate();
  }

  animate(): void {
    const { currentVisible, fade } = this.state;

    timing(fade, {
      toValue: currentVisible ? 1 : 0,
      duration: ANIM_SCALE * 200,
      easing: Easing.linear,
    }).start();
  }

  render(): JSX.Element {
    const { size, containerStyle, ...rest } = this.props;
    const { fade } = this.state;

    const scale = fade.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1],
    });

    return (
      <View
        style={[
          styles.content,
          {
            height: size,
            width: size,
          },
          containerStyle,
        ]}
      >
        <Animated.View style={[styles.icon, { opacity: fade, transform: [{ scale }] }]}>
          <Icon {...rest} size={size} />
        </Animated.View>
      </View>
    );
  }
}

export default FadeIcon;

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
