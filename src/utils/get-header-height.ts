import { Platform, ScaledSize } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';

export const getHeaderHeight = (layout: ScaledSize): number => {
  const isLandscape = layout.width > layout.height;

  let headerHeight;

  if (Platform.OS === 'ios') {
    if (isLandscape && !Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return headerHeight + getStatusBarHeight();
};
