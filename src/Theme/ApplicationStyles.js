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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#rgba(9, 56, 149, 0.1)',
    borderRadius: 12,
    height: 50,
    color:'rgba(134, 140, 169, 1)',
    marginTop: 10,
    fontSize: FONTSIZES.inputLabel,
    fontFamily: FONTFAMILY.regular,
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
