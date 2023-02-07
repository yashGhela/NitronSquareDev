/* eslint linebreak-style: ["error", "windows"]*/
/* eslint linebreak-style: ["error", "unix"]*/


module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'quotes': ['error', 'double'],
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'quotes': [2, 'single', {'avoidEscape': true}],


  },
  parserOptions: {
    ecmaVersion: 2017, // or 2017
  },
};
