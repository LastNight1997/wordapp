import types from 'app/actions/actionTypes';


export default (booksState = [], action) => {
  switch (action.type) {
    case types.GET_BOOKS_COMMIT:
      // Get books from server, Payload ==> response
      return action.payload.data;
    default:
      return booksState;
  }
};
