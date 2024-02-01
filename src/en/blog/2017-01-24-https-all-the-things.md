---
title: "HTTPS all the things!"
date: 2017-01-24
translationKey: "blogHttps"
excerpt: "Regular HTTP will soon be a thing of the past. Be prepared!"
---
Starting with Chrome 56 (which should come out in a few days), Google will report websites that collect passwords or credit card numbers as non-secure if they are served through HTTP.

![Chrome 56 showing a non-secure page served through HTTP.](/img/blog/2017-01-24/chrome56.png "Chrome 56 showing a non-secure page served through HTTP.")

This is a huge deal, as it will enforce pretty much everyone to switch to HTTPS. The goal of Google has always been to provide a better and more secure web for the users. I believe that it's a good thing that such a giant is taking steps to enforce such measures. But the most important thing is not to train web developers to serve secure pages, but rather train users not to trust non-secure websites. This is why Chrome will gradually enhance the "Not Secure" notification, so that it appears with a red triangle, like the "broken HTTPS".

HTTPS is getting cheaper and cheaper, and with things like [Let's Encrypt](https://letsencrypt.org/), there is soon going to be less and less excuse to serve non-secure websites. Which leads me to think I also should add a certificate to my own site.

---

Source: [Google Blog](https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html?m=1)
