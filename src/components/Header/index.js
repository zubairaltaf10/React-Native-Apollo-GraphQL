import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../Theme';
import {Icon} from 'native-base';
import {withNavigation} from 'react-navigation';
import {
  Container,
  Header as NBHeader,
  Left,
  Body,
  Right,
  Image,
  Button,
  Title,
} from 'native-base';
import {FONTFAMILY} from '../../Theme/Fonts';

const Header = ({title, navigation, hideBack = false}) => {
  return (
    <NBHeader style={styles.container}>
      <Left style={styles.left}>
        {!hideBack && (
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Icon name="md-arrow-back" style={styles.icon} type="Ionicons" />
          </TouchableOpacity>
        )}
      </Left>
      <Body style={{flex: 3}}>
        <Title style={styles.title}>
       
        </Title>
        
      </Body>
      <Right style={styles.right}>
        {/* <Button hasText transparent>
          <Text>Cancel</Text>
        </Button> */}
      </Right>
    </NBHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: ,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  icon: {
    color: 'white',
    fontSize: 25,
  },
  left: {
    flex: 1,
  },
  title: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 17,
    fontFamily: FONTFAMILY.medium,
  },
  right: {
    flex: 1,
  },
});
export default withNavigation(Header);
