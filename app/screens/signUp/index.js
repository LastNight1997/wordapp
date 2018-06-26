import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content } from 'native-base';
import SignUpForm from 'app/components/SignUpForm';
import global from 'app/styles/global';

export default class SignUpScreen extends Component {
  onSignUp = () => {
    Alert.alert(
      '注册成功',
      '请使用您的注册邮箱登录',
      [
        { text: '好', onPress: () => this.props.navigation.goBack(), style: 'ok' },
      ],
      { cancelable: false },
    );
  };
  render() {
    const { email, userName } = this.props.navigation.state.params;
    return (
      <Container style={global.container}>
        <Content padder>
          <SignUpForm email={email} userName={userName} onSuccess={this.onSignUp} />
        </Content>
      </Container>
    );
  }
}

SignUpScreen.navigationOptions = {
  title: '完成注册',
};
