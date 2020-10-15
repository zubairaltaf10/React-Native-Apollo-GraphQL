import {StatusBar} from 'react-native';
import {Colors} from '../Theme';

const StatusBarColorHandler = routeName => {
  if (routeName === 'Lang') {
    StatusBar.setBackgroundColor('#2b2b2b');
    StatusBar.setBarStyle('light-content');
  } else if (routeName === 'Login' || routeName === 'Signup') {
    StatusBar.setBackgroundColor('#fff');
    StatusBar.setBarStyle('dark-content');
  } else {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  }
};

export default StatusBarColorHandler;
