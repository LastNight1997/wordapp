import React, { Component } from 'react';
import { View } from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Content, Card, Text, Button, CardItem, Grid, Row, Col } from 'native-base';
import { connect } from 'react-redux';
import { reviewWord } from 'app/actions';
import { getQuiz } from 'app/selectors';
import { prettyTranslation } from 'app/utils';

class QuizScreen extends Component {
  state = {
    selectedChoice: -1,
  };
  buttonSuccess(choiceIndex) {
    const { quiz } = this.props;
    const { selectedChoice } = this.state;
    return (selectedChoice >= 0) && (choiceIndex === quiz.correctChoice);
  }
  buttonDanger(choiceIndex) {
    const { quiz } = this.props;
    const { selectedChoice } = this.state;
    return selectedChoice >= 0 &&
      selectedChoice === choiceIndex &&
      selectedChoice !== quiz.correctChoice;
  }
  selectChoice = (index) => {
    if (this.state.selectedChoice >= 0) return;
    this.setState({ selectedChoice: index });
  };
  submit = () => {
    const { quiz } = this.props;
    const { selectedChoice } = this.state;
    if (selectedChoice < 0) return;
    this.props.reviewWord(quiz.wordId, selectedChoice === quiz.correctChoice);
    this.setState({ selectedChoice: -1 });
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    let cardBody = (
      <Card>
        <CardItem
          bordered
          style={{
          flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <Icon name="ios-checkmark-circle" color="teal" size={24} />
          <Text style={material.title}>已完成今日所有测验</Text>
        </CardItem>
        <CardItem footer style={{ flex: 0 }}>
          <View style={{ flex: 1, alignItems: 'center' }} />
          <Button transparent onPress={this.goBack}>
            <Text>返回</Text>
          </Button>
        </CardItem>
      </Card>
    );
    if (this.props.quiz) {
      const choices = this.props.quiz.choices.map((choice, index) => (
        <Button
          key={choice}
          block
          bordered
          rounded
          dark
          danger={this.buttonDanger(index)}
          success={this.buttonSuccess(index)}
          onPress={() => this.selectChoice(index)}
          style={{ marginVertical: 5 }}
        >
          <Text numberOfLines={1}>{prettyTranslation(choice)}</Text>
        </Button>
      ));
      cardBody = (
        <Card>
          <CardItem bordered style={{ flex: 1 }}>
            <Grid>
              <Row style={{ flex: 1 }}>
                <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={material.headline}>{this.props.quiz.word}</Text>
                </Col>
              </Row>
              <Row style={{ flex: 3 }}>
                <Col>
                  {choices}
                </Col>
              </Row>
            </Grid>
          </CardItem>
          <CardItem footer style={{ flex: 0 }}>
            <View style={{ flex: 1, alignItems: 'center' }} />
            <Button transparent disabled={this.state.selectedChoice < 0} onPress={this.submit}>
              <Text>下一题</Text>
            </Button>
          </CardItem>
        </Card>
      );
    }
    return (
      <Container>
        <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          {cardBody}
        </Content>
      </Container>
    );
  }
}

QuizScreen.navigationOptions = {
  title: '测验',
};

const mapStateToProps = state => ({
  quiz: getQuiz(state),
});

const mapDispatchToProps = dispatch => ({
  reviewWord: (wordId, result) => dispatch(reviewWord(wordId, result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);
