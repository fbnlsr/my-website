require('dotenv').config();
const fs = require('fs');

const isDevEnv = process.env.ELEVENTY_ENV === 'development';
const todaysDate = new Date();

function showDraft(data) {
  const isDraft = 'draft' in data && data.draft !== false;
  const isFutureDate = data.page.date > todaysDate;
  return isDevEnv || (!isDraft && !isFutureDate);
}

module.exports = function () {
  return {
    eleventyComputed: {
      eleventyExcludeFromCollections: function (data) {
        if (showDraft(data)) {
          return data.eleventyExcludeFromCollections;
        } else {
          return true;
        }
      },
      permalink: (data) => {
        return data.permalink ?? '/fr/blog/{{ title | slugify }}/';
      },
      hasCover: function (data) {
        if (data.page.date) {
          const year = data.page.date.getFullYear().toString();
          const month = ('0' + (data.page.date.getMonth() + 1))
            .slice(-2)
            .toString();
          const day = ('0' + data.page.date.getDate()).slice(-2).toString();

          const path = `./src/img/blog/${year}-${month}-${day}/cover.jpg`;

          console.log(path, fs.existsSync(path));

          return fs.existsSync(path);
        } else {
          return false;
        }
      }
    },
    layout: 'blogpost.njk',
    tags: 'posts_fr',
    category: 'blog'
  };
};
