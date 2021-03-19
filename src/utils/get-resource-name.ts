import { ResourceType } from '!/types';

export default function getResourceName(resource: ResourceType): string {
  switch (resource) {
    case 'pokemons':
      return 'Pokémons';
    case 'moves':
      return 'Moves';
    case 'abilities':
      return 'Abilities';
    case 'items':
      return 'Items';
    case 'locations':
      return 'Locations';
    case 'typeCharts':
    default:
      return 'Type Charts';
  }
}
