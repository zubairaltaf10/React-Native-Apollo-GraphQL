import Snackbar from 'react-native-snackbar';
import COLORS from '../Theme/Colors';

const SNACKBAR = {
  simple(text, type) {
    Snackbar.show({
      text,
      duration:
        type === 'indefinite'
          ? Snackbar.LENGTH_INDEFINITE
          : type === 'long'
          ? Snackbar.LENGTH_LONG
          : Snackbar.LENGTH_SHORT,
      backgroundColor: COLORS.primary,
      textColor: 'white',
    });
  },
};
export default SNACKBAR;
