import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { Container, Content, List, ListItem, Text, Body, Right, Button } from 'native-base';
import { getNewWords, getTodayUnviewedNewWordsCount } from 'app/selectors';
import global from 'app/styles/global';
import WordItem from 'app/components/WordItem';

class NewWordListScreen extends Component {
  renderItem = ({ item, index }) => (
    <WordItem
      word={item.word}
      isViewed={!!item.viewDate}
      onPress={() => this.props.navigation.push('Word', { index })}
    />
  );
  goWord = () => {
    const index = this.props.words.findIndex(word => !word.viewDate);
    if (index >= 0) {
      this.props.navigation.push('Word', { index });
    }
  };
  render() {
    const viewedCount = this.props.words.length - this.props.unviewedCount;
    const viewStyle = this.props.unviewedCount === 0 ? { color: 'teal' } : {};
    return (
      <Container>
        <Content>
          <List style={global.list}>
            <ListItem itemDivider>
              <Text style={material.caption}>学习进度</Text>
            </ListItem>
            <ListItem noIndent>
              <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[material.caption, viewStyle]}>
                  { this.props.unviewedCount > 0 ? '今日背诵进度' : '今日计划已完成' }
                </Text>
                <Text style={[material.title, viewStyle]}>
                  {`${viewedCount} / ${this.props.words.length}`}
                </Text>
              </Body>
            </ListItem>
            {this.props.unviewedCount > 0 && (
              <ListItem noIndent icon>
                <Body />
                <Right>
                  <Button transparent onPress={this.goWord}>
                    <Text>继续背诵</Text>
                  </Button>
                </Right>
              </ListItem>
            )}
            <ListItem itemDivider>
              <Text style={material.caption}>生词列表</Text>
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

NewWordListScreen.navigationOptions = {
  title: '背诵',
};

const mapStateToProps = state => ({
  words: getNewWords(state),
  unviewedCount: getTodayUnviewedNewWordsCount(state),
});

export default connect(mapStateToProps)(NewWordListScreen);
