import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import COLORS from '../../Theme/Colors';
import {FONTSIZES, FONTFAMILY} from '../../Theme/Fonts';
import {Metrics} from '../../Theme';
const MinusButton = ({title, onPress, marginTop = 4, disabled , bdcolor = COLORS.primary }) => {
  return (
    <View style={{marginTop: Metrics.screenHeight / marginTop}}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        style={[styles.touchable, {opacity: disabled ? 0.7 : 1, borderColor:bdcolor, backgroundColor: '#FFBD5900'}]}
        onPress={onPress}>
        
          <Text style={styles.title}>{title}</Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    //borderColor: this.disabled == false ? COLORS.primary : '#868CA9',
    borderWidth:1,
    borderRadius: 20,
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
    fontSize: 20,
    marginTop:4,
    fontFamily: FONTFAMILY.bold
  },
  spinner: {
    marginRight: 20,
  },
});
export default MinusButton;
