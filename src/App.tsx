import React, { FC } from 'react';
import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import MainStack from './navigators/MainStack';
import { darkTheme, lightTheme } from './services/theme';

const App: FC = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
