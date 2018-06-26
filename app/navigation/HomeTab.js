import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from 'app/screens/home';
import SubscribeScreen from 'app/screens/subscribe';
import BookScreen from 'app/screens/book';
import constants from 'app/constants';

const HomeTab = createStackNavigator({
  Home: HomeScreen,
  Book: BookScreen,
  Subscribe: SubscribeScreen,
}, {
  initialRouteName: 'Home',
  headerMode: 'float',
});

HomeTab.navigationOptions = {
  tabBarLabel: '主页',
  tabBarIcon: ({ tintColor }) => (<Icon name="home" color={tintColor} size={constants.styles.tabBarIconSize} />),
};

export default HomeTab;
