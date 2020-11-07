import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import COLORS from '../../Theme/Colors';
import {FONTSIZES, FONTFAMILY} from '../../Theme/Fonts';
import {Metrics} from '../../Theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const PrimaryButton2 = ({title, onPress, marginTop = 4, disabled, loading}) => {
  return (
    <View style={{marginTop: Metrics.screenHeight / marginTop}}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || loading}
        style={[styles.touchable, {opacity: disabled ? 0.7 : 1}]}
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
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.primary,
    fontSize: FONTSIZES.btnLabel,
    fontFamily: FONTFAMILY.bold,
    fontWeight:'bold'
  },
  spinner: {
    marginRight: 20,
  },
});
export default PrimaryButton2;
