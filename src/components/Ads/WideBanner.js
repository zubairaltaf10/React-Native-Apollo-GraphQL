import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
const WideBanner = () => {
  return (
    // <View />
    <View style={styles.container}>
      <Text style={styles.label}>320x50 Google Ad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    height: 50,
    width: 320,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
  },
});
export default WideBanner;
