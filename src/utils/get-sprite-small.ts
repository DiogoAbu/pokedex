import { IPokemonSprites } from 'pokeapi-typescript';

export default function getSpriteDefault(
  sprites: IPokemonSprites,
  options?: {
    female?: boolean;
    shiny?: boolean;
    back?: boolean;
  },
): string {
  if (sprites.front_default && !options?.back) {
    return options?.shiny ? sprites.front_shiny : sprites.front_default;
  }
  if (sprites.front_female && options?.female && !options?.back) {
    return options?.shiny ? sprites.front_shiny_female : sprites.front_female;
  }
  if (sprites.back_default && options?.back) {
    return options?.shiny ? sprites.back_shiny : sprites.back_default;
  }
  if (sprites.back_female && options?.female && options?.back) {
    return options?.shiny ? sprites.back_shiny_female : sprites.back_female;
  }
  return options?.shiny
    ? options?.female
      ? sprites.front_shiny_female
      : sprites.front_shiny
    : options?.female
    ? sprites.front_female
    : sprites.front_default;
}
