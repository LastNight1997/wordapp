import constants from 'app/constants';
import action from './actionTypes';

export const getWords = () => ({
  type: action.GET_WORDS,
  meta: {
    offline: {
      effect: {
        url: constants.endPoint.words,
        method: 'GET',
      },
      commit: {
        type: action.GET_WORDS_COMMIT,
      },
    },
  },
});

export const getBooks = () => ({
  type: action.GET_BOOKS,
  meta: {
    offline: {
      effect: {
        url: constants.endPoint.books,
        method: 'GET',
      },
      commit: {
        type: action.GET_BOOKS_COMMIT,
      },
    },
  },
});

export const getProgress = () => ({
  type: action.GET_PROGRESS,
  meta: {
    offline: {
      effect: {
        url: constants.endPoint.progress,
        method: 'GET',
      },
      commit: {
        type: action.GET_PROGRESS_COMMIT,
      },
    },
  },
});

export const postSubscription = (bookId, quota) => ({
  type: action.POST_SUBSCRIPTION,
  payload: { bookId, quota },
  meta: {
    offline: {
      effect: {
        url: constants.endPoint.subscription,
        method: 'POST',
        data: { bookId, quota },
      },
      commit: {
        type: action.POST_SUBSCRIPTION_COMMIT,
      },
    },
  },
});

export const viewWord = wordId => ({
  type: action.VIEW_WORD,
  payload: { wordId },
  meta: {
    offline: {
      effect: {
        url: `${constants.endPoint.viewWord}/${wordId}`,
        method: 'POST',
        data: { wordId },
      },
      commit: {
        type: action.VIEW_WORD_COMMIT,
      },
    },
  },
});

export const reviewWord = (wordId, result) => ({
  type: action.REVIEW_WORD,
  payload: { wordId, result },
  meta: {
    offline: {
      effect: {
        url: `${constants.endPoint.revision}`,
        method: 'POST',
        data: { wordId, result },
      },
      commit: {
        type: action.VIEW_WORD_COMMIT,
      },
    },
  },
});

export const setAuthKey = auth => ({
  type: action.SET_AUTH_KEY,
  payload: { auth },
});

export const removeAuthKey = () => ({
  type: action.REMOVE_AUTH_KEY,
  payload: {},
});

export const setUserData = (userName, email) => ({
  type: action.SET_USER_DATA,
  payload: { userName, email },
});

export const removeUserData = () => ({
  type: action.REMOVE_USER_DATA,
  payload: {},
});

export const rehydrate = () => ({
  type: action.REHYDRATE_COMPLETE,
  payload: {},
});

export const setNotificationEnable = enabled => ({
  type: action.SET_NOTIFICATION_ENABLE,
  payload: { enabled },
});

export const setNotificationTime = (hour, minute) => ({
  type: action.SET_NOTIFICATION_TIME,
  payload: { hour, minute },
});

export const getSubscription = () => ({
  type: action.GET_SUBSCRIPTION,
  payload: {},
  meta: {
    offline: {
      effect: {
        url: constants.endPoint.subscription,
        method: 'GET',
      },
      commit: {
        type: action.GET_SUBSCRIPTION_COMMIT,
      },
    },
  },
});
