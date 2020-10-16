import {StyleSheet} from 'react-native';
import {FONTSIZES, FONTFAMILY} from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';
import COLORS from './Colors';
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = StyleSheet.create({
  textbox: {
    // backgroundColor: 'rgba(0, 0, 0, 0.05)',
    // borderColor: 'rgba(112, 112, 112, 0.4)',
    // borderWidth: 2,
    // paddingLeft: 14,
    // marginTop: 15,
    // borderRadius: 6,
    // fontSize: FONTSIZES.inputLabel,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.4)',
    borderRadius: 4,
    height: 40,
    marginTop: 20,
    fontSize: FONTSIZES.inputLabel,
    fontFamily: FONTFAMILY.medium,
    paddingLeft: 15,
  },
  blackTextCenter: {
    color: 'rgba(106, 106, 106, 1)',
    textAlign: 'center',
  },
  errorLabel: {
    color: COLORS.primary,
    fontFamily: FONTFAMILY.medium,
  },
});

export default ApplicationStyles;
