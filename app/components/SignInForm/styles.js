import { material, iOSColors } from 'react-native-typography';

export default {
  content: {
    paddingTop: 30,
  },
  button: {
    marginTop: 50,
  },
  errorLabel: {
    ...material.captionObject,
    color: iOSColors.red,
    marginLeft: 15,
    marginTop: 5,
  },
};
