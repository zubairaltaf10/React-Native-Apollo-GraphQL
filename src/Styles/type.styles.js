import {StyleSheet} from 'react-native';
import Metrics from '../Theme/Metrics';
import {FONTFAMILY} from '../Theme/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: 10,
  },
  textfield: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 0.4)',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: Metrics.deviceHeight / 4,
    fontFamily: FONTFAMILY.medium,
  },
  overlay: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
  },
  modelHeading: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },

  modelContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: Metrics.screenHeight / 2.8,
    padding: 20,
    elevation: 6,
    borderRadius: 7,
  },
});
