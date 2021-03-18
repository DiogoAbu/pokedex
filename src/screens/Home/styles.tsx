import { StyleSheet } from 'react-native';

import { constants } from '!/services/theme';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },

  headerContent: {
    margin: constants.smallGrid,
    padding: constants.grid,
  },
  headerText: {
    textAlign: 'center',
  },

  itemText: {
    padding: constants.grid,
  },
});

export default styles;
