import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Card, Text } from 'native-base';
import WordCard from '../../components/WordCard';


class WordDetailScreen extends Component {
  render() {
    const id = this.props.navigation.getParam('id', 0);
    const item = this.props.words.find(w => w.id === id);
    const body = item ? (
      <WordCard word={item.word} phonetic={item.phonetic} translation={item.translation} />
    ) : (<Text>无此单词</Text>);
    return (
      <Container>
        <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <Card>
            {body}
          </Card>
        </Content>
      </Container>
    );
  }
}

WordDetailScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('word', '单词'),
});

const mapStateToProps = state => ({
  words: state.words,
});

export default connect(mapStateToProps)(WordDetailScreen);
