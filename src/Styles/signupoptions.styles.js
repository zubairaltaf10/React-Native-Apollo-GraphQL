import {StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import COLORS from '../Theme/Colors';
import {FONTFAMILY} from '../Theme/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  emailview:{
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
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
    height: 45,
    borderRadius: 25,
    margin: 5,
    paddingHorizontal:20,
    paddingVertical:5
  },
  buttonGoogleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F8',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 45,
    borderRadius: 25,
    margin: 5,
    paddingHorizontal:22,
    paddingVertical:5
  },
  buttonAppleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 0.5,
    borderColor: '#000000',
    height: 45,
    borderRadius: 25,
    margin: 5,
    paddingHorizontal:22,
    paddingVertical:5
    
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: '#fff',
    fontFamily: FONTFAMILY.bold,
  },
  GooglebuttonTextStyle: {
    color: '#28292F',
    fontFamily: FONTFAMILY.bold,
  },
  
  logo: {
    width: 112,
    height: 72,
  },
  introContainer : {
    borderRadius:15, 
    marginHorizontal:'10%',
    marginVertical:'13%',
   backgroundColor:'#FFFFFF',
    paddingHorizontal:20,
    paddingVertical:10,
 },
 skipAccountLabel:{
  textAlign: 'center',
  marginTop: 22,
  marginBottom: 22,
  fontFamily: FONTFAMILY.medium,
  color:COLORS.primary
 },
 alreadyAccountLabel: {
  textAlign: 'center',
  marginTop: 22,
  fontFamily: FONTFAMILY.medium,
  color:'#F4F4F8'
},
orview:{
  textAlign: 'center',
  alignItems: 'center',
  margin:20
},
absolute: {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}
});
