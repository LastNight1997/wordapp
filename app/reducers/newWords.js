import types from 'app/actions/actionTypes';

export default (newWords, action) => {
  switch (action.type) {
    case types.GET_NEW_WORD:
      // Locally computed new words
      return newWords;
    case types.GET_NEW_WORD_COMMIT:
      // Fetched from server
      return newWords;
    default:
      return newWords;
  }
};
