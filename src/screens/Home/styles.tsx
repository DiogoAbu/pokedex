import { StyleSheet } from 'react-native';

import { constants } from '!/services/theme';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },

  imagePokeball: {
    opacity: 0.1,
    position: 'absolute',
    top: -60,
    right: -96,
    width: 256,
    height: 256,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 32,
  },

  searchbar: {
    marginTop: constants.grid,
    marginBottom: constants.gridBig,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  card: {
    borderBottomEndRadius: constants.grid,
    borderBottomStartRadius: constants.grid,
    shadowColor: constants.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default styles;
