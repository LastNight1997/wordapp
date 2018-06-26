import axios from 'axios';
import constants from 'app/constants';
import store from 'app/store';

export default function () {
  const headers = store.getState().auth ? { authorization: store.getState().auth } : {};
  return axios.create({
    baseURL: constants.base,
    headers,
  });
}

export const oxfordAPI = axios.create({
  headers: constants.api.oxford.headers,
});
