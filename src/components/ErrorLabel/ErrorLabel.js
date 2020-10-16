import {signupValidation} from '../../Constants/Strings';
import React from 'react';
import {Text} from 'react-native';
import {ApplicationStyles} from '../../Theme';

const ErrorLabel = (component, errors) => {
  if (errors.indexOf(component) !== -1) {
    return (
      <Text style={ApplicationStyles.errorLabel}>
        {signupValidation[component]}
      </Text>
    );
  }
};
export default ErrorLabel;
