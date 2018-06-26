import types from 'app/actions/actionTypes';


export default (userData = {}, action) => {
  switch (action.type) {
    case types.SET_USER_DATA: {
      const { userName, email } = action.payload;
      return { userName, email };
    }
    case types.REMOVE_USER_DATA:
      return {};
    default:
      return userData;
  }
};
