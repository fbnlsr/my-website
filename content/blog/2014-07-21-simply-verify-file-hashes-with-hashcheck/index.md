---
title: "Simply Verify File Hashes With HashCheck"
date: 2014-07-21
excerpt: "HashCheck is a simple tool that helps you to simply and quickly verify the integrity of a file."
cover:
    author: "Aaron Burden"
    link: "https://unsplash.com/@aaronburden"
---
Whenever you download a file on the internet, it's a good habit to check its hash [checksum](http://en.wikipedia.org/wiki/Checksum) value, especially if that file is an executable. It allows you to verify the integrity of the data you've downloaded and check if it hasn't been altered.

![HashCheck](/img/posts/hashcheck.png)

One very simple way to do this is to use the [HashCheck](http://code.kliu.org/hashcheck/) Shell Extension, which will add a tab inside the "Properties" window of any file. It will automatically calculate the checksum of the selected file, and if you happen to have an MD5 or SHA1 value stored in your clipboard, it will automatically compare that value against the calculated checksum of the file you're looking at and tell you if that file's hash is correct. HashCheck is also capable of generating an SFV/MD5/SHA1 file if you need to distribute a file yourself.

HashCheck is free, Open-Source, and available in 20 languages.
