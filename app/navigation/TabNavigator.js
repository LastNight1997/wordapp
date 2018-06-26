import { createBottomTabNavigator } from 'react-navigation';
import HomeTab from './HomeTab';
import NewWordTab from './NewWordTab';
import AccountTab from './AccountTab';
import ReviewTab from './ReviewTab';

export default createBottomTabNavigator({
  HomeTab,
  NewWordTab,
  ReviewTab,
  AccountTab,
}, {
  swipeEnabled: false,
  tabBarOptions: {
    // ...
  },
});
