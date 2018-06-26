import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Card, CardItem, Button, Text } from 'native-base';
import global from 'app/styles/global';
import { getNewWords } from 'app/selectors';
import { viewWord } from 'app/actions';
import WordCard from 'app/components/WordCard';


class WordScreen extends Component {
  goPrevWord = () => {
    const index = this.props.navigation.getParam('index', 0) - 1;
    if (index < 0) return;
    this.props.navigation.replace('Word', { index });
  };
  goNextWord = () => {
    const index = this.props.navigation.getParam('index', 0) + 1;
    if (index >= this.props.words.length) return;
    this.props.navigation.replace('Word', { index });
  };
  render() {
    const index = this.props.navigation.getParam('index', 0);
    const hasNext = this.props.words.length > (index + 1);
    const hasPrev = index > 0;
    const item = this.props.words[index];
    return (
      <Container>
        <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <Card>
            <WordCard
              word={item.word}
              phonetic={item.phonetic}
              translation={item.translation}
              definition={item.definition}
              viewed={!!item.viewDate}
            />
            <CardItem footer>
              <Button transparent disabled={!hasPrev} onPress={this.goPrevWord}>
                <Text>上一个</Text>
              </Button>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: 'grey' }}>{`${index + 1} / ${this.props.words.length}`}</Text>
              </View>
              <Button transparent disabled={!hasNext} onPress={this.goNextWord}>
                <Text>下一个</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
  componentDidMount() {
    const index = this.props.navigation.getParam('index', 0);
    if (this.props.words[index].viewDate) return;
    this.props.viewWord(this.props.words[index].id);
  }
}

WordScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('word', '生词'),
});

const mapStateToProps = state => ({
  words: getNewWords(state),
});

const mapDispatchToProps = dispatch => ({
  viewWord: id => dispatch(viewWord(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordScreen);
