---
title: Let's talk about emojis
date: 2018-01-11
cover:
    image: nong-vang-449097.jpg
    author: Nong Vang
    link: https://unsplash.com/@californong
menu: blog
---
Emojis are everywhere. From Twitter to Facebook Chat, they've grown to become Oxford's 2015 [Word of the Year](http://time.com/4114886/oxford-word-of-the-year-2015-emoji/) and even featured in a [horrendous movie](https://www.rottentomatoes.com/m/the_emoji_movie). But what about outside SMS and instant messaging? What about using emojis inside code comments or even git commit messages? Let's find out how we can make the best use of these funny little pictures.

Contrary to what people may think, emojis have been around for quite some time. The first emoji dates back to 1999, and was created by Shigetaka Kurita, a Japanese telecommunication planner for NTT Docomo. At first used solely in Japan, it took those little pictures ten years for some of them to be added to the Unicode character space. Thus, in October 2010 the Unicode Standard 6.0 got released, and with it 722 emojis. They do not live in their own dedicated blocks though and are spread around the Unicode tables. It took years for multiple engineers working at Google and Apple to convince the Unicode Technical Committee to add them. Now emojis are a part of everybody's life.

There are even some quirks and fun little facts about these tiny pictures. For example: emojis can vary from one platform to another. Because of that, the calendar emoji is represented always showing July 17 on Apple products (that date representing the announcement of iCal back in 2002). This led people to "wrongfully" declare July 17 World Emoji Day.

Emojis are also represented differently across platforms, and can be interpreted slighly differently. Take for instance the `astonished face` emoji. The first one is Apple's interpretation, the second one is Samsung's.

![emoji1](/img/posts/emoji1.png)

Apple's take on this feeling feels a bit more tamed than Samsung's, don't you think?

Other times, it can be the contrary. In this example, Samsung's interpretation of the `pouting face` feels less "angry" than Twitter's.

![emoji2](/img/posts/emoji2.png)

But enough with the history, let's get down to coding.

## Emojis in git commit messages

Github has popularized emoji support inside their ecosystem in a [blog post from 2012](https://github.com/blog/1289-emoji-autocomplete) thanks to their now famous "`:`" shortcut. So now, say you want to use the `fox face` emoji 🦊 somewhere in Github (a commit message, an issue or a gist), you can simply use `:fox_face:` instead and it will automatically be interpreted by Github.

Using shortcuts is an elegant solution to circumvent emojis not being interpreted. You don't take the risk of breaking something and even if they're not (or badly) rendered, the messages are still readable.

Emojis can also add a lot of clarity to commit messages. Compare these two sequences:

```
- Fix editing user not being saved to the database
- Cleanup code
- Add the ability to edit a user
- Fix bad function callback on API request
```

&nbsp;

```
- 🐛 Fix editing user not being saved to the database
- 📝 Cleanup code
- ✨ Add the ability to edit a user
- 🐛 Fix bad function callback on API request
```

You can immediately see where bugs were fixed and where new features were added.

On a platform that doesn't support emojis, this would be read as:

```
- :bug: Fix editing user not being saved to the database
- :memo: Cleanup code
- :sparkles: Add the ability to edit a user
- :bug: Fix bad function callback on API request
```

Definitely not as fun, but still perfectly readable.

The tech industry as a whole appropriated these shortcuts and [went far beyond](https://www.webpagefx.com/tools/emoji-cheat-sheet/) simple emojis. Sure it's nice to use 🐛 to talk about fixing a bug, but try using `:trollface:` in Slack or Redmine. Boom, you're the new cool kid on the block. Don't use it too often though, you don't want to be *that guy*.

**My advice:** Don't hesitate to use emojis in git commits, but do prefer short-codes. I would also suggest not to go overboard with it and stick to a list of a few ones to denote the major actions (bugfix, new feature, styling, code cleanup, etc..).

If you're not sure were to start or want to suggest a guideline for your team, I highly recommend Carlos Cuesta's [Gitmoji](https://gitmoji.carloscuesta.me/). It even comes with a nifty CLI (simply called [`gitmoji-cli`](https://github.com/carloscuesta/gitmoji-cli)) which will help you write your commit messages through an interactive interface. Gitmoji is even used in Atom's [contribution guideline](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages).

## Emojis in/as code

Technically, you *could* use emojis in computer code, but you should be very careful when doing so. Emojis are interpreted as strings in Javascript, but their length can vary.

```javascript
"🐼".length         // returns 2
"🇨🇦".length         // returns 4
```

Don't forget emojis can be connected (kind of the same way Fira Code gets you those sexy sexy ligatures). That's how you can now get skin color modifiers (called `EMOJI MODIFIER FITZPATRICK TYPE-1`, `-2`, `-3`, `-4`, `-5`, and `-6`. I'm not kidding). Or even better, if you combine the following emojis: 👨, 👩, and 👧, you get a whole family 👨‍👩‍👧! Let's run that through Javascript.

```javascript
"👨‍👩‍👧".length         // returns 5
```

Why 5? Because not only do you get the length of each emoji that symbol is made of, but it also uses two `ZWJ` (Zero Width  Joiner) characters as "glue". You can even see it in action: copy/paste that emoji inside VS Code for instance, and it'll take you five "arrow key" strokes to go through it.

**My advice:** Do not to use emoji in code logic. Plain and simple. But you can still use them in your views. Web browsers have amazing emoji display capabilities, and know how to fallback to a font that *will* display your "thump up" icon. But watch out and be careful when using an emoji short-code interpreter in those views, especially if you happen to display code blocks on your website. It could trick you, interpreting `h:m:s` as `hⓂ️️s`, thus making the code block useless.

## Emojis in code comments

So what about code comments? Emojis everywhere! As far as I know, you are not susceptible to break anything because of emojis in comments. Modern code editors (Atom, VS Code, Sublime, Intellij...) have amazing emoji support. They even can be pretty useful to make something stand out.

```javascript
/**
 * WARNING: Do NOT change this file.
 */
```

Compared with:

```javascript
/*
 * 🛑 WARNING: Do NOT change this file.
 */
```

## Final thoughts

Emojis are a double edged sword. They allow us to express complicated feelings in a quick and fun way. They are the extension of the emoticons we used profusely back in the IRC glory days. They can be used as decorators, adding feeling to an otherwise plain sentence. They also can be used as markers to make something stand out, and even as a complete communication tool when used on their own.

However, since they're not designed and interpreted uniformally across platforms, they can be the source of misunderstandings. Communication relies on the stability of its mean of propagation. If a symbol is changed between the sender and the receiver, the message is not the same. As characters, they also need to be put in context. That's why some of them had to be changed. For instance the `:gun:` emoji 🔫 which used to be represented by a real gun, is now a water pistol.

When it comes to code though, I'm all in favor of using emojis. Not in the code itself, as I've stated, but rather in comments and commit messages. They embelish the message they're attached to, for they are generally mainly used as pointers. And with the help of short-codes, you can use them without the fear of breaking something.

If you want to know more about emojis, you should check out [Monica Dinculescu](https://meowni.ca/)'s work, and especially her talks.

I also recommend Angela Guzman's post on [the making of Apple's emoji](https://medium.com/@agzmn/the-making-of-apples-emoji-how-designing-these-tiny-icons-changed-my-life-16317250a9ee). Angela writes how she and her mentor Raymond designed over 500 emojis during her internship back in 2008. This changed her life, and her work is now in the hands of millions of people.

So go ahead and emoji away, you'll improve readability and break away from the monotony of a dull screen filled with code. 😄
