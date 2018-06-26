import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import store from 'app/store';
import Root from './app/components/Root';

// Temp workaround for a bug in React triggering warnings
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
YellowBox.ignoreWarnings(['Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);

PushNotification.configure({
  onNotification(notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
