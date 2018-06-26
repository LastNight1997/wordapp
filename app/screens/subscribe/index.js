import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Row, Col, CardItem, Card, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { material } from 'react-native-typography';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import global from 'app/styles/global';
import { postSubscription } from 'app/actions';
import { dateDiffInDays, shortISO } from 'app/utils';
import styles from './styles';

class SubscribeScreen extends Component {
  state = {
    isDatePickerVisible: false,
    quota: 30,
    goal: shortISO(new Date()),
  };
  componentDidMount() {
    this.setQuota('30');
  }
  openPicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  pickerCancel = () => {
    this.setState({ isDatePickerVisible: false });
  };
  setQuota = (quotaText) => {
    const index = this.props.navigation.getParam('index', 0);
    const quota = parseInt(quotaText, 10);
    const days = Math.ceil((this.props.books[index].size || 1) / quota) - 1;
    const target = new Date();
    target.setDate(target.getDate() + days);
    this.setState({
      quota,
      isDatePickerVisible: false,
      goal: shortISO(target),
    });
  };
  setGoal = (date) => {
    const index = this.props.navigation.getParam('index', 0);
    const days = dateDiffInDays(date, new Date());
    const quota = Math.ceil((this.props.books[index].size || 1) / (days + 1));
    this.setState({
      quota,
      isDatePickerVisible: false,
      goal: shortISO(date),
    });
  };
  saveSubscription = () => {
    const index = this.props.navigation.getParam('index', 0);
    this.props.postSubscription(this.props.books[index].id, this.state.quota);
    this.props.navigation.goBack();
  };
  render() {
    const index = this.props.navigation.getParam('index', 0);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + this.props.books[index].size - 1);
    return (
      <Container>
        <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} >
          <Card>
            <CardItem bordered style={{ flex: 1, borderTopWidth: 2, borderTopColor: 'blue' }}>
              <Grid>
                <Row>
                  <Col style={{ alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={styles.label}>单词书</Text>
                    <Text style={material.headline}>{this.props.books[index].name}</Text>
                  </Col>
                  <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>单词数</Text>
                    <Text style={material.headline}>{this.props.books[index].size}</Text>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
            <CardItem bordered style={{ flex: 2 }}>
              <Grid>
                <Row>
                  <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Input
                      inputStyle={styles.input}
                      label="每日背诵单词"
                      labelStyle={styles.label}
                      value={this.state.quota.toString()}
                      keyboardType="numeric"
                      onEndEditing={e => this.setQuota(e.nativeEvent.text)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Input
                      inputStyle={styles.input}
                      label="计划完成日期"
                      labelStyle={styles.label}
                      editable={false}
                      rightIcon={
                        <TouchableOpacity onPress={this.openPicker}>
                          <Icon name="calendar" />
                        </TouchableOpacity>
                      }
                      value={this.state.goal}
                      onChangeText={goal => this.setState({ goal })}
                    />
                  </Col>
                </Row>
              </Grid>
            </CardItem>
            <CardItem footer bordered style={{ flex: 0 }}>
              <Body />
              <Right>
                <Button transparent onPress={this.saveSubscription}>
                  <Text>保存计划</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <DateTimePicker
            date={new Date()}
            onDateChange={() => {}}
            minimumDate={new Date()}
            maximumDate={maxDate}
            mode="date"
            locale="zh"
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.setGoal}
            onCancel={this.pickerCancel}
            cancelTextIOS="取消"
            confirmTextIOS="确认"
            titleIOS="选择完成日期"
          />
        </Content>
      </Container>
    );
  }
}

SubscribeScreen.navigationOptions = {
  title: '背诵计划',
};

const mapStateToProps = state => ({
  books: state.books,
  subscription: state.subscription,
});

const mapDispatchToProps = dispatch => ({
  postSubscription: (bookId, quota) => dispatch(postSubscription(bookId, quota)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeScreen);
