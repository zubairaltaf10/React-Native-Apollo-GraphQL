import {checkEmail, checkName, checkPassword} from './Validations';

export const GetProfileErrors = formData => {
  const errors = [];
  for (var i in formData) {
    if (i === 'first_name') {
      if (formData.first_name === '') {
        errors.push('firstName');
      }
     
    }else if (i === 'last_name') {
      if (formData.last_name === '') {
        errors.push('lastName');
      }
    }
  }
  
  return errors;
};

export const GetPasswordErrors = passworddata => {
  const errors = [];
  for (var i in passworddata) {
    if (i === 'old_password') {
      if (passworddata.old_password === '') {
         errors.push('oldPassword');
       }
     }
     if (i === 'password') {
      if (!checkPassword(passworddata.password)) {
        errors.push('password');
      }
    }
    if (i === 'confirmPassword') {
      if (passworddata.password !== passworddata.confirmPassword) {
        errors.push('confirmPassword');
      }
    }
  
    
    
  }
  return errors;
};
