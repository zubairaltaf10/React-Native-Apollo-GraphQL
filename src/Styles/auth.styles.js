import {StyleSheet} from 'react-native';
import COLORS from '../Theme/Colors';
import {FONTFAMILY} from '../Theme/Fonts';
import { height,width,totalSize } from "react-native-dimension";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    fontSize:12
  },
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
    fontSize:11
  },
  termandconLabel: {
    textAlign: 'left',
    marginTop: 18,
    margin:'5%',
    fontFamily: FONTFAMILY.medium,
    
  },
  backarrow: {
    textAlign: 'left',
    marginTop: 42,
    margin:'5%',
    fontSize:10

  },
  backarrowforgot: {
    textAlign: 'left',
    marginTop: 32,
    margin:'5%',
    fontSize:10

  },
  redText: {
    color: COLORS.blackText,
    fontWeight: 'bold',
    fontSize:12
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
  inputLabel: {
    paddingBottom: 80,
    paddingTop:10,
    fontSize: 18,
    textAlign: 'center',
  },
  topLabel: {
    color: COLORS.blackText,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: '17%',
    fontFamily: FONTFAMILY.medium,
    paddingBottom:30
  },
  topheadingLabel: {
    color: COLORS.blackText,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: '5%',
    fontFamily: FONTFAMILY.bold,
    marginBottom:'20%',
   
  },
  logintopLabel: {
    color: '#28292F',
    textAlign: 'left',
    fontSize: 20,
    paddingHorizontal: '5%',
    paddingEnd:'5%',
    fontFamily: FONTFAMILY.regular,
    
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
  },
  icon: {
    color: '#333',
    fontSize: 22,
  },
  

});
