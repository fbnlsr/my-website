---
title: "Rendez votre site web plus rapide en 1 minute avec Instant.page"
date: 2019-10-03
translationKey: "blogInstant"
excerpt: "Parfois la vie est simple. On charge un script, et notre site est plus rapide. Mais quelle est cette sorcelerie ?"
cover:
    author: "Marc-Olivier Jodoin"
    link: "https://unsplash.com/@marcojodoin"
links:
    devto: "https://dev.to/fbnlsr/speed-up-your-website-in-1-minute-with-instant-page-49f1"
    medium: "https://medium.com/@fbnlsr/speed-up-your-website-in-1-minute-with-instant-page-b12c8d91db81"
---
Derrière ce titre putaclic se cache un vrai petit outil très pratique. Je suis tombé dessus en surfant Hacker News il y a très longtemps, et à vrai dire il est actif sur ce site [depuis février](https://github.com/fbnlsr/my-website/commit/d862953f35a2ae0992ed11bd8c294bf8d7658a91) mais je n'ai jamais pris le temps d'en parler. **Instant.page** est donc une petite librairie Javascript qui utilise un *"préchargement juste à temps"* sur les liens d'une page – c'est-à-dire que le script précharge une ancre juste avant qu'un utilisateur ne clique sur un lien hypertexte.

La technique utilisée est très simple : **Instant.page** va en effet calculer combien de temps un utilisateur laisse le curseur de sa souris sur un lien (ce qui jusqu'à preuve du contraire est le comportement par défaut lorsqu'on veut cliquer sur quelque chose) et va déclencher le préchargement si ce temps dépasse les 65ms. Étant donné qu'un humain lambda [considère comme instantanée une action qui prend moins de 100ms](https://www.nngroup.com/articles/response-times-3-important-limits/), **Instant.page** trompe le cerveau. Du coup, ce script vous permet de proposer à vos utilisateurs une meilleure expérience, car plus rapide.

L'installation est des plus simple : il suffit d'insérer la balise `<script>` contenant le lien du script juste avant la balise de fermeture `</body>` do votre site, et c'est tout ! La librairie va se greffer automatiquement sur les ancres de la page. Elle ne pèse qu'1kB, et est gratuite et open source (MIT).

**Instant.page** vous permet aussi de contrôler quel contenu doit être préchargé ou non. Vous pouvez par exemple (et c'est d'ailleurs fortement conseillé par son créateur) refuser le préchargement de certains liens, comme ceux de logout. Pour se faire, il suffit d'ajouter un attribut `data-no-instant` à ces liens et **Instant.page** va les ignorer. Vous pouvez même spécifier vouloir accepter le préchargement des liens externes.

Simple, légère et facile. Si vous voulez tester par vous-même, retrouvez **Instant.page** ici : [https://instant.page/](https://instant.page/)
