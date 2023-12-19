const path = require('path');
const sass = require('sass');

module.exports = class SassTemplate {
  data() {
    return { permalink: '/css/main.css' };
  }

  render(data) {
    return sass.compile(path.join(__dirname, './_assets/scss/main.scss')).css;
  }
};
