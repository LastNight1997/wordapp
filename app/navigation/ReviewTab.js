import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation';
import ReviewListScreen from 'app/screens/reviewList';
import QuizScreen from 'app/screens/quiz';
import WordDetailScreen from 'app/screens/wordDetail';
import constants from 'app/constants';

const ReviewTab = createStackNavigator({
  ReviewList: ReviewListScreen,
  Quiz: QuizScreen,
  WordDetail: WordDetailScreen,
}, {
  initialRouteName: 'ReviewList',
});

ReviewTab.navigationOptions = {
  tabBarLabel: '复习',
  tabBarIcon: ({ tintColor }) => (<Icon name="book" color={tintColor} size={constants.styles.tabBarIconSize} />),
};

export default ReviewTab;
