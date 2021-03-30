import { StyleSheet } from 'react-native';

import { constants } from '!/services/theme';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },

  headerContainer: {
    borderBottomEndRadius: constants.grid,
    borderBottomStartRadius: constants.grid,
    shadowColor: constants.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  contentTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: constants.gridBig,
    marginBottom: constants.grid,
    marginLeft: constants.gridSmall / 2,
  },
  emptyTeamText: {
    textAlign: 'center',
    margin: constants.grid,
  },

  pokemonTeamSeparator: {
    backgroundColor: constants.colors.black,
    opacity: 0.2,
  },
  pokemonTeamContainer: {
    paddingVertical: constants.gridSmall,
  },
  pokemonTeamRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pokemonTeamSpriteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonTeamName: {
    fontSize: 16,
  },
  pokemonTeamSprite: {
    width: 64,
    height: 64,
  },
  pokemonTeamPokeballContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonTeamPokeball: {
    width: 48,
    height: 48,
    opacity: 0.1,
  },

  searchListItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
