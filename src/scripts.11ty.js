import esbuild from 'esbuild';

const { ELEVENTY_ENV = 'production' } = process.env;

const isProduction = ELEVENTY_ENV === 'production';

export default class {
  data() {
    return {
      permalink: false,
      eleventyExcludeFromCollections: true
    };
  }

  async render() {
    await esbuild.build({
      entryPoints: ['src/_assets/js/main.js'],
      bundle: true,
      minify: isProduction,
      outdir: 'dist/js',
      sourcemap: !isProduction,
      target: isProduction ? 'es6' : 'esnext'
    });
  }
};
