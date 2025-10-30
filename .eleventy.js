import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import readingTime from 'eleventy-plugin-reading-time';
import emojifyPlugin from 'eleventy-plugin-emojify';
import pluginRss from '@11ty/eleventy-plugin-rss';
import htmlmin from 'html-minifier-next';
import markdownIt from 'markdown-it';

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/js/');
  eleventyConfig.addPassthroughCopy('./src/css/');
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/_redirects');

  eleventyConfig.addWatchTarget('./src/_assets/scss');
  eleventyConfig.addWatchTarget('./src/_assets/js');

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(emojifyPlugin);
  eleventyConfig.addPlugin(pluginRss);

  // Markdown filter for applying to the "description" inside projects front matter
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

  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {

    if (outputPath !== false && outputPath.endsWith('.html')) {

      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }

    return content;
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
