import path from 'path';
import sass from 'sass';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class SassTemplate {
  data() {
    return { permalink: '/css/main.min.css' };
  }

  render() {
    return sass.compile(path.join(__dirname, './_assets/scss/main.scss'), {
      style: 'compressed'
    }).css;
  }
};
