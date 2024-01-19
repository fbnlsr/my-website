---
title: "elementary OS, a real alternative to Windows?"
date: 2014-07-14
translationKey: "blogElementary"
excerpt: "Let's look at a Linux distribution that's slowly becoming better with each release. Could it be the thing I've been waiting for to finally get rid of Windows as my main OS?"
cover:
    author: "Gabriele Diwald"
    link: "https://unsplash.com/@gabrielediwald"
---

For as long as I can remember, I've always wanted to get out of the Windows environment. Windows XP and 7 are outstanding operating systems, but I simply can't get used to Windows 8's user interface. There's also a major drawback when you're doing web development: pretty much everything is done on Unix/Linux systems. Not to mention MacOS X. It has grown so popular over the past few years that it's become cumbersome to try and set up a web development platform on Windows. Try and set up Git or Ruby/Jekyll on a Windows machine and you'll know what I mean. Of course, there are always alternatives ([Sourcetree](http://sourcetreeapp.com) for Git is an outstanding product, for example), but there's always something that feels a bit "off" when you're coding on Windows, at least for me. Lately, I've had troubles with Composer while trying to start working again with Laravel.

### Looking For Greener Pastures

So like every few months, I try to find a new way out by installing a Linux distribution inside a virtual machine. And like most, I've considered bitting the bullet and getting a Mac. But let's be honest, a Macintosh is nothing but an over-hyped, over-priced PC. Plus, the Apple ecosystem feels like a golden prison (and I should know about that, I'm a Google user). Several friends of mine are using Macs, and they couldn't be happier, but I feel like they've signed a pact with the devil whenever I try to use their hardware. It usually ends up like it always does when you're using someone's Apple computer: they spend half an hour explaining how amazing their machine is and "yeah sure it's completely overpriced, I mean I paid $1,299 for mine, but it's totally worth it!". It's kinda like someone who's decided to inject himself with a cocktail of Smallpox and Ebola in order to lose weight. Sure it's effective, but don't try to convince me it's "worth it" while I'm checking if you've still got a pulse.

Of course, there's always the Hackintosh approach: making a mac using traditional PC parts. But even though there has been a lot of progress in this field, I'm not 14 anymore and I simply don't want to waste time maintaining a computer. I guess that's also why Macs are so popular.

And there's Ubuntu. Ah, Ubuntu. This Operating System feels like that cute girl from high school I never went out with. We flirted, but never got time to hang out together. We stayed in touch over the years, but she could never get passed my weird geeky habits, and despite the fact I've always found her cute, it never happened. Wow, that was an awkward analogy. Anyways, I've known about Ubuntu since around maybe 2005, back when you could simply order a loaded truck of Live CDs to pass around town for a dime. I remember back in the days, when I used to work in retail, I ordered a carton of 200 discs, and gave them to any client that was interested in trying out something new. But even though I've always loved the philosophy behind Ubuntu, I've never made the switch. There *always* was something to hold me back. Most of the time, it was a hardware incompatibility, other times there was this Windows application I simply couldn't do without. Today, it's Unity. It's something you either love or hate, and I hate it with a passion.

### The Photoshop Case

If there's something I'm using almost every day but have cold sweats whenever I launch its executable, that's Photoshop. To a designer, it's probably all fun and giggles, but to me it feels like having to deal with a steam engine powered tool while I'm working on this beautiful new [Tesla](http://www.teslamotors.com/). Photoshop is that ugly, awful piece of software everyone around me despise. It's slow, ugly as hell, feels clunky and is basically run by a company that simply doesn't seem to know a single thing about computer security.

Luckily, Gimp is starting to become a real alternative to Photoshop now. A few months ago it revamped its UI to support a desperately need single window mode, and with the ability to import/export PSD files, I'm really starting to consider making the switch completely. Finally ditch Windows, and become... a Linux user. &lowast;*Rolling thunder*&lowast;

### elementary OS

![elementaryos](/img/blog/2014-07-14/elementary.png)

All this writing to talk about this linux distribution I've discovered a few days ago, called [elementary OS](http://elementaryos.org/). At its core lies Ubuntu, or to be more precise, the Long Term Support version of Ubuntu. The current version of elementary OS is called Luna, and is base off Ubuntu 12.04. The next version, codenamed Freya, should be available in the upcoming months and will be based off Ubuntu 14.04. Since Ubuntu lies at its core, it's compatible with its repositories and packages. The great difference is the constant desire to bring a beautiful and consistent user interface. At first glance, you can see some elements are heavily based on OSX design, especially with that dock at the bottom of the screen, and that simple bar at the top. And don't call it a global menu, because it's not, and they want you to know that. All the options of an application are available thanks to a simple "gear" menu, right inside the app, and the UI makes use of simple modal windows like OSX does. It features several apps that are custom tailored to fit the design and philosophy behind that distribution, like Geary Mail, a custom Calendar (which you unfortunately can't link to your Google Account), or Shotwell (a photos library). All in all, it feels complete, robust, and slick.

![elementary OS Luna](/img/blog/2014-07-14/luna.png)

I'm currently writing this article on elementary OS, and the general feeling of the distribution is absolutely wonderful. Even inside a virtual machine, the thing flies. Granted, I'm using it on a Core i5 processor with 16 GB of RAM, but I'll be honest, I've spent the past five days booting inside windows just to launch that virtual machine. In the span of a few minutes, I was able to install and configure all my productivity apps: Sublime Text, a LAMP server, Git, DBeaver, Chromium, Skype, Spotify... Everything works smoothly and without hiccups.

The only drawback I could find with this distribution is that (very) slow update process. While relying on a LTS release is the assurance that the system will be as stable as possible, if you don't upgrade apps yourself you could end up with an outdated system in a while. I reckon that following Ubuntu's schedule and having an update every six months would be a bit much, and to most users it's not that important to get the latest version of every piece of software they're using, but I'd have loved to get a better update system, or maybe something along the lines of Windows Updates.

Then again, I usually get notified of software updates about the applications I'm using, so I'd be able to upgrade them on my own. And thanks to Ubuntu's Software Center, installing/updating a software has become really simple.

### Minimize it!

Of course, Luna is not perfect. The first thing you might want to look into is the possibility to add a minimize button on your windows' titles. By default, the only buttons available are Close and Maximize, which are located to the left and right of the windows' title. In order to minimize a window, you need to click its icon on the dock. It makes the layout of windows cleaner, but it's simply not practical.

![luna-buttons](/img/blog/2014-07-14/luna-buttons.jpg)

To remedy this problem, simply install [Dconf-tools](https://apps.ubuntu.com/cat/applications/precise/dconf-tools/) using Software Center, and find the following key:

**org → pantheon → desktop → gala → appearance**

Change the value <code>close:maximize</code> to <code>:minimize,maximize,close</code>. This will put all the necessary commands on the far right of the windows' title bar, and Windows user will certainly feel a bit more at home. You'll find a step by step guide over at [Unixmen](http://www.unixmen.com/enable-minimize-move-windows-buttons-elementary-os-luna/) that'll show you how to do this.

### Final words

All in all, I couldn't be happier with that distribution so far. I'll probably give it a solid month of testing, especially with Gimp, before making the final decision. And I'll probably keep a copy of Windows somewhere, because besides work, I'm also a gamer, and even though some huge progress has been made in that field, I'll probably still need it to feed my gaming habits :)

I can totally see elementary OS as my daily driver. For the past week, it hasn't showed the slightest flaw, and I've been productive pretty fast using this new OS. If you wish to give it a try, simply go to [http://elementaryos.org/](http://elementaryos.org/), download the ISO, and cram it inside a [VMWare Player](https://my.vmware.com/web/vmware/free#desktop_end_user_computing/vmware_player/6_0) virtual machine. I bet you'll be hooked.
