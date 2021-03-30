import Snackbar, { SnackBarOptions } from 'react-native-snackbar';

let isShowing = false;

export function showSingletonSnackbar(options: SnackBarOptions): void {
  if (!isShowing) {
    isShowing = true;
    Snackbar.show(options);
  }
}
export function dismissSingletonSnackbar(): void {
  isShowing = false;
  Snackbar.dismiss();
}
