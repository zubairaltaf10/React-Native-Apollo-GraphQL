import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import COLORS from '../../Theme/Colors';
import {FONTSIZES, FONTFAMILY} from '../../Theme/Fonts';
import {Metrics} from '../../Theme';
const PrimaryButton = ({title, onPress, marginTop = 4, disabled, loading,checkeditems}) => {
  return (
    <View style={{marginTop: Metrics.screenHeight / marginTop}}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || loading}
        style={[styles.touchable, {opacity: disabled ? 0.7 : 1},{backgroundColor: checkeditems == true || checkeditems == undefined  ? COLORS.primary : '#7070702D'}]}
        onPress={onPress}>
        <View style={styles.row}>
          {loading && (
            <ActivityIndicator style={styles.spinner} color={'white'} />
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
   // backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 45,
    paddingVertical: 8,
    paddingTop:14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(40, 41, 47, 1)',
    fontSize: 14,
    fontFamily: FONTFAMILY.bold
  },
  spinner: {
    marginRight: 20,
  },
});
export default PrimaryButton;
