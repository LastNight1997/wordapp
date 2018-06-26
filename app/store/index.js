import { createStore, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import config from '@redux-offline/redux-offline/lib/defaults';

import http from 'app/http';
import rootReducer from 'app/reducers';
import SplashScreen from 'react-native-splash-screen';
import { rehydrate } from 'app/actions';

const effect = f => http()(f);

const discard = (e) => {
  const { request, response } = e;
  if (!request) throw e; // There was an error creating the request
  if (!response) return false; // There was no response
  return response.status >= 400 && response.status < 500;
};

// eslint-disable-next-line no-underscore-dangle,no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const createOfflineStore = (persistCallback) => {
  const myConfig = {
    ...config,
    persistCallback,
    effect,
    discard,
  };
  return createStore(
    rootReducer,
    composeEnhancers(offline(myConfig)),
  );
};

const store = createOfflineStore(() => {
  SplashScreen.hide();
  store.dispatch(rehydrate());
});

export default store;
