---
title: Gitlab crashed, who's to blame?
date: 2017-02-02
menu: blog
cover:
    image: gitlab.jpg
    author:
    link:
links:
    devto:
    medium:
---
Last night, a "tired sysadmin" ran a directory wipe on the wrong server of code hosting platform Gitlab, deleting over 300 GB of live production data. Following that incident, the website was taken offline while they were trying to restore from a backup. Plot twist: "none [of their] backup/replication techniques [were] working reliably or set up in the first place." It took them a full day to fix the damages, leaving thousands of devs stranded, and losing close to 6 hours of data.

On Twitter, Gitlab posted the most amazing and devastating tweet a sysadmin could ever write in their career:

> We accidentally deleted production data and might have to restore from backup.

To be honest, there couldn't be a more disastrous catastrophy for a company that's relying on data as much as they do. Me and the team I'm currently working with have been using Gitlab for a few months now, and already had to suffer from their constant downtime. At one point, Gitlab.com could be offline three to five times a day.  We were glad to hear that they were looking to [leave the cloud](https://about.gitlab.com/2016/12/11/proposed-server-purchase-for-gitlab-com/), only to learn that finally, they'd be looking to expand in the cloud after all.

As Hacker News user *connorshea* pointed out:

> it's never the fault of a person, always of a system

This could be applied to what happened at Gitlab. It feels amazing that for such critical tasks (you don't delete a whole database directory every day), they don't rely to the most simple and effective management system: checklists. It is used around the globe whenever a system is at risk. Airline pilots, surgeons and nurses, army crew, they all have checklists. It is the safenet against repetitive and menial tasks. That's why you'll see airline pilots talking through everything they're doing during an emergency procedure, with their co-pilot enforcing what they're about to do. It usually goes like this:

> – "I'm about to turn off A/C.
>
> – Green for turning off A/C.
>
> – A/C is turned off.
>
> – Confirmed. A/C is turned off".

This is greatly exagerated as I haven't flown a plane in.. well ever. But you get my point. Each and every step is monitored and confirmed by a fellow crewman. If you want to know more you can read this Wikipedia article about [crew resource management](https://en.wikipedia.org/wiki/Crew_resource_management).

Gitlab has taken the stance of total transparency, going as far as live-broadcasting their backup process. Many praise them for taking such a stance, but they hardly couldn't take another one, as there was a slight possibility of irrecuperable failure.

At the end of the day, the real question is not really "*who*'s to blame?" but rather "*what*'s to blame?". Poor practices, lack of preparation and a frustrated and tired engineer make for a bad combo. I'm sure Gitlab will grow from its mistakes. I'm not so sure they've handled the situation perfectly and are not losing clients by the minute, but hey, we can't blame them from trying not to go under.

In rememberance for this day, [@CyberShambles](https://twitter.com/CyberShambles) has dedicated February 1st as [Check Your Backup Day](http://checkyourbackups.work/). Good one.

---
Source: [https://www.theregister.co.uk/2017/02/01/gitlab_data_loss/](https://www.theregister.co.uk/2017/02/01/gitlab_data_loss/)
