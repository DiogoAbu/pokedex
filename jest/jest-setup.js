import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js', () => {
  const { EventEmitter } = require('events');
  return EventEmitter;
});

// Fix for `useNativeDriver` is not supported because the native animated module is missing.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-community/masked-view', () => ({}));

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValueOnce(),
    show: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});

jest.mock('react-native-safe-area-context', () => {
  const inset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: ({ children }) => children(inset),
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
  };
});

jest.mock('react-native-snackbar', () => ({}));

// jest.mock('react-native-mmkv', () => {
//   const MMKV = {
//     INTERNAL_MOCK_STORAGE: {},

//     getString: jest.fn((key) => {
//       return MMKV.INTERNAL_MOCK_STORAGE[key] ?? undefined;
//     }),
//     set: jest.fn((key, value) => {
//       MMKV.INTERNAL_MOCK_STORAGE[key] = value;
//     }),
//   };

//   return { MMKV };
// });
