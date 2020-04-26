# Primative - Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/e5c7f5ad-5764-42e2-9f03-aa8d74526160/deploy-status)](https://app.netlify.com/sites/primative/deploys)

[https://primative.net](https://primative.net)

This is my personal website. It was made using [Hugo](https://gohugo.io/).

## Build

```bash
npm run build
```

This will run `webpack` to build the CSS and Javascript, and `hugo` to generate the site.

## Serve

```bash
npm run serve
```

This will do the same as `npm run build`, and run Hugo's built-in web server.

## Watch

```bash
npm run watch
```

## Prod

```bash
npm run prod
```

Used by Netlify. It does the same thing as the `build` task and minifies assets.

This will do the same as `npm run serve` and monitor changes for any `.scss` or `.js` file, thus rebuilding the site on any change.

## Commit emojis

| Short-code   | Emoji | Meaning                     |
| ------------ | :---: | --------------------------- |
| `:wrench:`   |  🔧   | Change configuration        |
| `:bug:`      |  🐛   | Fix bug                     |
| `:sparkles:` |  ✨   | New feature                 |
| `:art:`      |  🎨   | Clean code                  |
| `:pencil2:`  |  ✏️   | Add text / write blog post  |
| `:memo:`     |  📝   | Documentation related       |
| `:iphone:`   |  📱   | Responsive design work      |
| `:lipstick:` |  💄   | Updating UI and style files |
| `:mag:`      |  🔍   | Improve SEO                 |
