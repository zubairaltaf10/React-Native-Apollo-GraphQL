import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import COLORS from '../../Theme/Colors';
import {FONTSIZES, FONTFAMILY} from '../../Theme/Fonts';
import {Metrics} from '../../Theme';
const PlusButton = ({title, onPress, marginTop = 4, disabled, bgcolor = COLORS.primary }) => {
  return (
    <View style={{marginTop: Metrics.screenHeight / marginTop}}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled }
        style={[styles.touchable, {opacity: disabled ? 0.7 : 1, backgroundColor: bgcolor}]}
        onPress={onPress}>
        
          <Text style={styles.title}>{title}</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 30,
    
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width:40,
    height:40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(40, 41, 47, 1)',
    fontSize: 16,
    marginTop:4,
    fontFamily: FONTFAMILY.bold
  },
  spinner: {
    marginRight: 20,
  },
});
export default PlusButton;
