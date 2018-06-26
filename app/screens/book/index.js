import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import BookCard from 'app/components/BookCard';
import { getBookProgress } from 'app/selectors';

class BookScreen extends Component {
  render() {
    const books = this.props.books.map((book, index) => (
      <BookCard
        name={book.name}
        size={book.size}
        key={book.id}
        viewedCount={book.viewedCount}
        isCurrent={this.props.subscription.bookId === book.id}
        jump={() => {
          this.props.navigation.push('Subscribe', { index });
        }}
      />
    ));
    return (
      <Container>
        <Content padder>
          {books}
        </Content>
      </Container>
    );
  }
}

BookScreen.navigationOptions = {
  title: '单词书',
};

const mapStateToProps = state => ({
  books: getBookProgress(state),
  subscription: state.subscription,
});

export default connect(mapStateToProps)(BookScreen);
