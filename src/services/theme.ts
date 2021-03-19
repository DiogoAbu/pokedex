import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

const grid = 16;

export const constants = {
  grid,
  gridSmall: grid / 2,
  gridBig: grid * 2,
  headerHeight: 80,
  colors: {
    white: '#ffffff',
    black: '#000000',

    pokemons: '#4fc1a6',
    moves: '#f7786b',
    abilities: '#58aaf6',
    items: '#ffc018',
    locations: '#7c538c',
    typeCharts: '#b1736c',

    pokemonsOverlay: '#65d4bd',
    movesOverlay: '#f98b7e',
    abilitiesOverlay: '#6fc1f9',
    itemsOverlay: '#ffd25d',
    locationsOverlay: '#9569a5',
    typeChartsOverlay: '#c1867f',
  },
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
