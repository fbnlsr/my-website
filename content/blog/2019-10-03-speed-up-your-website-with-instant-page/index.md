---
title: "Speed up your website in 1 minute with Instant.page"
date: 2019-10-03
excerpt: "Sometime life is that simple. Load a script, and make your website faster? What is this sorcery?"
cover:
    author: "Marc-Olivier Jodoin"
    link: "https://unsplash.com/@marcojodoin"
links:
    devto: "https://dev.to/fbnlsr/speed-up-your-website-in-1-minute-with-instant-page-49f1"
    medium: "https://medium.com/@fbnlsr/speed-up-your-website-in-1-minute-with-instant-page-b12c8d91db81"
---
Behind this clickbait title lies a really nifty little tool. I stumbled upon this while browsing Hacker News a while back. Actually it's been active on this website [since february](https://github.com/fbnlsr/primative.net/commit/d862953f35a2ae0992ed11bd8c294bf8d7658a91) now but I never took to time talk about it. **Instant.page** is a tiny JavaScript library which is using *just-in-time preloading* – it preloads an anchor right before a user clicks on a hyperlink.

The technique used if fairly simple: **Instant.page** calculates the time a user spends hovering a link (which is an obvious behavior when you want to click on something) and will start preloading said link if that time exceeds 65ms. Since [the average human perceives actions taking less than 100ms as instantaneous](https://www.nngroup.com/articles/response-times-3-important-limits/), **Instant.page** tricks the brain, hence allowing your users to get a faster, better experience.

The installation is fairly simple, just insert the `<script>` tag containing the link to the script right before the closing `</body>` of your website (which is where all your scripts should reside anyways), and you're all set! **Instant.page** will glue itself automatically to each link on the page. The library is small, a mere 1kB. It's free and open source (MIT).

**Instant.page** allows you to control what content should be preloaded or not. You might want to prevent it from preloading some anchors, like logout links for instance. To do that, simply add a `data-no-instant` attribute to said links and **Instant.page** will ignore them. You can even specify that you want to allow preloading for external links.

Simple, light and easy. If you want to try it yourself, check out **Instant.page** here: [https://instant.page](https://instant.page/)
