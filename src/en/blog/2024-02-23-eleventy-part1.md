---
title: "Master Eleventy - Part 1: The project structure"
date: 2024-02-23
translationKey: "blog11typart1"
excerpt: "In this series, I share my recommendations on how to implement a peaceful work environment when developing static web sites with Eleventy."
cover:
  author: "Sven Mieke"
  link: "https://unsplash.com/@sxoxm"
---
## Foreword

Ever since I started working with interpreted languages, I have to admit that the idea of being able to "compile" a website was surprising to me at first. Nevertheless, something special happens whenever a static site compiles: information is gathered, API calls are made, data passes through, and assets are transformed. And once everything is in place, witnessing all those systems work together like well-lubricated cogs feels immensely satisfying. We are left with a code package that's ready to be delivered, adheres to good practices, and runs extremely fast. Most importantly, the whole thing is as solid as a rock, (almost) impossible to attack, and etched in digital marble.

And yet, the premise is simple: the generator uses Markdown syntax for the editorial content, a templating engine is used to format that content, and finally, a bundle of HTML & CSS files can be deposited on an Apache or Nginx server. No database, no interpreted code, thus making the website ultra-safe and ultra-fast.

Over the years, the website you're currently reading has utilized many of these generators. Let's make a quick rundown of the ones I've had the pleasure to use, and (in my opinion) their strengths and weaknesses.

### Jekyll

The first one I've used is [Jekyll](https://jekyllrb.com). A precursor to the JAMStack movement, it was created over 15 years ago by Tom Preston-Werner, the founder of GitHub. Today, Jekyll is arguably the most widely used static site generator globally. It's indeed a great system, and its documentation is excellent. However, the downside is that Jekyll requires installing and maintaining a Ruby environment. If, like me, you're not accustomed to this ecosystem, it can become a bit cumbersome.

### Hugo

I then used [Hugo](https://gohugo.io), often considered Jekyll's "spiritual son", known for its major strength in extremely short execution time. However, the downside (once again) is that Hugo is written in Go, and its templating syntax is, to put it politely, unique. I never quite got used to its operators or its global syntax. Developing with Hugo was challenging, particularly because its documentation is hard to follow.

That being said, Hugo offers two features I found extremely powerful at the time: its notion of "context" inside template files and its handling of multiple languages. The ability to link content across multiple languages proved to be highly practical and a significant time saver.

### Eleventy (11ty)

Finally, the current version of my site has been developed using [Eleventy](https://11ty.dev). Once again, its documentation isn't the most practical to read, but it's a project I've been following closely. It benefits from a thriving community and a very "open" approach, which made me want to use it. While i18n support was almost non-existent until a few versions ago, significant progress has been made on this front since then.

One of Eleventy's most attractive features is the fact that it's written in JavaScript. I immediately fell in love with the freedom it offers users. Plus, I believe its name derives from the flexibility of being able to use multiple templating engines.

> Quick note while I'm here: the branding of this project is one of the most awkward things I've encountered. The project is called "Eleventy," but the domain is spelled "11ty." Additionally, one of the accepted templating formats gets the extension `.11ty.js`, while its global configuration file is `.eleventy.js`. This inconsistency can be quite confusing for newcomers, and I believe the project would benefit from better cohesion around the Eleventy "brand." It may seem anecdotal, but in 2024, I think it's almost obligatory to attract users, even for an open-source project. You just have to look at other frameworks such as Astro or Laravel to realize how important branding is for the success of such products. One last thing before closing this note: if you're looking for the Twitter account for this project, you'll find it under [@eleven_ty](https://www.twitter.com/eleven_ty). :zany_face:

Let's revisit this idea of freedom, which can sometimes lead to confusion. While it's undoubtedly a strength for developers, I believe that better organization within the workspace leads to a cleaner and easier-to-browse codebase. That's why, in this first article of a series dedicated to Eleventy, I'll share the way I organize my work to enhance efficiency in my workflow.

### The structure I recommend

By default, Eleventy makes assumptions about where you may store your data. However, these assumptions can be confusing in their naming and lack cohesion. For example, the folder used for templates is called `/_includes`, while the one for data is called `/_data`. While seemingly harmless, this structure can lead to mixing these folders with the final site's tree, as well as with folders used for code that will be manipulated later (such as SASS and JavaScript), along with the project's configuration files.

Therefore, I personally use the following structure:

```txt
/dist
/src
  /_assets
    /js
    /scss
  /_data
  /_layouts
  /en
    /about
    /…
  /fonts
  /fr
    /about
    /…
  /img
```

And here's the why:

- `/dist`

`/dist` is the destination folder for the generated site. By default, Eleventy uses the `/_site` folder for this purpose. However, as I mentioned earlier, I prefer not to have this folder mixed with others. Therefore, I use `/dist` instead. It's important to add this folder to your `.gitignore` file to prevent it from being committed.

- `/src`
- `/src/_assets`
- `/src/_data`
- `/src/_layouts`

`/src` becomes the main working folder. It's in this folder that we'll put all the source code for the site to be generated.

`/src/_assets` is a folder reserverd for compiled of minified assets, such as JavaScript or SASS. These files are manipulated during the build process by a specific file, generating their final version (we'll cover this in a future article).

`/src/_data` is the folder that serves as a "database" for the site. Here, we can use JSON files that can be looped over, or we can store the multilingual dictionary. In this case, I don't change the way Eleventy names its files, only their location.

`/src/_layouts` becomes the place where templates are stored. I've chosen to use Nunjucks, but you could use Liquid or another templating engine—it's a matter of personal preference. By default, Eleventy uses a folder named `/_includes`, but once again, I believe my organization makes more sense, and more importantly, everything is under the `/src` folder.

- `/src/en`
- `/src/fr`
- `/src/en/about`
- `/src/fr/about`
- `/src/en/...`
- `/src/fr/...`

`/src/en`, `/src/fr` and their subfolders are part of the main tree of the compiled site. It's in these folders that we'll put all the different sections of our site, each with their dedicated Markdown content. Since I'm creating a multilingual website, I've decided to use a subfolder per language, as recommended in the documentation. I'll explain in a future article how I can link the content between languages.

- `/src/fonts`

`/src/fonts`  is where I store the fonts. I prefer serving them directly instead of relying on Google's CDN. This approach allows me to avoid an external HTTP call and, more importantly, Google's fingerprinting.

- `/src/img`

`/src/img` is the folder where all the site's images reside. A quick note while we're here: if you're not already doing so, I encourage you to use recent image formats such as AVIF or WEBP. These formats offer much better compression performance compared to JPG or PNG.

### Compilation helpers

Deciding on a project structure is one thing, but we also need to inform Eleventy where to find what it's looking for. For that purpose, we have to configure the `/.eleventy.js` file, which is used during the build process.

```js
// /.eleventy.js
module.exports = function (eleventyConfig) {
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
```

Here we specify that the templating engine we're using is Nunjucks, and the files 11ty has to consider as templates can bear the extention `.md`, `.njk`, `.html` or `.11ty.js`. These files will go through the Nunjuck engine so that their HTML (or other - specified in the front matter) counterparts are created. Finally, under the `dir` key, we specify the folders used for input, output, and layouts.

Thus, the project's root directory can contain all the configuration files (`.eleventy.js`, `.gitignore`, `package.json`, etc…), the source code resides in `/src`, and the generated website will go in `/dist`.

In a future article, I'll describe how I compile JavaScript/SASS assets, as well as a few tips I use to streamline the development process.
