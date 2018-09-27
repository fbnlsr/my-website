---
title: Nouveau projet pour SBBT Architecture
date: 2018-09-27
menu: blog
cover:
    image: "/img/posts/sbbt.jpg"
    author:
    link:
links:
    devto:
    medium:
---
J'ai développé le nouveau site internet de [SBBT Architecture](https://sbbt-architecture.com/), un cabinet d'architectes parisien, en collaboration avec NySB Paris.

<!--more-->

Pour cette deuxième collaboration avec [NySB](https://nysb.paris), nous avons travaillé sur le site internet de [SBBT Architecture](https://sbbt-architecture.com/). La plateforme choisie est Wordpress, le client désirant un système d'administration complet lui permettant de modifier tous les éléments de son site.

J'ai dû construire un carrousel sur-mesure faisant l'utilisation d'images en plein écran. Le tout est géré par Advanced Custom Fields, laissant au client la possibilité de modifier tous les aspects des diapositives : de l'image de fond au texte principal, de la couleur à la direction du dégradé, et ainsi de suite.

Pour la grille sur la page projets, j'ai utilisé [Shuffle.js](https://vestride.github.io/Shuffle/), une grille responsive qui est catégorisable, triable et filtrable.

Le problème principal que nous avons rencontré sur ce site est son poids. Il utilise énormément d'images en plein-écran, et étant donné qu'elles représentent des projets architecturaux, il était impératif d'avoir des photos de qualité. J'ai trouvé la solution en utilisant l'API de reSmush.it, qui compresse à la volée les images qu'un administrateur envoie dans la galerie de médias.

Pour ce projet, nous avons fait l'utilisation de Wordpress, SCSS, ShuffleJS, jQuery et Webpack.

Rendez-vous sur [https://sbbt-architecture.com](https://sbbt-architecture.com) pour voir le résultat !
