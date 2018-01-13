# Primative - Website

[https://primative.net](https://primative.net)

This is my personal website. It was made using [Hugo](https://gohugo.io/).

Once cloned, use `yarn` or `npm install` to fetch all dependencies.

## Build

```bash
hugo
```

## NPM tasks

```bash
npm run build
```

This task compiles SCSS, runs autoprefixer, and builds the website (via `hugo`)

```bash
npm run serve
```

This task compiles SCSS, runs autoprefixer, and serves the website (via `hugo serve`)

```bash
npm run watch:css
```

This task compiles SCSS and watches for changes.

```bash
npm run watch:all
```

This task compiles SCSS, runs autoprefixer, and serves the website. Will automatically rebuild the site on any file change.

## Misc

```bash
npm run scss
```

Builds CSS file from source

```bash
npm run autoprefixer
```

Runs autoprefixer on compiled CSS file
