---
title: "Quick Review of Steed FTP Client"
date: 2013-01-14
translationKey: "blogSteed"
excerpt: "Let's take a look at Steed, a new FTP client for Windows that's aiming at being an alternative to the good old FileZilla."
---
![Steed](steed.jpg)

As a web developer, much time is spent using an FTP client. And I'm sure you'll agree with me, not so much has been done in the past 15 years in this field. Wether used to backup, upload, or update a website, this piece of code has been used for decades to exchange files between computers. Such a simple protocol shouldn't be reserved to power users, and even some of the nerdiest of us like to use beautiful softwares. Today we're looking at [Steed](http://www.frenchfrysoftware.com/steed/), which got out of Beta in late 2012. Let's see if we can do better than your daddy's client and use 2013's standards with a protocol that's about to celebrate its 40th birthday.

I've been using [FileZilla](http://filezilla-project.org/) for as long as I can remember, and despite the fact that it's not very user friendly, it gets the job done. One *major* drawback though, is the fact it stores its bookmarks' passwords in plain text. It has been [filed as a critical bug](http://trac.filezilla-project.org/ticket/5394) in FileZilla's Trac, then rejected on the fact that passwords stored in plain text are not a security failure, but a design choice. This problem can be fixed with ease, using an encrypted [TrueCrypt container](http://www.truecrypt.org/) storing the XML file for instance.. I personally use this method and store it in my [Wuala](http://www.wuala.com/) folder, which also adds sync between my different machines. Still, this is not a good design decision coming from FileZilla's devs and time has come for a replacement.

After considering the obvious alternatives, and especially [WinSCP](http://winscp.net/eng/index.php) (which stores passwords in AES256 [when using a Master Password](http://winscp.net/eng/docs/security_credentials#storing_password)), I stumbled upon [Steed](http://www.frenchfrysoftware).com/steed/, a relatively new FTP client from the french folks at [French Fry](http://www.frenchfrysoftware.com/).

After a quick install, an immediate sense of purity and clean design comes to mind. One might even say Apple-esque design, which is a good thing. Steed immediately asked me if I wanted to import my FileZilla bookmarks, and I was ready to go in minutes. Well, not quite, as there was a problem importing my folder settings. I like to link a remote folder with a local one on my computer, and Steed seemed to have some troubles importing some settings regarding folders which are located on a local NAS server. But let's not stop at that.

{% blogimg date | blogdate, "steed-main-window.jpg", "Steed main window" %}

The main window of Steed shows a Quick Connect section on top, and bookmarks at the bottom of the window. Bookmarks are stored in folders, and are displayed using big squares (around 200px big) showing the type of connection they are using. This is not your typical FTP client, with a list of names spurting out of a dropdown menu, and kudos to French Fry for trying something new. This design however could be improved, as you can't apparently choose a custom picture to replace these big squares, and you can't list your bookmarks in a different, more "traditional" fashion. All in all, it makes this section cluttered and impractical, especially if you have dozens of bookmarks. Apart from that, the UI is as clean as it can get. And it shows in the next screen.

{% blogimg date | blogdate, "steed-connected.png", "Connected to a S3 bucket" %}

Once connected, you're presented with this view. On the left side, your local machine. On the right side, your distant server. Things couldn't be simplier. Steed is here to transfer files from one location to another, and it gets the job done. Now don't start looking for options like FXP transfers, or even scripting, you'll need something else for that. Steed can handle multiple connections to various servers using tabs, just like Google Chrome or Mozilla Firefox. Unfortunately, these tabs don't seem to regroup in the taskbar, and I was shown multiple icons as if multiple instances of Steed were running. Another thing that could be improved with this simplistic UI is the fact that you have to open a new tab in order to access the Quick Connect / Bookmarks page again. It seems to be a design choice, but having a direct access to bookmarks (for instance thanks to an icon next to the Wrench icon) could save some clicks and add a feature while keeping in line with the minimalistic approach.

One other thing I absolutely love is the fact Steed handles not only FTP and SFTP, but also Amazon S3 buckets. It's something WinSCP can't handle, and [it has been confirmed by its developper](http://winscp.net/forum/viewtopic.php?t=6808) that he simply does not want to implement this feature. With Steed, using an S3 bucket couldn't be simplier. Just specify an access key and a secret key and your buckets will appear just like any other FTP folder. Now if the folks at French Fry are reading this, it would be awesome if Steed could also act as a client for Amazon Glacier, as there is no real good software out there for this purpose (*&#42;wink wink&#42;*).

OK so we're connected, now let's use this puppy.

{% blogimg date | blogdate, "steed-upload-s3.png", "Transfering some files" %}

When uploading a file, a nifty progress bar appears at the bottom of the window. Steed is supposed to be seamlessly integrated with Windows 7, so you should see the progress bar inside the shortcut icon of the application, but unfortunately I wasn't able to get a correct result for the tests I did (both using FTP or S3), and the icon showed some bugs regarding the progress bar. A quick click on a button located at the bottom of the main window opens a panel showing the details of the current transfers. Once again, the informations are displayed beautifully, and you can pause/resume/remove files in the queue.

And remember when I told you one of the main gripes I had about FileZilla was security? Well, what about Steed? I asked the devs via Twitter what was their crypto schema, and apparently, the credentials are stored in an xml file (just like FileZilla), but the passwords themselves are encrypted using Rijndael, a salted passphrase, and SHA1 as a hash. Much much better than FileZilla.

So it's all good and everything, but unfortunately for the dudes at French Fry, some of the downsides are huge.

First of all, Steed seems to be quite the ressource hog.

{% blogimg date | blogdate, "steed-memory.png", "Steed memory usage vs. Filezilla" %}

On my Asus Ultrabook, after one hour of "stand-by" use (the application was just connected to an FTP server, and ran in the background), Steed gradually took nearly 140 MB of RAM, while FileZilla was stuck at a mere 8 MB.

Then comes the price. While I'm totally for buying software and supporting developpers (I'm writing this article from my precious Sublime Text 2), Steed comes at a steep price of 19,99 € (around $26). I personally think in this Freemium Softwares, Smartphone Apps and Digital Distribution time and age, such a simple software could sell much better at around 9,99 € (with, say, an introduction price of 7,99€). Now I don't have the exact sell figures, and I hope things are doing well for French Fry, but as a comparison I bought a licence of [PostBox](http://www.postbox-inc.com/) (an amazing Email client based on Mozilla Thunderbird) last month for $9.95, which seemed like a bargain to me. At 20 Euros, and considering all the downsides I've seen, I came to the conclusion that Steed was not worth it and in the end I didn't buy a licence.

### Conclusion

Now I don't mean to tell everyone they should avoid this software. On the contrary, this new FTP client feels like a dose of fresh air in a field were editors haven't really tried anything new for a few decades. But despite all the good things Steed wants to offer, it lacks some polishing. And it's a shame considering its main selling point is its "simple & beautiful" UI. Some obvious features (a better sorting system for the bookmarks, the ability to clear the process queue...) are lacking, and with a steep price tag, Steed confronts itself with alternatives which are certainely not as attractive, but are free and (for the most part) flawless. I hope the folks at French Fry will nail the things that prevented me (and probably others) from buying a licence, because this new FTP client has a tremendous potential. And if you're looking for a simple, beautiful FTP client, you definitely need to check it out, as you get 10 days of free use when installing the client for the first time.

_*Update (March 20th, 2013):*_
Following this article, French Fry contacted me and asked for my inputs on what went wrong during my testing phase. Even though this article wasn't that easy on them, they were open to criticism and I'm happy to report that they're already working on fixing some of the bugs, like the one I had with the FileZilla folders import. Same for the progress bar bug, a fix will be deployed with the next version. They'll also soon add an option to change the language of the application. Much work is being done regarding memory optimization, and French Fry suspects the .NET framework to be responsible for much of the heavy memory usage of Steed. I ran more tests on my end, and Steed felt more stable than when I first reviewed it. I was able to pinpoint a memory error related to Amazon S3, which apparently makes the software gobble RAM like it's candy when uploading a file. Apart from that usage, Steed was much more stable, staggering at around 70 MB (still huge considering it's an FTP client, but I'm glad to see my first assumption was wrong). We also exchanged on the possibility of Glacier support (I hope they'll implement this soon), and a better bookmark system. They agree something has to be done, but they're looking for the best way to implement this inside the application without breaking the usage flow.

So their software is on its way to become an even better client than it already is, and kudos to French Fry for being that open. Steed is a software I'll definitely keep an eye on.
