import { combineReducers } from 'redux';
import words from './words';
import books from './books';
import subscription from './subscription';
import auth from './auth';
import rehydrated from './rehydrated';
import userData from './userData';
import notification from './notification';

export default combineReducers({
  words,
  books,
  subscription,
  auth,
  userData,
  rehydrated,
  notification,
});
