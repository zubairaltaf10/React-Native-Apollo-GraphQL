import {StyleSheet} from 'react-native';
import COLORS from '../Theme/Colors';
import {FONTFAMILY} from '../Theme/Fonts';
export default StyleSheet.create({
  form: {
    paddingTop: 40,
    paddingHorizontal: 12,
    // paddingTop: 60,
    // paddingBottom: 10,
  },
  alreadyAccountLabel: {
    textAlign: 'center',
    marginTop: 22,
    fontFamily: FONTFAMILY.medium,
  },
  redText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 20,
    padding: 6,
  },
  forgotTxt: {
    color: COLORS.primary,
    fontFamily: FONTFAMILY.bold,
  },
  topLabel: {
    color: COLORS.blackText,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: '5%',
    fontFamily: FONTFAMILY.medium,
  },
  passwordFieldContainer: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 27,
    padding: 6,
  },
});
