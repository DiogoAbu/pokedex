import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';

import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useTheme } from '@react-navigation/native';

export default function useStatusBarStyle(): void {
  const { colors, dark } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.card);
    }
    StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content');

    changeNavigationBarColor(colors.card, !dark, false);
  }, [colors.card, dark]);
}
