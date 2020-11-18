import {StyleSheet} from 'react-native';
import COLORS from '../Theme/Colors';
import {FONTFAMILY} from '../Theme/Fonts';
import {Metrics} from '../Theme'


export default StyleSheet.create({
  
  
    overlay: {
      backgroundColor: '#f2f2f4',
      ...StyleSheet.absoluteFillObject,
      opacity: 0.9,
    },
    modelHeading: {
      textAlign: 'center',
      fontFamily: FONTFAMILY.bold,
      fontSize: 18,
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
      marginTop: Metrics.screenHeight / 5,
      padding: 20,
      elevation: 6,
      borderRadius: 7,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 26,
        padding: 6,
      },
  })