---
date: 2023-01-08
slug: "notadoo"
title: "Notadoo"
work: "Symfony / VueJS - Développement front et back."
techUsed:
  - Symfony
  - VueJS
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
  **Notadoo** est une plateforme pour les notaires et leurs clients qui leur permet de numériser leur process de travail.
---

Ce fut un projet de grande envergure qui m'a occupé pendant une bonne partie de l'année 2019. La plateforme est construite autour d'une **API basée sur Symfony**. Par dessus repose une interface utilisant **VueJS** qui est ensuite alimentée par l'API.

La plateforme offre aux utilisateurs la possibilité de créer et gérer des projets. Les projets utilisent des formulaires en plusieurs étapes qui sont sauvegardés en temps-réel, et les utilisateurs peuvent envoyer des documents (PDFs, DOCs, etc...) à l'API qui les sauvegarde sur disque. Les utilisateurs ont aussi la possibilité de générer et sauvegarder automatiquement des fichiers PDFs en relation aux formulaires, grâce à l'utilisation de **Snappy** et **wkhtmltopdf**.

Un système complexe de **gestion des rôles** dû être créé, car la plateforme est réservée à ses membres et est gérée par invitations.

Dans une seconde phase, la plateforme a été modifiée pour lui donner la **possibilité de communiquer directement** avec un logiciel reconnu officiellement (utilisé en local par les notaires) afin de leur permettre d'y transférer les documents de leurs projets.

Un grand merci à l'équipe de **[3DO2](https://www.3do2.fr/)** pour cette collaboration. Cela a été probablement l'un des challenges les plus passionnants qui m'a été donné de relever dernièrement. Ils ont fait confiance à mon expertise technique pour les développements à la fois de l'API en back et de la GUI en front. Nous avons travaillé en étroite collaboration afin de trouver la solution la plus **efficace, rapide et robuste** à chaque nouvelle fonctionnalité désirée par le client.
