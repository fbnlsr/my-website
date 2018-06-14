---
title: The Rubber Duck Debugging
date: 2012-11-18 00:00:00 +0000
cover:
  image: 
  author: 
  link: 
links:
  devto: 
  medium: 
menu:
  blog:
    weight: 20
draft: true

---
Following the post by my good friend [Marco Monteiro](http://www.marcomonteiro.net/) about the [Yoda Condition](http://blog.marcomonteiro.net/post/35697947390/yoda-conditions/), I thought it'd be neat to share one of my favorite way of maintening code: The Rubber Duck Debugging. Or to be a bit more precise, my own approach on the concept. Let me explain.

![Ducky](/img/posts/big-de-dee-bubil.jpg)

Also called "Rubber Ducking", or even "Confessional Debugging", the Rubber Duck Debugging is a method of, well, debugging code. It consists of forcing yourself to explain, line-by-line, your code to... a rubber duck. The goal here is to be able to coin errors or bugs by yourself, speaking to an inanimate object. In describing what the code is supposed to do and observing what it actually does, any inconsistent behavior should rise by itself.

Now, I don't keep a rubber ducky on my desk at all time (I have a little alien toy with four eyes) and to be honest I don't do Rubber Ducking, ever. But what I particularly like about this approach is the fact that good written code should be self-explainatory. In a way, one should produce code so clear even a rubber duck could understand it. Another way of putting it is this quote I've always loved:

{.quote}Always code as if the person who will maintain your code is a maniac serial killer that knows where you live.

Because let's face it, when having to take the relay on a project, we absolutely despise the person who coded the stuff we have to work on. It's always badly fragmented, poorly written, has too many comments (or absolutely none). That's why you should always be aware that even though you're the only one working on a project at a given time, you never know who's going to maintain or modify it. Even worse, you could be working on a project and let it sleep for months before having to work on it again. And you'll hate yourself having to spend more time than necesary in trying to understand what you wrote earlier that year.

*Beautiful code is hard to produce.* It's always easier to quick patch something, and forget about adding a comment line. But that single error could lead to a dreadful [Butterfly Bug](http://blogea.bureau14.fr/index.php/2012/09/the-butterfly-bug/) and make you lose precious hours trying to fix something that could've been prevented easely. That's why it's always a good idea to take your time, plan ahead, and even doodle your code (another habit of mine, I'll probably explain that in another post). That's also why it's always a good idea to keep a four-eyed alien on your desk. He's always watching!
