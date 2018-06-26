import React, { PureComponent } from 'react';
import { Card, CardItem, Text, Grid, Row, Col, View, Button } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { material } from 'react-native-typography';
import { getNewWords, getReviewWords, getTodayUnviewedNewWordsCount, getTodayReviewedWordsCount } from 'app/selectors';
import PushNotification from 'react-native-push-notification';

class TodayCard extends PureComponent {
  notification = () => {
    const fireDate = new Date();
    fireDate.setSeconds(fireDate.getSeconds() + 5);
    PushNotification.localNotificationSchedule({
      message: 'My Notification Message',
      date: fireDate,
      repeatInterval: 'day',
    });
  };
  render() {
    const viewedCount = this.props.newWords.length - this.props.unviewedCount;
    const toReviewCount = this.props.reviewWords.length - this.props.reviewedCount;
    const viewStyle = this.props.unviewedCount === 0 ? { color: 'teal' } : {};
    const reviewStyle = toReviewCount === 0 ? { color: 'teal' } : {};
    return (
      <Card>
        <CardItem header bordered style={{ borderTopWidth: 2, borderTopColor: 'mediumblue' }}>
          <Text style={material.subheading}>今日计划</Text>
        </CardItem>
        <CardItem cardBody bordered>
          <Grid>
            <Row height={120}>
              <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[material.caption, viewStyle]}>今日学习进度</Text>
                <Text style={[material.title, viewStyle]}>
                  {`${viewedCount} / ${this.props.newWords.length}`}
                </Text>
              </Col>
              <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[material.caption, reviewStyle]}>今日复习进度</Text>
                <Text style={[material.title, reviewStyle]}>
                  {`${this.props.reviewedCount} / ${this.props.reviewWords.length}`}
                </Text>
              </Col>
            </Row>
          </Grid>
        </CardItem>
        <CardItem footer bordered>
          <Button transparent small onPress={() => this.props.navigation.navigate('NewWordTab')}>
            <Text>浏览生词</Text>
          </Button>
          <View style={{ flex: 1 }} />
          <Button
            transparent
            small
            onPress={() => {
            this.notification();
            this.props.navigation.navigate('ReviewTab');
          }}
          >
            <Text>去复习</Text>
          </Button>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  newWords: getNewWords(state),
  unviewedCount: getTodayUnviewedNewWordsCount(state),
  reviewWords: getReviewWords(state),
  reviewedCount: getTodayReviewedWordsCount(state),
});

export default connect(mapStateToProps)(withNavigation(TodayCard));
