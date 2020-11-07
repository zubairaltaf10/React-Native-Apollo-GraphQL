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
    height: 45,
    color:'#868CA9',
    marginTop: 15,
    fontSize: 13,
    paddingBottom:5,
    fontFamily: FONTFAMILY.regular,
    paddingLeft: 10,
  },
  blackTextCenter: {
    color: 'rgba(106, 106, 106, 1)',
    textAlign: 'center',
  },
  errorLabel: {
    color: COLORS.primary,
    fontFamily: FONTFAMILY.medium,
    fontSize:12
  },
});

export default ApplicationStyles;
