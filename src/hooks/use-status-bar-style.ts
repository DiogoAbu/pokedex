import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { darkTheme, lightTheme } from '!/services/theme';

export default function useStatusBarStyle(): void {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const { colors, dark } = colorScheme !== 'dark' ? darkTheme : lightTheme;

    if (Platform.OS === 'android') {
      // StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.35)');
    }
    StatusBar.setBarStyle('light-content');

    changeNavigationBarColor(colors.card, !dark, false);
  }, [colorScheme]);
}
