import { IEvolutionChain, IEvolutionDetail, INamedApiResource, IPokemonSpecies } from 'pokeapi-typescript';

export interface EvolutionChainOne {
  fromSpecies?: INamedApiResource<IPokemonSpecies>;
  toSpecies: INamedApiResource<IPokemonSpecies>;
  condition: IEvolutionDetail;
}

// https://stackoverflow.com/questions/39112862/pokeapi-angular-how-to-get-pokemons-evolution-chain
export default function getEvolutionChain(evolution: IEvolutionChain): EvolutionChainOne[] {
  const evoChain = [];
  let chain = evolution.chain;
  let fromSpecies;

  do {
    evoChain.push({
      fromSpecies,
      toSpecies: chain.species,
      condition: chain.evolution_details[0] ?? {},
    });

    const numberOfEvolutions = chain.evolves_to.length;
    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i++) {
        evoChain.push({
          fromSpecies: chain.species,
          toSpecies: chain.evolves_to[i].species,
          condition: chain.evolves_to[i].evolution_details[0] ?? {},
        });
      }
    }

    fromSpecies = chain.species;
    chain = chain.evolves_to[0];
  } while (!!chain && chain?.evolves_to);

  return evoChain;
}
