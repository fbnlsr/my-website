---
title: So long LastPass, hello KeePassXC!
date: 2017-10-06
menu: blog
cover:
    image: "/img/posts/victoriano-izquierdo-109924.jpg"
    author: Victoriano Izquierdo
    link: https://unsplash.com/@victoriano
links:
    devto:
    medium:
---
I've been a fervent advocate of password managers for years. You can ask pretty much anyone in my family or amongst my friends, there was a time where I *had* to ask the question "By the way, what do you use to store your passwords?". This was usually followed by a 20 minutes speech about how unsecure their digital life was and a desperate attempt at convincing them that **must** use a password manager. That was, of course, I didn't faint learning that my friend or relative is using the same 7 letters password for absolutely **everything**, "oh and it's *hunter2*, I don't mind telling you, I have nothing to hide". Yes, that happened.

For the past four years or so, my password manager of choice has been [LastPass](https://lastpass.com). I've been a happy Premium member ever since, and even though it's had a few hiccups (in [2015](https://blog.lastpass.com/2015/06/lastpass-security-notice.html/) and in [2017](https://www.theguardian.com/technology/2017/mar/30/lastpass-warns-users-to-exercise-caution-while-it-fixes-major-vulnerability)), they've been pretty transparent about the situation each time and I chose to keep trusting them. I used to log into my account using two-factor authentication: my Master Password and a [Yubikey](https://www.yubico.com/), and it's been working flawlessly for years. However, after a long consideration, I've recently chosen to say goodbye to LastPass and continue my journey with another solution. Here's why.

## A WW1 tank painted pink stays a WW1 tank

You see, the problem with computer security is that you always have to find the proper balance between how safe you need to be and the convenience of day to day usage. My setup was somewhat secure, but the convenience wasn't there anymore. I usually have to log into my LastPass account several times a day, as I'm using several web browsers, with sometimes several profiles per browser. Therefor, since LastPass automatically logs out whenever a new session is opened somewhere else, I also had to use my Yubikey multiple times per day, even per hour. In the end it was starting to become a burden. Besides LastPass has made some changes to its UI, and is focusing more and more on being as easy to use as possible, and in a way as "opaque" as possible. While I'm all for it, as it draws more and more people to being safer on the web, it can result in really annoying results under the hood. Often, the browser extension does not catch the proper fields for the username/password combo. Or when I'd use the password generator, it didn't necessarily register it properly. It has some difficulties dealing with websites which make use of AJAX requests. It often saves uselessly complicated URLs that are generated during the signup process, making a lot of its database entries dirty. If you're not tech savvy, it's still an amazing product, and it's **way better** than using nothing or that old post-it note that's on your computer screen. But for me, what was once a really good tool to use had become a burden. It was time for something new, or in this case something old.

## Enters KeePassXC

[KeePass Password Safe](https://keepass.info) has been around for 13 years. The interface shows its age, but its ease of use and the security features it offers has been proven multiple times. Besides the usual username/password combo, you can specify custom fields, and even attach files to your password database. Speaking of which, KeePass uses AES, TwoFish or ChaCha20 as cipher for the database, and the passwords it contains are protected in memory. It does pretty much everything LastPass does (or the other way around depending on your point of view), albeit with a less fancy UI and a less "automated" process.

The particular flavor of KeePass I'm using is called [KeePassXC](https://keepassxc.org). It's a community-driven fork of the now defunct KeePassX, which was aimed at being a multi-platform version of KeePass. So it works perfectly on Windows, MacOS and Linux. Exporting the database from LastPass and importing it into KeePassXC demands a bit of work, as you have to use a cumbersome CSV file (which you must not forget to destroy!) LastPass export tool provides you with. LastPass' "Secure Notes" are stored in an XML-like format, and you'll probably have to rewrite them manually inside KeePassXC after the import. But after that tedious task is done, using KeePassXC is really easy, and it works flawlessly. Whenever you need to retreive a password, simply switch to the app and hit Cmd+F, type in the first letters of the entry you're looking for and a simple Cmd+C / Cmd+V does the trick. It litterally uses less than five seconds. If you're using a browser extension, it can even automatically fetch your credentials and is therefor as fast as LastPass, if not faster.

The setup I'm using now is as follows. The password database file is stored on my Google Drive. This allows me to have a silent synchronization between my different devices, and provide me with an online backup. I'm using both my Master Password (with a 100+ bits entropy) and a key file (which is stored locally, **not** on Google Drive) to unlock the database. It can communicate automatically with my various browsers thanks to two extensions: chromeIPass and PassIFox. The database file and the key file are backed up on a Network Attached Storage drive, and two offline copies.

## Is everything right?

So I'm finally happy again. The main "problem" I have with KeePassXC is its UI. In these days of Flat UI and Material Design guidelines, the software feels really dated. It also lacks some basic features such as showing which fields can be displayed in the entries columns, and my biggest gripe: custom fields do not show straight away when you search for a specific entry. Let's say for instance you create an entry for a credit card. It contains several custom fields such as the card number, its expiration date and the CCV. KeePassXC won't show those fields unless you go and edit the entry to display the custom fields, or you right click and select one of the "copy attributes" options. It would have been much better if each entry could be displayed in its entirety on a single pane, minus the protected fields of course.

I should give an honorable mention to [KeeWeb](https://keeweb.info/), a web app (available as an Electron desktop app as well), which tries to rejuvenate KeePass in that regard. But it poses even more security problems than KeePass does. I won't go into too much details in this post, but the flaws are easy to guess.

All in all, I feel much better using KeePassXC than I was using LastPass. Of course, this solution is not the most secure there is, especially by storing the database file on the cloud. I could fix this issue by using a self-hosted cloud service like OwnCloud or Bitorrent Sync. But once again, the balance between security and day to day usage would have been lost. I'd love for KeePassXC to support TOTP so that I could use again my Yubikey and get rid of the keyfile, but so far I feel confident in that solution.

By the way, what do you use to store your passwords?
