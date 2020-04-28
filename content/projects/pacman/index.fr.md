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
**PACMAN** (Pilotage des Activités Cartographiques & Management) est un outil de suivi de performance utilisé en interne par les équipes d'Enedis.

<!--more-->

Cette plateforme était en production depuis plus d'un an au démarrage du projet. Suite aux nouvelles demandes de la part de leur client, l'agence [**3DO2**](https://www.3do2.fr/) a fait appel à moi pour réaliser la deuxième mouture de ce tableau de bord de suivi de performance. Pour cette refonte, Elsa du [**Studio Mund**](https://studiomund.fr/) a conçu un Brand Book complet : un nouveau logo a été créé et la charte graphique a entièrement été revue, en mettant l'accent sur l'accessibilité et l'UX.

Le but premier de cet outil est le **contrôle qualité** des intervenants associés à Enedis. Pour cela les utilisateurs peuvent entrer les données concernant leurs dossiers, et le système calcule les temps d'intervention modulés par un système de rapport d'erreurs fait sur mesure et ajoute une alerte visuelle en cas de dépassement. Par la suite, les équipes encadrantes sont en mesure de **générer des statistiques de performance** en fonction d'une plage de temps donnée.

D'un point de vue technique, la plateforme repose sur une **API basée sur Symfony**. Le front est assuré par une **interface en VueJS** alimentée par l'API. La page de statistiques est construite grâce à **ApexCharts**, qui grâce à son rendu vectoriel permet une impression des résultats de performance sans artefacts visuels.
