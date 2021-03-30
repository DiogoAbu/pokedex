import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

const grid = 16;

export const constants = {
  grid,
  gridSmall: grid / 2,
  gridBig: grid * 2,
  shimmerDuration: 800,
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
  typesColor: {
    normal: '#A8A878',
    fire: '#F08030',
    fighting: '#C03028',
    water: '#6890F0',
    flying: '#A890F0',
    grass: '#78C850',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    psychic: '#F85888',
    rock: '#B8A038',
    ice: '#98D8D8',
    bug: '#A8B820',
    dragon: '#7038F8',
    ghost: '#705898',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
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
    primary: '#e73648',
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
    primary: '#e73648',
    text: '#1c1c1e',
  },
};
