import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PokeAPI, { Endpoint, IPokemonType } from 'pokeapi-typescript';

// Main Stack Screens with Parameters
export type MainStackParams = {
  Home: undefined;
  ResourceList: {
    resource: ResourceType;
  };
  PokemonDetails: {
    resource: ResourceType;
    id: number;
    name: string;
    displayName: string;
    types: IPokemonType[];
    spriteUrl: string;
    backgroundColor: string;
    skipShared?: boolean;
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

export type PokeApiEndpoint = keyof Omit<typeof PokeAPI, 'prototype'>;

export type GenericOfPokeApi<E> = E extends Endpoint<infer X> ? X : never;

export type BaseStatNames = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
