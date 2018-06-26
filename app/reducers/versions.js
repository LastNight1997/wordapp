import types from 'app/actions/actionTypes';

const initial = {
  books: undefined,
  words: undefined,
};

export default (versions = initial, action) => {
  switch (action.type) {
    case types.GET_WORDS_COMMIT:
      // Payload === response
      return action.payload.data;
    default:
      return versions;
  }
};
