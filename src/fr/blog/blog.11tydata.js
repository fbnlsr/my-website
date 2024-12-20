import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const isDevEnv = process.env.ELEVENTY_ENV === 'development';
const todaysDate = new Date();

function showDraft(data) {
  const isDraft = 'draft' in data && data.draft !== false;
  const isFutureDate = data.page.date > todaysDate;
  return isDevEnv || (!isDraft && !isFutureDate);
}

export default function() {
  return {
    eleventyComputed: {
      eleventyExcludeFromCollections: function(data) {
        if (showDraft(data)) {
          return data.eleventyExcludeFromCollections;
        } else {
          return true;
        }
      },
      hasCover: function(data) {
        if (data.page.date) {
          const year = data.page.date.getFullYear().toString();
          const month = ('0' + (data.page.date.getMonth() + 1))
            .slice(-2)
            .toString();
          const day = ('0' + data.page.date.getDate()).slice(-2).toString();

          const path = `./src/img/blog/${year}-${month}-${day}/cover.webp`;

          return fs.existsSync(path);
        } else {
          return false;
        }
      }
    },
    layout: 'blogpost.njk',
    tags: 'posts_fr',
    category: 'blog',
    permalink: '/fr/blog/{{ title | slugify }}/'
  };
};
