import { StyleSheet } from 'react-native';

import { constants } from '!/services/theme';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: constants.grid,
  },

  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  skeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: constants.grid,
    marginVertical: constants.gridSmall,
    borderRadius: constants.grid,
  },

  cardTopContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.6,
  },

  cardSpriteImageContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  cardSpriteImage: {
    width: 128,
    height: 128,
  },
});

export default styles;
