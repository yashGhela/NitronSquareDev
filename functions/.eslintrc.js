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
    'max-len': 'off',
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'quotes': [2, 'single', {'avoidEscape': true}],
    'require-jsdoc': 0,
    'indent': 'off',


  },
  parserOptions: {
    ecmaVersion: 2017, // or 2017
  },
};
