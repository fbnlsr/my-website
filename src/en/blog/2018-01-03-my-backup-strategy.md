---
title: "My backup strategy"
date: 2018-01-03
translationKey: "blogBackup"
excerpt: "In this post I talk about my current backup strategy, and how an irreversible tragedy taught me how to be more cautious about my digital memories."
cover:
    author: "Patryk Grądys"
    link: "https://unsplash.com/@patrykgradyscom"
links:
    devto: "https://dev.to/fbnlsr/my-backup-strategy-4gi7"
---
The protection of digital assets is a multi-million dollar industry. Whether we're talking about military, financial or scientific data, each industry has to be prepared in the event of a loss, and plan for security. They often roll out extreme measures, going as far as having their own (and doubled) dedicated electrical power lines. But what about safeguarding your friend's latest BBQ party pictures? Or your little one's first steps video? Here's how I've learned my lesson from a tragic system failure and what my current setup looks like now.

## A catastrophic failure

Back in 2008, I made myself a custom NAS (**Network Attached Storage**) using some old computer parts, a bunch of 500 GB hard drives and a copy of **FreeNAS**. The OS ran off a nifty 512 MB IDE flash based drive, and the data array was configured to use **RAID5**. That meant that if a drive was to be damaged, I could always put a new drive in the array and the data would rebuild itself. Note the conditional tense. That's because it worked flawlessly until we moved in 2010. And we stored the NAS in a box next to a speaker with a huge magnet for a month. And two drives failed.

I spent weeks trying to figure out a solution on how to rebuild the data I had lost. But after some time I had to face the reality of things. It was in vain. Years of family photos and videos, an entire MP3 collection, all my video games... It was all lost, forever. My girlfriend was in tears and my "geek pride" after spending all that time planning and building this whole system took a serious hit. I was using hot data as a storage, and at the time I had no backup strategy. Of course I had recovery options, hence the RAID5, but I was not prepared for such a catastrophic failure. And when it comes to computer security, you *have* to prepare for the worse.

Years later, I learned my lesson. So here is how I handle my digital life now.

## My current setup

My current setup is mainly built around two things: a new NAS, that I bought and not built, and a backup software that automates how data is handled.

The NAS I'm using now is a **Synology DiskStation DS214se**. It's a very simple machine, running on a 800 MHz dual core CPU, with 256 MB of RAM and two hard drive bays. I put in there **two 2 TB Western Digital Green** hard drives, and configured a single array to be run in **RAID1**: everything that's on one drive gets mirrored to the second one. That means that I lose half of the hypothetical storage space but if one drive fails, I can change it and the data will automatically rebuild itself.

The NAS sits on top of an **APC Uninterrupted Power Supply**. If power is lost in my apartment, the NAS keeps running and I can manually (and safely) shut it down either by using its physical power button (which sends a power off command) or even my phone (my router is also plugged in to the UPS, so even without power I still have internet and network access for a few minutes).

My main backup strategy is handled by an amazing software called **SyncBack Free**. This software allows me to set up various backup scenarios, called profiles. The main profile is a **physical backup** to an external hard drive. When I bought the Synology NAS, I got a third 2 TB drive that is now used as a backup. This is my first failsafe. This is what lacked in my previous setup. Once the backup task is done, that drive is stored **offline** and **off-site**, so it doesn't have to suffer from electrical malfunctions. And even in the event of a fire or flood at my place, my data is safe.

SyncBack then runs two more jobs. Amongst all the data I've lost with that old setup, the loss of family photos were the hardest to cope with. One can always replace music or movies they used to love, as there's a never-ending stream of entertainment to consume. But memories do fade away, and are impossible to retrieve. So I've decided to add another redundancy layer to my backup strategy when it comes to photos and store them online, in my **Google Drive**. SyncBack compares the content of the NAS folder and my Google Drive, and updates the later with the former before performing a **Cyclic Redundancy Check** of each file to see if they are the same on both sides.

I should note that I could use two different apps on the NAS and have it handle these two backups automatically: **USB Copy** and **Hyper Backup**. After trying out both apps in different scenarios, I've decided not to use them as they either store data in a proprietary format (Hyper Backup) or add a bunch of `._` prepended metadata files to my existing directories (USB Copy). I like the fact that if I ever need to retrieve my files outside of Synology's ecosystem, I still can use a good old `cp` command to get my files back.

## But wait, there's more!

So my data is stored on a RAID1 array, and on an offline hard drive. And the photos are backed up online on my Google Drive. I could have stopped there but I thought that it was not enough. Thanks to my **Amazon Prime** subscription, I can upload an infinity number of photos on their **Amazon Drive** cloud service and it won't affect my otherwise limited quota. So hey, let's take this opportunity! Another SyncBack profile backs up the content of my Photos directory to Amazon's servers. I like the fact that my data is stored on two different storage providers. Google and Amazon each have their own infrastructure, so in the event of a failure of astronomical proportions at either one of these places, I *may* still be safe.

But why stop there? My photos are stored on four different locations now (The NAS, the external hard drive, Google Drive and Amazon Drive). But what about the rest? My music, my documents, my family videos? Well of course they're on the NAS and the external hard drive, but I figured I needed another failsafe. Because so far my backup strategy relies on what could constitute a **single point of failure**: SyncBack. If the software behaves badly or one of my backup profile is not properly configured, I may end up with nothing but a bad save on various locations. I also don't have access to the external hard drive that easily, so if I need to do a backup at any given time, I need to prepare the operation at least a day in advance.

That's why I took a subscription to [**Synology C2**](https://c2.synology.com/en-us). It is a fully integrated service that runs natively on **DSM** (*DiskStation Manager*: Synology's own operating system) and allows me to back up the whole NAS (minus my movies and TV shows, these are not important) to Synology's servers. It uses AES-256 to locally encrypt the data before sending it on the network. I've set it up so it does an automated backup every first day of the week, and then do an integrity check two days later.

I also considered Online's [C14](https://www.online.net/en/c14), as they're really cheap and you can send files over (S)FTP but unfortunately they do not support Synology.

## Room for improvement

So this is what my current setup looks like now:

{% blogimg date | blogdate, "backup-strategy.jpg", "My current setup" %}

Each file is physically stored on up to 6 different location, with various levels of failsafe measures.

Is this setup perfect? Of course not. First and foremost, it lacks automation. I still have to start each backup task (except for the C2 one) manually, and it is prone to error. I'm working with live data so the array is constantly changing, but this is a backup, not a long term cold storage. And the external hard drive I'm using has to be transported and manipulated, so that's another weak point in the system.

One thing I'll probably change soon is the model of the hard drives I'm using. WD Green are "fine" but they are not made for being used in a NAS. So I think I'll switch them for either WD Red or Seagate Ironwolf line, and probably take the opportunity to do a slight storage upgrade to 3 or 4 TB.

All in all, the main problem with backup strategies is that they're never perfect. Just look at [what happened at GitLab](https://techcrunch.com/2017/02/01/gitlab-suffers-major-backup-failure-after-data-deletion-incident/) a few months ago, or even the catastrophic failure that [brought OVH to its knees](https://www.theregister.co.uk/2017/07/13/watercooling_leak_killed_vnx_array/) for hours.

One cannot be fully prepared against data loss. Still, I can say that I feel *confident* with this strategy, and I've tried to think about every scenario (even solar flares, but they're a whole another animal). We'll see how and where my data sits in a few years.
