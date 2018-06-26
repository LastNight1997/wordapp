import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from 'react-native-modal-datetime-picker';
import isEmpty from 'lodash-es/isEmpty';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, List, ListItem, Text, Body, Right, Icon, Button, Switch, Left } from 'native-base';
import global from 'app/styles/global';
import { removeAuthKey, removeUserData, setNotificationEnable, setNotificationTime } from 'app/actions';


class AccountScreen extends Component {
  constructor() {
    super();
    this.state = {
      isDatePickerVisible: false,
    };
  }
  pickerConfirm = (date) => {
    this.props.setNotificationTime(date.getHours(), date.getMinutes());
    this.rescheduleNotification(date.getHours(), date.getMinutes());
    this.setState({ isDatePickerVisible: false });
  };
  pickerCancel = () => {
    this.setState({ isDatePickerVisible: false });
  };
  setNotification = (enabled) => {
    this.props.setNotificationEnable(enabled);
    const { hour, minute } = this.props.notification.time;
    this.rescheduleNotification(hour, minute);
  };
  rescheduleNotification = (hour, minute) => {
    PushNotification.cancelAllLocalNotifications();
    if (this.props.notification.enabled) {
      const fireDate = new Date();
      fireDate.setHours(hour);
      fireDate.setMinutes(minute);
      console.log('From state: ', fireDate);
      PushNotification.localNotificationSchedule({
        message: '该背单词了',
        date: fireDate,
        repeatInterval: 'day',
      });
    }
  };
  signOut = () => {
    Alert.alert(
      '确认登出',
      '您的学习记录将保留在本地，但不会再同步到云端',
      [
        { text: '取消', onPress: () => {}, style: 'cancel' }, {
          text: '登出',
          onPress: () => {
            this.props.removeAuthKey();
            this.props.removeUserData();
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };
  render() {
    const { hour, minute } = this.props.notification.time;
    const notificationTime = new Date();
    notificationTime.setHours(hour);
    notificationTime.setMinutes(minute);
    const zeroPadding = minute < 10 ? '0' : '';
    const notificationTimeString = `${hour}:${zeroPadding}${minute}`;
    const userItem = isEmpty(this.props.userData) ? (
      <ListItem noIndent onPress={() => this.props.navigation.push('SignIn')}>
        <MaterialIcon name="account-circle" size={20} />
        <Body style={{ flex: 1 }} >
          <Text>登录 / 注册</Text>
          <Text style={material.caption}>登录后，学习记录将与云端同步</Text>
        </Body>
        <Right style={{ justifyContent: 'center' }}>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    ) : (
      <ListItem noIndent>
        <MaterialIcon name="account-circle" size={20} />
        <Body style={{ flex: 1 }} >
          <Text key={0}>{this.props.userData.userName}</Text>
          <Text style={material.caption} key={1}>{this.props.userData.email}</Text>
        </Body>
      </ListItem>
    );
    return (
      <Container>
        <Content>
          <List style={global.list}>
            <ListItem itemDivider>
              <Text style={material.caption}>用户</Text>
            </ListItem>
            {userItem}
            <ListItem itemDivider>
              <Text style={material.caption}>设置</Text>
            </ListItem>
            <ListItem icon onPress={() => this.props.navigation.push('Book')} >
              <Left>
                <MaterialIcon name="library-books" size={20} />
              </Left>
              <Body>
                <Text>更改背诵计划</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <MaterialIcon name="notifications" size={20} />
              </Left>
              <Body>
                <Text>通知提醒</Text>
              </Body>
              <Right>
                <Switch
                  value={this.props.notification.enabled}
                  onValueChange={this.setNotification}
                />
              </Right>
            </ListItem>
            {this.props.notification.enabled && (
              <ListItem
                icon
                disabled={!this.props.notification.enabled}
                onPress={() => this.setState({ isDatePickerVisible: true })}
              >
                <Left>
                  <MaterialIcon name="access-time" size={20} />
                </Left>
                <Body>
                  <Text>每日提醒时间</Text>
                </Body>
                <Right style={{ justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>{notificationTimeString}</Text>
                    <Icon name="arrow-forward" />
                  </View>
                </Right>
              </ListItem>
            )}
            <ListItem itemDivider>
              <Text style={material.caption}>{' '}</Text>
            </ListItem>
            <ListItem>
              <Button danger block transparent onPress={this.signOut}>
                <Text>登出</Text>
              </Button>
            </ListItem>
          </List>
        </Content>
        <DateTimePicker
          date={notificationTime}
          mode="time"
          locale="zh"
          onDateChange={() => {}}
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.pickerConfirm}
          onCancel={this.pickerCancel}
          cancelTextIOS="取消"
          confirmTextIOS="确认"
          titleIOS="选择通知时间"
        />
      </Container>
    );
  }
}

AccountScreen.navigationOptions = {
  title: '账户与设置',
};

const mapStateToProps = state => ({
  userData: state.userData,
  notification: state.notification,
});

const mapDispatchToProps = dispatch => ({
  removeAuthKey: () => dispatch(removeAuthKey()),
  removeUserData: () => dispatch(removeUserData()),
  setNotificationEnable: enabled => dispatch(setNotificationEnable(enabled)),
  setNotificationTime: (hour, minute) => dispatch(setNotificationTime(hour, minute)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
