import { IPokemonMove } from 'pokeapi-typescript';
import sortArray from 'sort-array';

import getIdFromUrl from './get-id-from-url';

export default function sortMoves(moves: IPokemonMove[]): IPokemonMove[] {
  return sortArray(moves, {
    by: ['learnMethod', 'levelLearnedAt', 'learnMethodId', 'moveId'],
    order: ['learnMethod', 'levelLearnedAt', 'learnMethodId', 'moveId'],
    customOrders: {
      learnMethod: [
        'level-up',
        'machine',
        'egg',
        'tutor',
        'stadium-surfing-pikachu',
        'light-ball-egg',
        'colosseum-purification',
        'xd-shadow',
        'xd-purification',
        'form-change',
      ],
    },
    computed: {
      learnMethod: (item) => {
        return item.version_group_details[0].move_learn_method.name;
      },
      learnMethodId: (item) => {
        return getIdFromUrl(item.version_group_details[0].move_learn_method.url);
      },
      levelLearnedAt: (item) => {
        return item.version_group_details[0].level_learned_at;
      },
      moveId: (item) => {
        return getIdFromUrl(item.move.url);
      },
    },
  });
}
