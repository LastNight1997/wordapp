import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation';
import SignInScreen from 'app/screens/signIn';
import AccountScreen from 'app/screens/account';
import BookScreen from 'app/screens/book';
import SubscribeScreen from 'app/screens/subscribe';
import SignUpScreen from 'app/screens/signUp';
import constants from 'app/constants';

const AccountTab = createStackNavigator({
  Account: AccountScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  Book: BookScreen,
  Subscribe: SubscribeScreen,
}, {
  initialRouteName: 'Account',
});

AccountTab.navigationOptions = {
  tabBarLabel: '设置',
  tabBarIcon: ({ tintColor }) => (<Icon name="settings" color={tintColor} size={constants.styles.tabBarIconSize} />),
};

export default AccountTab;
