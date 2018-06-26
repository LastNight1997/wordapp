import types from 'app/actions/actionTypes';


export default (rehydrated = false, action) => {
  switch (action.type) {
    case types.REHYDRATE_COMPLETE:
      return true;
    default:
      return rehydrated;
  }
};
