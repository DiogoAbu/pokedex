import { StyleSheet } from 'react-native';

import { constants } from '!/services/theme';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },

  headerInfoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: constants.grid,
  },

  headerInfoTopContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerNumber: {
    position: 'absolute',
    bottom: constants.grid,
    right: constants.grid,
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 38,
  },

  spriteImage: {
    width: 128,
    height: 128,
    alignSelf: 'center',
  },
  pokeballContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pokeball: {
    width: 128,
    height: 128,
    opacity: 0.15,
  },

  headerFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopStartRadius: constants.grid,
    borderTopEndRadius: constants.grid,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  headerFooterPressable: {
    overflow: 'hidden',
  },
  headerFooterText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: constants.grid,
    textTransform: 'uppercase',
  },
  headerFooterLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 1,
    height: StyleSheet.hairlineWidth * 4,
  },

  infoOuterContainer: {
    flex: 1,
    padding: constants.grid,
  },
  infoRowContainer: {
    flexDirection: 'row',
  },
  infoTitleContainer: {
    paddingRight: constants.gridBig,
    opacity: 0.6,
  },
  infoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: constants.gridSmall,
  },
  infoSectionTitle: {
    paddingBottom: constants.gridSmall,
    paddingTop: constants.grid,
    fontWeight: 'bold',
  },
  infoRightStretch: {
    flex: 1,
  },

  evolutionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: constants.grid,
    paddingBottom: constants.gridBig,
  },
  evolutionPokeballImage: {
    width: 96,
    height: 96,
    ...StyleSheet.absoluteFillObject,
    top: constants.gridSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  evolutionPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  evolutionPokemonSprite: {
    width: 96,
    height: 96,
  },
  evolutionPokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: constants.grid,
  },
  evolutionConditionContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: constants.gridBig,
    justifyContent: 'center',
    alignItems: 'center',
  },
  evolutionChip: {
    alignSelf: 'center',
    marginBottom: constants.gridSmall,
  },

  moveItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  tabEmptyText: {
    textAlign: 'center',
  },

  aboutSkeleton: {
    padding: constants.grid,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  footerImage: {
    width: 240,
    height: 240,
    alignSelf: 'center',
  },
});

export default styles;
