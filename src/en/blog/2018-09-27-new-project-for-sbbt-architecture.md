---
title: "SBBT Architecture"
date: 2018-09-27
translationKey: "blogSbbt"
excerpt: "I've developped the new website for [SBBT Architecture](https://sbbt-architecture.com/), an architectural firm, in collaboration with NySB Paris."
---
For this second collaboration with [NySB](https://nysb.paris), we worked on the website of [SBBT Architecture](https://sbbt-architecture.com/). Wordpress was the platform of choice, as the client needed a full-fledged admin system so that they could be able to edit pretty much all aspects of the site.

I had to custom-build a slideshow with full-screen images for the home page. The whole thing is managed thanks to Advanced Custom Fields, so that the client can change every aspect of the slides: the background image, the main text, the gradient color and direction, and so on.

For the grid on the projects page, I used [Shuffle.js](https://vestride.github.io/Shuffle/), a responsive grid that one can categorize, sort and filter.

The main issue we encountered was the weight of the site. It makes great use of full-screen images, and since they represent architectural projects, we had to have a good picture quality. I ended up using the on-the-fly API service of reSmush.it, which compresses the images when an admin uploads an image in the media library.

For this project, we used Wordpress, SCSS, Shufflejs, jQuery and Webpack.

Head over to [https://sbbt-architecture.com](https://sbbt-architecture.com) to see the result!
