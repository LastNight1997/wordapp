import { material, iOSColors } from 'react-native-typography';

export default {
  input: {
    ...material.titleObject,
  },
  label: {
    ...material.subheadingObject,
    color: iOSColors.gray,
  },
};
