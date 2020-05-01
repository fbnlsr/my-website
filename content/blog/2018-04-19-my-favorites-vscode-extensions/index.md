---
title: "10 essential extensions for VS Code"
date: 2018-04-19
excerpt: "In the span of a few years, Visual Studio Code has imposed itself as the code editor of choice for a great majority of developers around the world. Here are 10 essential extensions (at least to me) that facilitate the workflow and make this already powerful editor even better."
cover:
    author: "Panjak patel"
    link: "https://unsplash.com/@pankajpatel"
links:
    devto: "https://dev.to/fbnlsr/10-essential-extensions-for-vscode-174i"
    medium: "https://medium.com/@fbnlsr/10-essential-extensions-for-vs-code-fdfa17f4f66c"
---
I've been using [Visual Studio Code](https://code.visualstudio.com/) as my main code editor for more than two years now. I used to work with Sublime Text, which was an amazing software (especially coming from Notepad++), but the guys at Microsoft are constantly doing an amazing job at making their editor the best out there, and their monthly update shows how dedicated they are to keep at improving it.

So it's been my editor of choice, but a good editor would be nothing without good extensions. I've compiled a list of my 10 favorites (plus a few more) extensions I could not live without. They make my day to day work much easier and allow me to save so much time in the long run. Here they are (in no special order):

**[Color Info](https://marketplace.visualstudio.com/items?itemName=bierner.color-info)**

VS Code provides a tiny preview box for colors in CSS files. Color Info allows you to get a much better view of the color your mouse hovers, complete with CMYK or alpha values. It can even act as a color picker, which is really convenient.

{{< blogimg "color-infos.png" "Color Info" >}}

**[:emojisense:](https://marketplace.visualstudio.com/items?itemName=bierner.emojisense)**

You know [I love emojis](/blog/lets-talk-about-emojis/). This extension allows you to directly insert emojis or type emoji codes in your files. Say you wish to insert a joystick emoji. Just begin to type `:joy` for instance and you'll get an auto complete window pop up which will allow to directly insert the 🕹 icon. If you type in `::joy`, it'll insert `:joystick:` along with a preview of the emoji. It's great!

**[Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)**

As its name states, this simple extension shows the `git blame` of the current selected line in the status bar.

{{< blogimg "git-blame.gif" "Git Blame" >}}

**[Markdown All In One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)**

I absolutely love Markdown. Actually this whole site makes extensive use of markdown, as it is built with Hugo. This extension helps you write Markdown by adding shortcuts such as `Cmd + B` for bold text, `Cmd + I` for italics, and so on. So convenient!

**[Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)**

If you're like me and work on multiple (sometimes virtual) machines, this extension is wonderful! It allows you to sync your settings and extensions thanks to a Github Gist that gets downloaded/uploaded.

**[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)**

As the name states, it highlights TODOs, FIXMEs and any keyword you specify. Just write `TODO:` somewhere and not only will it highlight it, but it'll also list all the ones you've already written anywhere in your project.

{{< blogimg "todo-highlight.png" "Todo Highlight" >}}

**[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)**

This extension is a swiss knife for Vue. From autocompletion to snippets, it's a must-have for any frontend developer.

**[Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright)**

A multilingual, offline and "lightweight" spellchecker. Spell Right uses your built-in dictionaries to check for errors, and can check for errors in any (and even multiple) language anywhere within your project. Watch out for big files though, as it can sometimes take some time to operate. I usually have it toggled off by default. It's easy to ask it for a spell check just by clicking on the eye icon in your status bar.

**[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)**

Strangely enough, VS Code does not support [EditorConfig](http://editorconfig.org/) by default. Just install this extension and it'll instantly start listening to any `.editorconfig` file it encounters.

**[Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)**

Now this one I use it constantly! Bookmarks is an extension that puts little blue bookmarks in your file gutter. It's extremely handy when you need to switch between positions inside a file, or if you need a quick reminder anywhere in your project. I've set up mine with `shift + cmd + =` (toggle bookmark) and `shift + cmd + -` (next bookmark) and thanks to this I can jump around files without having to leave my keyboard. The extension also adds a small panel right below your file browser which lists all active bookmarks in the current project. A must-have.

{{< blogimg "bookmarks.png" "Bookmarks" >}}

## Honorable mentions

**[AutoFileName](https://marketplace.visualstudio.com/items?itemName=JerryHong.autofilename)**

This extension is pretty straightforward. Just type in the beginning of a file/directory and it'll autocomplete its name for you. Really handy when you need to point to a file inside `node_modules`.

**[cdnjs](https://marketplace.visualstudio.com/items?itemName=JakeWilson.vscode-cdnjs)**

Most of the time I inject my dependencies in my Javascript files thanks to Webpack. But whenever I need to mockup something quickly, this extension has my back. Using the command palette, you'll be able to insert URLs or script/style tags of all the libraries cdnjs handles. Quite handy.

{{< blogimg "cdnjs.gif" "cdnjs" >}}

**Got one to share?**

So here are a few extensions I use every day. If you've got one I should check out, hit the comment section or [send me a tweet](https://twitter.com/fbnlsr)!
