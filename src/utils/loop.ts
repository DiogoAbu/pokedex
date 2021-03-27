import Animated, { Easing, stopClock } from 'react-native-reanimated';

const { Clock, Value, block, cond, set, startClock, clockRunning, not, and, timing } = Animated;

// From: https://github.com/wcandillon/react-native-redash/tree/master/src/v1
export interface LoopProps {
  value: number;
  toValue: number;
  duration?: number;
}

export const loop = ({ value, toValue, duration }: LoopProps): Animated.Node<number> => {
  const clock = new Clock();

  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(value),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: duration ?? 1000,
    toValue: new Value(toValue),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(and(not(clockRunning(clock)), 1), startClock(clock)),
    timing(clock, state, config),
    cond(state.finished, [
      // we stop
      stopClock(clock),

      // set flag ready to be restarted
      set(state.finished, 0),
      // same value as the initial defined in the state creation
      set(state.position, 0),

      // very important to reset this ones !!! as mentioned in the doc about timing is saying
      set(state.time, 0),
      set(state.frameTime, 0),

      // and we restart
      startClock(clock),
    ]),
    state.position,
  ]);
};
