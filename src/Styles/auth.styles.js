import {StyleSheet} from 'react-native';
import COLORS from '../Theme/Colors';
import {FONTFAMILY} from '../Theme/Fonts';
import { height,width,totalSize } from "react-native-dimension";

export default StyleSheet.create({
  form: {
    paddingTop: 15,
    paddingHorizontal: 12,
    // paddingTop: 60,
    // paddingBottom: 10,
  },
  alreadyAccountLabel: {
    textAlign: 'center',
    marginTop: 22,
    fontFamily: FONTFAMILY.medium,
  },
  termandconLabel: {
    textAlign: 'left',
    marginTop: 22,
    margin:'5%',
    fontFamily: FONTFAMILY.medium,
    
  },
  redText: {
    color: COLORS.blackText,
    fontWeight: 'bold',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 20,
    padding: 6,
  },
  forgotTxt: {
    color: COLORS.blackText,
    fontFamily: FONTFAMILY.bold,
  },
  topLabel: {
    color: COLORS.blackText,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: '5%',
    fontFamily: FONTFAMILY.medium,
  },
  topheadingLabel: {
    color: COLORS.blackText,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: '5%',
    fontFamily: FONTFAMILY.bold,
    marginBottom:'20%',
    marginTop:'5%'
  },
  logintopLabel: {
    color: COLORS.blackText,
    textAlign: 'left',
    fontSize: 22,
    paddingHorizontal: '5%',
    paddingEnd:'5%',
    fontFamily: FONTFAMILY.medium,
    
  },
  passwordFieldContainer: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 23,
    padding: 6,
  },
  logo: {
    width: 112,
    height: 62,
  },
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  socialMediaButton: {
    //  flex: 2,
    width: width(25),
    borderRadius: 25,
    paddingVertical: height(1.5),
    marginTop: height(3),
    alignItems: "center",
    justifyContent: "center",
    marginLeft:width(5),
    backgroundColor: "#eb1a43" 
    },
  google: {
    color: "#fff",
    fontSize: totalSize(2.2),
  },
  fbbtn : {
    backgroundColor: "#3b5998",
    width: width(25),
    borderRadius: 25,
    paddingVertical: height(1.5),
    marginTop: height(3),

    alignItems: "center",
    justifyContent: "center",
  }
});
