---
date: 2023-01-08
slug: "notadoo"
title: "Notadoo"
tech: "Symfony / Vue.js"
work: "Front and backend development."
techUsed:
  - Symfony
  - Vue.js
  - Axios
  - wkhtmltopdf
  - Lodash
  - Moment.js
  - Shepherd.js
  - Babel
  - Eslint
  - SCSS
  - Webpack
client: "3DO2 / Notadoo"
projectUrl: "https://notadoo-notaire-en-ligne.co/"
projectImgDir: "/img/projects/notadoo"
desktopScreenshots:
  - desktop1.jpg
  - desktop2.jpg
  - desktop3.jpg
  - desktop4.jpg
  - desktop5.jpg
description: |
  **Notadoo** is a platform for notaries and their clients that help them digitize their workflow.
---

This was a huge project which kept me busy for a good part of 2019. The platform is built around a **Symfony-based API**. On top of that lies a front-end built using **Vue.js** which is then fed by the API.

The platform offers the users the possibility to create and manage projects. The projects make use of multi-step forms that are saved in real-time, and the users are able to send documents (PDFs, DOCs, etc...) to the API, which in turn stores them on a disk. Users also have the ability to automatically generate and save PDFs related to their forms, thanks to the use of **Snappy** and **wkhtmltopdf**.

A complex role management system had to be created, as the platform is reserved to its members and is managed through invites.

During a second phase, the platform was modified so it was able to communicate with an officially sanctioned software that's used locally by notaries, in order to transfer projects documents.

Thanks a lot to the fine folks at [**3DO2**](https://www.3do2.fr/) for this collaboration. This was probably one of the hardest challenges I had to face to date, as they trusted me with my technical expertise. I was in charge of both the back-end API development and the front-end GUI. We worked closely together to find the most effective, fastest and most robust solution to each new feature request the client expressed.
