import {StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Fonts } from '../Theme';
import COLORS from '../Theme/Colors';
import {FONTFAMILY} from '../Theme/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize:12
  },
  emailview:{
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12 ,
    marginBottom:10
  },
  text: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  
  image: {
    flex: 1,
resizeMode: "cover",
justifyContent: "center"
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
  buttonImageIconStyle:{
    width:15
  },
  buttonFacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#485a96',
    height: 50,
    borderRadius: 25,
    margin: 5,
    paddingVertical:5,
    fontFamily: FONTFAMILY.bold,
  },
  buttonGoogleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F8',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 50,
    borderRadius: 25,
    margin: 5,
    paddingVertical:5,
    fontFamily: FONTFAMILY.bold,
    fontSize:12
  },
  buttonAppleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 0.5,
    borderColor: '#000000',
    height: 50,
    borderRadius: 25,
    margin: 5,
    paddingVertical:5,
    fontFamily: FONTFAMILY.bold,
    fontSize:12
    
  },
  buttonImageIconStyle: {
    marginLeft:4,
    flex:0.2,
    justifyContent:'flex-start',
    resizeMode: 'contain',
  },
  buttonTextStyle: {
    color: '#fff',
    fontFamily: FONTFAMILY.bold,
    fontSize:13,
    flex:0.7,
    marginTop:4
  },
  termandconlink: {
    textAlign: 'left',
    marginTop: 18,
    margin:'5%',
    fontFamily: FONTFAMILY.medium,
    fontSize:14,
    textDecorationLine: 'underline',
    fontWeight:'bold'
  },
 
  GooglebuttonTextStyle: {
    color: '#28292F',
    fontFamily: FONTFAMILY.bold,
    fontSize:13,
    flex:0.7,
    marginTop:4
  },
  GooglebuttonTextStyle1: {
    color: '#28292F',
    fontFamily: FONTFAMILY.bold,
    fontSize:13,
    marginTop:4
  },
  logo: {
    width: 112,
    height: 72,
  },
  introContainer : {
    borderRadius:15, 
    marginHorizontal:'10%',
   backgroundColor:'#fff',
   fontSize:12,
    paddingHorizontal:15,
    paddingVertical:15,
    marginTop:10,
    marginBottom:30
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
 alreadyAccountLabel: {
  textAlign: 'center',
  marginTop: 22,
  fontFamily: FONTFAMILY.medium,
  fontSize:12,
  color:'#F4F4F8'
},
orview:{
  textAlign: 'center',
  alignItems: 'center',
  margin:20,
},
absolute: {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}
});
