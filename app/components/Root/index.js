import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabNavigator from 'app/navigation/TabNavigator';
import { getBooks, getWords } from 'app/actions';

class Root extends Component {
  componentDidMount() {
    this.checkResources();
  }
  componentDidUpdate() {
    this.checkResources();
  }
  checkResources = () => {
    if (this.props.rehydrated && this.props.books.length === 0) {
      this.props.getBooks();
      return;
    }
    if (this.props.rehydrated && this.props.words.length === 0) {
      this.props.getWords();
    }
  };
  render() {
    return (
      <TabNavigator />
    );
  }
}

const mapStateToProps = state => ({
  words: state.words,
  books: state.books,
  rehydrated: state.rehydrated,
});

const mapDispatchToProps = dispatch => ({
  getWords: () => dispatch(getWords()),
  getBooks: () => dispatch(getBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
