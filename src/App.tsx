import React, { FC, useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';

import RNBootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import useStatusBarStyle from './hooks/use-status-bar-style';
import MainStack from './navigators/MainStack';
import { darkTheme, lightTheme } from './services/theme';

const App: FC = () => {
  const colorScheme = useColorScheme();

  useStatusBarStyle();

  useEffect(() => {
    void RNBootSplash.hide({ fade: true });
    if (Platform.OS === 'android') {
      requestAnimationFrame(() => {
        StatusBar.setTranslucent(true);
      });
    }
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={colorScheme !== 'dark' ? darkTheme : lightTheme}>
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
