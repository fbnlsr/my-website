---
title: "Master Eleventy - Part 2: i18n and assets"
date: 2024-04-11
translationKey: "blog11typart2"
excerpt: "In this second part of a series of articles about Eleventy, I'll show you how I handle multi-language support as well as JS and SCSS assets compilation."
cover:
  author: "Susan Q Yin"
  link: "https://unsplash.com/@syinq"
---
In [the first part](/en/blog/master-eleventy-part-1-the-project-structure/) of this series of articles about Eleventy, we've seen the folder structure I tend to use in order to get a healthy and organized workspace.

Here, we'll see how to use Eleventy to get a multi-lingual website working, as well as how to handle JavaScript and CSS assets thanks to its build process.

## Compile JS/SCSS assets

Let's start with JavaScript and CSS compilation. For that, as we've seen in the first part, I put those files my project's `/src/_assets` directory. Left as is, those files aren't processed by Eleventy, and are simply ignored during build time. For those to be taken into account, I create a specific file with the extension `.11ty.js`.

### JavaScript

For JavaScript, we're going to need the `esbuild` dependency:

```bash
npm install --save esbuild
```

We then create the `/src/scripts.11ty.js` file with the following code:

```js
// /src/scripts.11ty.js
const esbuild = require('esbuild');
const { NODE_ENV = 'production' } = process.env;

const isProduction = NODE_ENV === 'production';

module.exports = class {
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
```

Here, we can see one of the great strengths of Eleventy. This file is going to get caught and compiled so that our entry file `/src/_assets/js/main.js` becomes `/dist/js/main.js`. And not only will it bring all the needed dependencies but it'll also be minified. Neat!

### Stylesheets

The principle here is the same for our CSS assets. To that effect, we'll need the `sass` dependency:

```bash
npm install --save sass
```

The entry file will be `/src/styles.11ty.js` with the following content:

```js
const path = require('path');
const sass = require('sass');

module.exports = class SassTemplate {
  data() {
	return { permalink: '/css/main.min.css' };
  }

  render(data) {
	return sass.compile(path.join(__dirname, './_assets/scss/main.scss'), {
  	style: 'compressed'
	}).css;
  }
};
```

Here again, it's thanks to that `.11ty.js` extension that the file is getting caught on the fly during build time, and its entry point is `/src/_assets/scss.main.scss`. The generated file is going to take all the partials and mixins defined in our source file and will end its course in `/dist/css/main.min.css`, compiled and minified, ready to be used within our templates.

## Internationalization (i18n)

The JavaScript and CSS assets being handled, we can now take care of the internationalization of our website. Note here that while I'm describing the method I've decided to use, it may not be relevant or the most optimized for your use case. Thanks to its flexibility, Eleventy allows their users to experiment and use the system they wish. The one I've decided to use has several advantages:

- The **separation of context**: each language gets their own directory.
- The **flexibility**: it is quite easy to add new languages.
- The possibility to **link pages** and create a "bridge" between languages.

So the first thing to do is to separate the different languages in different folders. Thus, we'll get the French content of the website under `/fr/` and the English version will reside in `/en/`. This allows for a separation of context, but also to link (or not) two equivalent pages.

### Handle the primary menu

The first issue we're faced with is the main navigation: since our site uses a layout system, it would be inconvenient to split those between different languages. Once again, it could be possible as Eleventy allows it, but having mutualized templates is the preffered method. So for all the things that are not part of the redactional content, we'll make use of our "database" which resides in `/_data/site.json`: it is a simple JSON file that we can use how we want. I therefore regroup all the entries for the main menu under the `headerLinks` key, as such:

```json
// /src/_data/site.json
{
  "headerLinks": [
	{
  	"translationKey": "home",
  	"url": {
    	"en": "/en/",
    	"fr": "/fr/"
  	},
  	"external": false
	},
	{
  	"translationKey": "about",
  	"url": {
    	"en": "/en/about/",
    	"fr": "/fr/a-propos/"
  	},
  	"external": false
	},
	{
  	"translationKey": "projects",
  	"url": {
    	"en": "/en/projects/",
    	"fr": "/fr/projets/"
  	},
  	"external": false
	},
	{
  	"translationKey": "blog",
  	"url": {
    	"en": "/en/blog/",
    	"fr": "/fr/blog/"
  	},
  	"external": false
	},
	{
  	"translationKey": "contact",
  	"url": {
    	"en": "/en/contact/",
    	"fr": "/fr/contact/"
  	},
  	"external": false
	}
  ]
}
```

Under this key, we find an array of objects containin the following keys:

- `translationKey` is a unique value given to each page. It's thanks to this key that everything works.
- `url` specifies for each language the link's destination.
- `external` is a boolean which allows to specify if the link has to open in a new tab or not.

This allows us to generate the main menu for the website:

{% raw %}
```jinja2
{%- for item in site.headerLinks -%}
    <a class="navbar-item {% if (page.url == "/" + locale + "/" and item.translationKey == "home") or page.url == "/" + locale + "/" + item.url[locale] + "/" or item.translationKey == category -%}is-active{%- endif -%}" href="{{ item.url[locale] }}">{{ i18n[locale][item.translationKey] }}</a>
{%- endfor -%}
```
{% endraw %}

In this loop, we check if the current page is:

- The home page **or**
- A page within a given cagetory **or**
- A page of a specific category

This allows us to specify a CSS class `is-active`, which will make the current menu entry stand out thanks to a colored border or any other CSS property.

As you can see, we'll make use of the `translationKey` key we've set before in another part of the menu link:

{% raw %}`{{ i18n[locale][item.translationKey] }}`{% endraw %}

This makes use of another "database" file, located in `/src/_data/i18n.json`. This file is the "dictionary" for our site, and we can store there all the strings that need a translation. Here is a simplified example for this file, so that you can see what it looks like:

```json
{
    "fr": {
        "aboutMe": "À propos de moi",
        "twitterShare": "Vous avez aimé cet article ? Partagez-le sur Twitter !",
    },
    "en": {
        "aboutMe": "About me",
        "twitterShare": "Did you like this article? Share it on Twitter!",
    }
}
```

But before being able to use this dictionary, it's necessary to specify a `locale` key for each one of our folders `/fr/` and `/en/`. To do that, we can use another specific thing about Eleventy: the possibility to define data for a whole directory by using a simple file name trick. The file has to have same name as its containing folder. So we'll create a file named `en.json` in `/src/en/` and another `fr.json` in `/src/fr/`. The file `en.json` will contain for example:

```json
// /src/en/en.json
{
  "locale": "en"
}
```

This little JSON file is the cornerstone for our multilingual support as it allows the use for the `locale` key I talked about earlier in our templates. This tells Eleventy that everything that resides in this directory has a `locale` key with a value set to `en`.

We can now use multiple languages in static pages. For instance, it is now possible to have a page `/en/about.md` and another `/fr/about.md`. These two pages have their `translationKey` set to `about`, they're "recognized" in the main menu and we can see which page is the current one.

> Note that I'm using the same file name here, but nothing prevents you from using `/en/about.md` and `/fr/a-propos.md`. It's simply a convention I've decided to use.

But what about secondary pages, and blog posts? Let's fix that immediately.

### Handle blog posts

The first thing to do is to specify a file name `blog.11tydata.js` (in `/en/blog/` for instance) and add this code:

{% raw %}
```js
// /src/en/blog/blog.11tydata.js
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
        hasCover: function (data) {
            if (data.page.date) {
                const year = data.page.date.getFullYear().toString();
                const month = ('0' + (data.page.date.getMonth() + 1)).slice(-2).toString();
                const day = ('0' + data.page.date.getDate()).slice(-2).toString();

                const path = `./src/img/blog/${year}-${month}-${day}/cover.webp`;

                return fs.existsSync(path);
            } else {
                return false;
            }
        }
	},
	layout: 'blogpost.njk',
	tags: 'posts_en',
	category: 'blog',
	permalink: '/en/blog/{{ title | slugify }}/'
  };
};
```
{% endraw %}

This file is a bit more complex than the simple `en.json` that we've used earlier, but it allows for several things:

- The use of the `eleventyComputed` key which allows us to compute data and return a boolean for certain keys that can then be used inside templates. Here for instance I check the presence of a `cover.webp` file in the corresponding image folder for the blog post (thanks to its timestamp), so that the template can determine if the post has a cover image or not.
- The ability to specify multiple parameters that are shared with every posts, like the layout file to use, but also three very important things: the `tags`, `category` and `permalink` keys.

The first one, `tags`, allows us to specify the name of a collection we'll loop into inside our template. This might seem a bit complicated at first, but once things are in place, the amount of time gained is considerable. This is also why I've decided to go with Nunjucks as my template engine of choice: we can rebuilt the key to use in our template by using the locale defined in the parent directory. Thus, if we need to loop on the posts in the current locale, we can use the following code inside our template:

{% raw %}
```jinja2
{%- for post in collections["posts_" + locale] | reverse -%}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{%- endfor -%}
```
{% endraw %}

Just as a reminder, the use of `post.data.title` will look inside the front-matter of our post Markdown file.

The second key `category` allows us to make sure we're in the "blog" section of our website (read the previous chapter).

Finally, the third key `permalink` allows to generate on the fly a unique permalink, made of the title of the post, correctly formed thanks to the `slugify` dependency.

> **Note:** I'm also using a key called `eleventyExcludeFromCollections` which allows to see if an article has to be published or not: blog posts marked as drafts (with the `draft` key set to `true`) are hidden unless we're in the development environment. This allows us to preview drafts while excluding them from the collection when the site is deployed.

### Link posts between them

Thanks to all this, it is now possible to link pages between them with the use of these `locale` and `translationKey` keys. For instance, in the template that handles the display of a blog post, here is how I make the connection with the same article in both languages (French and English):

{% raw %}
```jinja2
{%- if locale == 'fr' -%}
    {%- set otherLocale = 'en' -%}
{%- else -%}
    {%- set otherLocale = 'fr' -%}
{%- endif -%}

{%- if translationKey -%}
    {%- for otherPost in collections["posts_" + otherLocale] -%}
        {%- if otherPost.data.translationKey == translationKey -%}
            <p class="is-translation-link noprint">
                <a class="is-lang-switcher" data-lang="en" href="{{ otherPost.url }}">{{ i18n[locale]['postAlsoAvailable'] }}</a>
            </p>
        {%- endif -%}
    {%- endfor -%}
{%- endif -%}
```
{% endraw %}

## Conclusion

We can now use multiple languages on our website. Translations of editorial contents are directly handled thanks to markdown files in the corresponding folders, and data used for the rest (UI, buttons & co.) are translated thanks to the dictionaries.

So certainly, the configuration might seem heavy at first, and it would've been nice to have something directly integrated within Eleventy. But I believe that's also what makes one of its greatest strengths: it is a static site generator that love to put the developer at the helm, and it lets us find the best (or at the very least the most comfortable) way to solve problems we encounter.

In the next (and maybe last?) part of this series of articles, we'll see how to generate a sitemap and an RSS feed file, as well as a few tips and tricks that'll help us with pages and blog posts.
