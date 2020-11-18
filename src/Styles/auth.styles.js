import {StyleSheet} from 'react-native';
import COLORS from '../Theme/Colors';
import {FONTFAMILY} from '../Theme/Fonts';
import { height,width,totalSize } from "react-native-dimension";
import {Metrics} from '../Theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    fontSize:12,
    marginTop:'10%'
    
  },
  profilecontainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    fontSize:12,
    
  },
  form: {
    paddingHorizontal: 12,
    marginHorizontal:'4%'
    // paddingTop: 60,
    // paddingBottom: 10,
  },
  form1: {
    paddingHorizontal: 12,
    marginHorizontal:'1%',
   marginBottom:10
  },
  
  alreadyAccountLabel: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: FONTFAMILY.regular,
    fontSize:11
  },
  skipAccountLabel:{
    textAlign: 'center',
    marginTop: 22,
    marginBottom: 22,
    fontStyle:'italic',
    textDecorationLine: 'underline',
    fontFamily: FONTFAMILY.medium,
    color:COLORS.primary,
    fontSize:12
   },
  termandconLabel: {
    textAlign: 'left',
    marginTop: 18,
    marginVertical:'5%',
    fontFamily: FONTFAMILY.medium,
    fontSize:12
    
  },
  termandconlink: {
    textAlign: 'left',
    marginTop: 18,
    margin:'5%',
    fontFamily: FONTFAMILY.medium,
    fontSize:13,
    textDecorationLine: 'underline',
    fontWeight:'bold'
  },
  backarrow: {
    textAlign: 'left',
    marginTop: 42,
    fontSize:10

  },
  backarrowforgot: {
    textAlign: 'left',
    marginTop: 32,
    marginVertical:'5%',
    fontSize:10

  },
  redText: {
    fontWeight: 'bold',
    fontSize:12,
    fontFamily:FONTFAMILY.extraBold
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 20,
    padding: 6,
    
  },
  forgotTxt: {
    color: COLORS.blackText,
    fontFamily: FONTFAMILY.regular,
    fontSize:12
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
    fontSize: 14,
    paddingHorizontal: '13%',
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
    marginTop:'10%'
  },
  logintopLabel1: {
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
    top: 26,
    padding: 6,
  },
  logo: {
    width: 112,
    height: 62,
  },
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:'3%'
  },
  topheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:'5%'
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
   headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    alignItems:'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 63,
   // borderWidth: 4,
    // borderColor: "#28292F",
     backgroundColor: "#28292F",
    
  },
  avatareditcircle:{
    backgroundColor:COLORS.primary, justifyContent: 'center', 
            alignItems:'center', width:45, height:45, borderRadius:30, 
            position: 'absolute',right: '51%',bottom: '10%'
  },
  body:{
    alignItems:'flex-start',
    
  },
  item:{
    flexDirection : 'row',
  },
  label:{
    marginTop:15,
    fontFamily:FONTFAMILY.medium,
    color:'#868CA9',
    fontSize:12
  },
  editform: {
    paddingHorizontal: 12,
    marginHorizontal:'2%'
    // paddingTop: 60,
    // paddingBottom: 10,
  },

  overlay: {
    backgroundColor: '#f2f2f4',
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  modelHeading: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.bold,
    fontSize: 18,
    marginBottom:20
  },
  modeltext: {
    marginTop: 20,
    color: '#868CA9',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTFAMILY.regular,
    marginHorizontal:'10%'
  },
  modelSubheading: {
    marginTop: 10,
    color: 'rgba(106, 106, 106, 1)',
    textAlign: 'center',
    fontSize: 13,
    paddingHorizontal: 20,
    fontFamily: FONTFAMILY.medium,
  },
  modelContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  // /  marginTop: Metrics.screenHeight / 4.5,
    padding: 20,
    elevation: 6,
    borderRadius: 7,
  },

});
