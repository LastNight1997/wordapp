import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Tabs, Tab } from 'native-base';
import SignInForm from 'app/components/SignInForm';
import PreSignUpForm from 'app/components/PreSignUpForm';
import global from 'app/styles/global';
import { setUserData, setAuthKey, getProgress, getSubscription } from 'app/actions';


class SignInScreen extends Component {
  state = {
    afterSignUp: false,
  };
  onSignUp = () => {
    this.setState({ afterSignUp: true });
  };
  onPreSignUp = (email, userName) => {
    this.props.navigation.push('SignUp', { email, userName, onSignUp: this.onSignUp });
  };
  onSignIn = (auth, name, email) => {
    this.props.setAuthKey(auth);
    this.props.setUserData(name, email);
    this.props.getProgress();
    this.props.getSubscription();
    this.props.navigation.goBack();
  };
  render() {
    return (
      <Container style={global.container}>
        <Tabs initialPage={0} locked>
          <Tab heading="登录" >
            <View style={{ paddingHorizontal: 20 }}>
              <SignInForm onSuccess={this.onSignIn} afterSignUp={this.state.afterSignUp} />
            </View>
          </Tab>
          <Tab heading="注册">
            <View style={{ paddingHorizontal: 20 }}>
              <PreSignUpForm onSuccess={this.onPreSignUp} afterSignUp={this.state.afterSignUp} />
            </View>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  setUserData: (userName, email) => dispatch(setUserData(userName, email)),
  setAuthKey: auth => dispatch(setAuthKey(auth)),
  getProgress: () => dispatch(getProgress()),
  getSubscription: () => dispatch(getSubscription()),
});

SignInScreen.navigationOptions = {
  title: '登录',
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
