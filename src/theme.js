// @flow

export const COLORS = {
  accent: '#efb534',
  error: '#f44336',
  primary: '#3c91a1',
  primary2: '#238393',
  primary3: '#1e717e',
  secondary: '#fff',
  secondary2: '#eee',
  secondary3: '#bbb',
  text: '#43484d',
  textFaded: '#bdc6cf',
  textInverse: '#fff',
};

/* eslint-disable sorting/sort-object-props */
export const TYPOGRAPHY = {
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondary: {},
  paragraph: {},
  small: {},
};
/* eslint-enable sorting/sort-object-props */

const theme = {
  button: {
    white: {
      buttonStyle: { backgroundColor: 'white' },
      textStyle: { color: 'black' },
    },
    wide: {
      buttonStyle: { width: '100%' },
    },
  },
};

export default theme;