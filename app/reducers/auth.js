import types from 'app/actions/actionTypes';


export default (auth = '', action) => {
  switch (action.type) {
    case types.SET_AUTH_KEY:
      return action.payload.auth;
    case types.REMOVE_AUTH_KEY:
      return '';
    default:
      return auth;
  }
};
