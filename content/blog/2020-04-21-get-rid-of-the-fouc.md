---
title: How to get rid of the Flash Of Unstyled Content
date: 2020-04-21
excerpt: |
  Often dreaded by UX designers, let's see how a few simple tricks can help us get rid of this nuisance that is the Flash Of Unstyled Content.
cover:
  image: '/img/posts/jamie-haughton-Z05GiksmqYU.jpg'
  author: Jamie Haughton
  link: 'https://unsplash.com/photos/Z05GiksmqYU'
links:
  devto: 'https://dev.to/fbnlsr/how-to-get-rid-of-the-flash-of-unstyled-content-5e7'
  medium: 'https://medium.com/@fbnlsr/how-to-get-rid-of-the-flash-of-unstyled-content-d6b79bf5d75f'
---

This week I spent some time working on my website's loading performance. I started by switching from [Slick](https://kenwheeler.github.io/slick/) to [Glide.js](https://glidejs.com/) in order to remove jQuery as a dependency altogether. This helped me reduce the amount of JavaScript and CSS used by half (!). I then added a language preference cookie. Finally, as a simple way to enhance the user experience, I added a function which would make the switch automatically depending on the browser's language settings.

Everything was running smoothly, but I couldn't help but notice that my site was suffering from a [Flash Of Unstyled Content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content), AKA a "FOUC". It was really noticeable even with the new JavaScript and CSS in place: once a link was clicked, the page would start rendering almost immediately and then the CSS would get applied. This was really annoying as it removes the user from this smooth, almost instant experience I was aiming at. Fortunately, there are a few things we can do to prevent this from happening and get rid of that pesky FOUC.

## Step 1: Hide everything!

The first thing we want to do is simply to add a CSS instruction so that our body is hidden from the page until it is ready to be unveiled. This allows the page to be fully loaded before we can finally present it to the user. This might be counter-intuitive since we're aiming at speed, and, well, we're *slowing* things there, but it's a sacrifice we're making for the sake of the user's experience.

```html
<body style="visibility: hidden;">
  <!-- Your awesome website -->
</body>
```

We could go with `opacity` instead, and make use of CSS transitions to add a bit of magic.

## Step 2: Unveil when everything is ready

We then need to revert that `visibility` CSS property once the DOM has been loaded and is ready. For that, I'm using a simple helper function, a bit like jQuery's `document.ready()` method. It calls a callback method once the document is in a "complete" or "interactive" state.

So we simply change the `visibility` property of my `<body>` tag to `visible`.

```js
// Helper function
let domReady = (cb) => {
  document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb()
    : document.addEventListener('DOMContentLoaded', cb);
};

domReady(() => {
  // Display body when DOM is loaded
  document.body.style.visibility = 'visible';
}
```

And there you go! Our FOUC is gone. With this simple trick, our users get a better experience and don't have a weird mess blinking on their screen before being able to browse our site.

## The Firefox hack

While things should run smoothly on Chrome, you might still see a flash on Firefox. I struggled to find a solution to this problem until I stumbled upon a bug in Firefox that's been reported [3 years ago](https://bugzilla.mozilla.org/show_bug.cgi?id=1404468) and is still active. People are still trying to fix this but lucky for us there's a simple hack we can use as a workaround to this problem. Simply add a dummy piece of JavaScript code right after your `<body>` tag and you should be all set!

```html
<body style="visibility: hidden;">
  <script>0</script>
</body>
```

Pretty neat, huh? Pretty weird also, I must confess. But hey, it does the job.

## Note: Think of the noscript people

Don't forget that not everybody can or want to execute JavaScript. In that case, this simple line right before our closing `</body>` tag will help make our site seen by everybody.

```html
<noscript><style>body { visibility: visible; }</style></noscript>
```

And we're all set! Now our site should be displayed correctly, without any FOUC. Yay! 🎉
