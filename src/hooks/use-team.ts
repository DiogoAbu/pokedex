import { MMKV as storage } from 'react-native-mmkv';

const storageKey = 'pokémon-teams';

type PokeTeamOneOrArray<Id> = Id extends number ? PokeTeam : PokeTeam[];

export interface PokeTeam {
  id: number;
  name: string;
  pokemonIds: [number, number, number, number, number, number];
  createdAt: number;
  updatedAt: number;
}

export default function useTeam<Id extends number | undefined, ResponseData extends PokeTeamOneOrArray<Id>>(
  id?: Id,
): ResponseData | null {
  let teamData: ResponseData | null = null;

  // const test: PokeTeam[] = [
  //   {
  //     id: 1,
  //     name: 'Starters',
  //     pokemonIds: [1, 4, 7, 0, 0, 0],
  //     createdAt: 0,
  //     updatedAt: 0,
  //   },
  //   {
  //     id: 2,
  //     name: 'Brute force',
  //     pokemonIds: [10, 20, 55, 70, 80, 99],
  //     createdAt: 0,
  //     updatedAt: 0,
  //   },
  // ];
  // return test;

  try {
    // Read from storage
    const dataStored = storage.getString(storageKey);
    if (dataStored) {
      // Got data
      teamData = JSON.parse(dataStored);
    }
  } catch {
    teamData = null;
  }

  if (id && Array.isArray(teamData)) {
    return teamData?.find((team: PokeTeam) => team.id === id);
  }

  return teamData;
}
