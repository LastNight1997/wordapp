import types from 'app/actions/actionTypes';
import constants from 'app/constants';

const defaultState = {
  enabled: false,
  time: {
    hour: constants.notificationTime.hour,
    minute: constants.notificationTime.minute,
  },
};

export default (notification = defaultState, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATION_ENABLE:
      // Payload: { enabled }
      return { ...notification, enabled: action.payload.enabled };
    case types.SET_NOTIFICATION_TIME:
      // Payload: { hour, minute }
      return {
        ...notification,
        time: {
          hour: action.payload.hour,
          minute: action.payload.minute,
        },
      };
    default:
      return notification;
  }
};
