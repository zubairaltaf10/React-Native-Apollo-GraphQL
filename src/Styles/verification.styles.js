import {StyleSheet, Platform} from 'react-native';
import COLORS from '../Theme/Colors';
import {FONTFAMILY} from '../Theme/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  inputLabel: {
    paddingBottom: 80,
    
    fontSize: 18,
    textAlign: 'center',
  },
  inputSubLabel: {
    color: COLORS.blackText,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
    fontFamily: FONTFAMILY.medium,
  },
  
  inputWrapStyle: {
    height: 50,
    marginTop: 60,
  },
  input: {
    height: 50,
    width: 50,
    borderRadius: 3,
    color: COLORS.primary,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.4)',

    ...Platform.select({
      web: {
        lineHeight: 46,
      },
    }),
  },
  inputNotEmpty: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  resendBtn: {
    marginTop: 40,
    alignItems: 'center',
  },
  resendText: {
    color: COLORS.primary,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slide: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 25,
    elevation: 2,
    borderRadius: 6,
    margin: 6,
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: FONTFAMILY.extraBold,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray,
    fontFamily: FONTFAMILY.medium,
  },
  card: {
    elevation: 4,
    backgroundColor: 'white',
    padding: 8,
    marginTop: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  name: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.bold,
  },
  price: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  trialBtn: {
    padding: 3,
    marginVertical: 30,
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: 'white',
  },
  trialTxt: {
    color: COLORS.primary,
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
  },
});
