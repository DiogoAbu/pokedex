import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PokeAPI, { Endpoint } from 'pokeapi-typescript';

// Main Stack Screens with Parameters
export type MainStackParams = {
  Home: undefined;
  ResourceList: {
    resource: ResourceType;
  };
  Details: {
    index: number;
  };
};

// Navigation prop for Main Stack screens
export type MainNavigationProp<RouteName extends keyof MainStackParams> = StackNavigationProp<
  MainStackParams,
  RouteName
>;

// Route prop for Main Stack screens
export type MainRouteProp<RouteName extends keyof MainStackParams> = RouteProp<MainStackParams, RouteName>;

export type ResourceType = 'pokemons' | 'moves' | 'abilities' | 'items' | 'locations' | 'typeCharts';

export type PokeApiResource = keyof Omit<typeof PokeAPI, 'prototype'>;

export type GenericOfPokeApi<E> = E extends Endpoint<infer X> ? X : never;
