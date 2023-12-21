const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/js/');
  eleventyConfig.addPassthroughCopy('./src/css/');

  eleventyConfig.addWatchTarget('./src/_assets/scss');
  eleventyConfig.addWatchTarget('./src/_assets/js');

  eleventyConfig.addPlugin(syntaxHighlight);

  // Markdown filter for applying to the "description" inside projects front matter
  const markdownIt = require('markdown-it');
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  const md = markdownIt(markdownItOptions);
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addFilter('markdownify', (markdownString) =>
    md.render(markdownString)
  );

  // Date filter for blog permalinks
  eleventyConfig.addFilter('blogdate', (date) => {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    const postDate = new Date(date);

    return (
      postDate.getUTCFullYear() +
      '-' +
      pad(postDate.getUTCMonth() + 1) +
      '-' +
      pad(postDate.getUTCDate())
    );
  });

  // Date filter for humans
  eleventyConfig.addShortcode('humandate', (date, locale) => {
    const postDate = new Date(date);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return postDate.toLocaleString(locale, options);
  });

  // Blogimg shortcode for... well, blog images
  eleventyConfig.addShortcode('blogimg', (date, src, alt = 'Image') => {
    if (date && src) {
      let str = `<div class="is-blog-img"><img src="/img/blog/${date}/${src}" alt="${alt}">`;

      if (alt !== 'Image') {
        str += `<p class="is-blog-img-title">${alt}</p>`;
      }

      str += `</div>`;

      return str;
    }
  });

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk', 'html', '11ty.js'],
    dir: {
      input: 'src',
      output: 'dist',
      layouts: '_layouts'
    }
  };
};
