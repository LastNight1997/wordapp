import types from 'app/actions/actionTypes';
import books from 'app/assets/data/books.json';
import words from 'app/assets/data/words.json';


export default (state = {}, action) => {
  const v = state.versions || {};
  const bookVersion = { books: books.version, words: v.words };
  const wordVersion = { words: words.version, books: v.books };
  switch (action.type) {
    case types.LOAD_LOCAL_BOOKS:
      return Object.assign({}, state, { books: books.data }, { versions: bookVersion });
    case types.LOAD_LOCAL_WORDS:
      return Object.assign({}, state, { words: words.data }, { versions: wordVersion });
    default:
      return state;
  }
};
