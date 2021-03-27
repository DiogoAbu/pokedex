import { IPokemonType } from 'pokeapi-typescript';

import { constants } from '!/services/theme';

export default function getTypeColor(type?: IPokemonType[] | string): string | undefined {
  let backgroundColor: string | undefined;
  try {
    const typeName = (typeof type === 'string'
      ? type
      : type?.[0].type.name) as keyof typeof constants.typesColor;
    backgroundColor = constants.typesColor[typeName];
  } catch {
    backgroundColor = undefined;
  }

  return backgroundColor;
}
