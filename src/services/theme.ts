import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

const grid = 16;

export const constants = {
  grid,
  smallGrid: grid / 2,
  bigGrid: grid * 2,
};

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    border: '#393939',
    card: '#262626',
    notification: '#ff453a',
    primary: '#0a84ff',
    text: '#cccccc',
  },
};

export const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f2f2f2',
    border: '#d8d8d8',
    card: '#ffffff',
    notification: '#ff3b30',
    primary: '#007aff',
    text: '#1c1c1e',
  },
};
