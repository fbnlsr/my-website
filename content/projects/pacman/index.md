---
weight: 9
date: 2020-03-27
slug: "pacman"
title: "PACMAN"
work: "Symfony / VueJS - Développement front et back."
techUsed:
  - Symfony
  - VueJS
  - Axios
  - Lodash
  - Moment.js
  - ApexCharts
  - Babel
  - Eslint
  - SCSS
  - Webpack
client: "3DO2 / Enedis"
---
**PACMAN** (Pilotage des Activités Cartographiques & Management) is a performance monitoring tool used internally by French electricity provider Enedis.

<!--more-->

This platform was in production for more than a year when we started this project. Since their client expressed new feature requests, the agency [**3DO2**](https://www.3do2.fr/) asked me to make the second version of this reporting tool. For this overhaul, Elsa from [**Studio Mund**](https://studiomund.fr/) produced a Brand Book: a new logo was made and the graphical identity was completely reimagined by accentuating things on accessibility and UX.

  The first goal of this tool is **quality control** for teams associated with Enedis. For this, users are able to enter the data regarding their projects and the system automatically computes procedure times (modulated by a custom-built issue ticketing system) and adds a visual marker in case projects take too long to be resolved. Managing teams are then able to **generate performance statistics** depending on a given time frame.

  From a technical point of view, the platform stands on a **Symfony-based API**. A **VueJS front-end GUI** is then fed by it. Statistics are generated using **ApexCharts** which thanks to its vector rendering allows for printing without visual artifacts.
