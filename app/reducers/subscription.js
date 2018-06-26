import types from 'app/actions/actionTypes';

export default (subscription = {}, action) => {
  switch (action.type) {
    case types.POST_SUBSCRIPTION:
      // Payload: { bookId, quota }
      return { bookId: action.payload.bookId, quota: action.payload.quota };
    case types.GET_SUBSCRIPTION_COMMIT:
      // Payload: response
      return { bookId: action.payload.data.bookId, quota: action.payload.data.quota };
    default:
      return subscription;
  }
};
