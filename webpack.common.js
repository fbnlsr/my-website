const path = require('path');

module.exports = {
  entry: './assets/js/main.js',
  output: {
    filename: 'js/main.min.js',
    path: path.resolve(__dirname, 'assets'),
  },
};
