import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { Container, Content, Button, Text, List, ListItem, Body, Right, Icon, Grid, Row, Col } from 'native-base';
import global from 'app/styles/global';
import { getReviewWords, getTodayReviewedWordsCount } from 'app/selectors';
import WordItem from 'app/components/WordItem';
import { dateDiffInDays } from 'app/utils';

class ReviewListScreen extends Component {
  goQuiz = () => {
    this.props.navigation.push('Quiz');
  };
  viewWord = (item) => {
    if (!ReviewListScreen.isItemReviewed(item)) return;
    this.props.navigation.push('WordDetail', { id: item.id });
  };
  static isItemReviewed(item) {
    return !!item.reviewDate && (dateDiffInDays(new Date(), new Date(item.reviewDate)) < 1);
  }
  renderItem = ({ item }) => (
    <WordItem
      word={item.word}
      isViewed={ReviewListScreen.isItemReviewed(item)}
      onPress={() => this.viewWord(item)}
      navigatable={ReviewListScreen.isItemReviewed(item)}
      isMistaken={item.lastReviewResult === false}
    />
  );
  render() {
    const unreviewedCount = this.props.words.length - this.props.reviewedCount;
    const correctCount = this.props.words.filter(word => word.lastReviewResult).length;
    const rate = Math.round(correctCount / this.props.reviewedCount * 100);
    const rateStyle = rate === 100 ? { color: 'teal' } : {};
    const reviewStyle = unreviewedCount === 0 ? { color: 'teal' } : {};
    return (
      <Container>
        <Content>
          <List style={global.list}>
            <ListItem itemDivider>
              <Text style={material.caption}>复习进度</Text>
            </ListItem>
            <ListItem noIndent>
              <Body>
                <Grid>
                  <Row>
                    <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={[material.caption, reviewStyle]}>
                        { unreviewedCount > 0 ? '今日复习进度' : '今日计划已完成' }
                      </Text>
                      <Text style={[material.title, reviewStyle]}>
                        {`${this.props.reviewedCount} / ${this.props.words.length}`}
                      </Text>
                    </Col>
                    <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={[material.caption, rateStyle]}>
                        正确率
                      </Text>
                      <Text style={[material.title, rateStyle]}>
                        {rate ? `${rate}%` : '--'}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              </Body>
            </ListItem>
            {unreviewedCount > 0 && (
              <ListItem noIndent icon>
                <Body />
                <Right>
                  <Button transparent onPress={this.goQuiz}>
                    <Text>开始测验</Text>
                  </Button>
                </Right>
              </ListItem>
            )}
            <ListItem itemDivider>
              <Text style={material.caption}>复习词汇</Text>
            </ListItem>
            <FlatList
              data={this.props.words}
              renderItem={this.renderItem}
              keyExtractor={item => item.id.toString()}
              initialNumToRender={15}
            />
          </List>
        </Content>
      </Container>
    );
  }
}

ReviewListScreen.navigationOptions = {
  title: '复习测验',
};

const mapStateToProps = state => ({
  words: getReviewWords(state),
  reviewedCount: getTodayReviewedWordsCount(state),
});

export default connect(mapStateToProps)(ReviewListScreen);
