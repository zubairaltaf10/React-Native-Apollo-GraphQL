import React, {useState, useEffect} from 'react';
import {View, Text, Modal, Keyboard, TextInput, TouchableOpacity, Image} from 'react-native';
import {ApplicationStyles, Metrics} from '../../Theme';
import {Content, Form, Input, Icon} from 'native-base';
import PrimaryButton from '../Button/PrimaryButton';
import styles from '../../Styles/modelstyles';
import COLORS from '../../Theme/Colors';
import ErrorLabel from '../ErrorLabel/ErrorLabel';
//import authstyle from '../../Styles/auth.styles'
const SecurityQuestion = ({
  modalVisible,
  onChangeText,
  handleSecurityVerification,
  isPasswordFieldSecure,
  onRequestClose,
  onChangeText1,
  handleSecurity2,
  isnewPasswordFieldSecure,
  onChangeText2,
  handleSecurity3,
  errors,
  updatepassword,
  isConfirmPasswordFieldSecure,
  user = {},
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardVisible(false);
  };
  const Clicktest = () => {
    console.log('sss')
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onRequestClose}>
      <View style={styles.overlay} onTouchEnd={onRequestClose} />
      <View
        style={[
          styles.modelContainer,
          {
            marginTop: isKeyboardVisible
              ? Metrics.screenHeight / 11
              : Metrics.screenHeight / 6,
          },
        ]}>
         <Text style={styles.modelHeading}>
                          Reset Password
          </Text>
            <Text style={styles.modeltext}>
            Choose a strong new password. Make sure it's unique!
            </Text>

            <View style={styles.passwordFieldContainer}>
              <TextInput
                placeholder="Old Password"
                secureTextEntry={isPasswordFieldSecure}
                maxLength={16}
                style={ApplicationStyles.textbox}
                onChangeText={onChangeText
                }
              />

              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={handleSecurityVerification
                }>
                {!isPasswordFieldSecure && (
                  <Icon name="eye" type="AntDesign" style={{fontSize: 16, color: COLORS.primary}}></Icon>
                 
                )}
                {isPasswordFieldSecure && (
                  <Image
                    source={require('../../assets/icons/forms/eye-close-fill.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            {ErrorLabel('oldPassword', errors)}
            <View style={styles.passwordFieldContainer}>
              <TextInput
                placeholder="New Password"
                secureTextEntry={isnewPasswordFieldSecure}
                maxLength={16}
                style={ApplicationStyles.textbox}
                onChangeText={onChangeText1
                }
              />

              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={handleSecurity2
                }>
                {!isnewPasswordFieldSecure && (
                  <Icon name="eye" type="AntDesign" style={{fontSize: 16, color: COLORS.primary}}></Icon>
                 
                )}
                {isnewPasswordFieldSecure && (
                  <Image
                    source={require('../../assets/icons/forms/eye-close-fill.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            {ErrorLabel('password', errors)}
            <View style={styles.passwordFieldContainer}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={isConfirmPasswordFieldSecure}
                maxLength={16}
                style={ApplicationStyles.textbox}
                onChangeText={onChangeText2
                }
              />

              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={handleSecurity3
                }>
                {!isConfirmPasswordFieldSecure && (
                  <Icon name="eye" type="AntDesign" style={{fontSize: 16, color: COLORS.primary}}></Icon>
                 
                )}
                {isConfirmPasswordFieldSecure && (
                  <Image
                    source={require('../../assets/icons/forms/eye-close-fill.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            {ErrorLabel('confirmPassword', errors)}
            <PrimaryButton
              title="RESET PASSWORD"
              marginTop={8}
              onPress={updatepassword}
              //loading={this.state.loading}
            />
      </View>
    </Modal>
  );
};

export default SecurityQuestion;
