import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation';
import NewWordListScreen from 'app/screens/newWordList';
import WordScreen from 'app/screens/word';
import constants from 'app/constants';

const NewWordTab = createStackNavigator({
  NewWordList: NewWordListScreen,
  Word: WordScreen,
}, {
  initialRouteName: 'NewWordList',
});

NewWordTab.navigationOptions = {
  tabBarLabel: '背诵',
  tabBarIcon: ({ tintColor }) => (<Icon name="fiber-new" color={tintColor} size={constants.styles.tabBarIconSize} />),
};

export default NewWordTab;
