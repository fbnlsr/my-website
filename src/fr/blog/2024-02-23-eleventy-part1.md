---
title: "Maîtriser Eleventy - Partie 1 : La structure de projet"
date: 2024-02-23
translationKey: "blog11typart1"
excerpt: "Dans cette série d'articles, je partage mes recommandations sur à l'implémentation d'un environnement de travail serein pour développer des sites web statiques avec Eleventy."
cover:
  author: "Sven Mieke"
  link: "https://unsplash.com/@sxoxm"
---
## Préambule

Ayant toujours baigné dans l’univers des langages interprétés, je dois reconnaître que même pour moi, le simple fait de « compiler » un site internet m’avait surpris au début. Et pourtant, quelque chose de spécial se passe lors de la compilation d'un site internet statique : les informations sont récoltées, découpées et mises en forme, des appels API sont effectués et des données transitent, et des assets sont transformés. Et une fois que tout est en place, voir s'imbriquer les systèmes tels des engrenages bien huilés apporte quelque chose de satisfaisant. Nous avons à disposition un ensemble de code prêt à être délivré, qui respecte des bonnes pratiques et est très rapide à l’exécution. Mais surtout, le tout est solide comme un roc, (presque) impénétrable aux attaques, et gravé dans le marbre numérique.

Et pourtant, le principe de base est simple : le générateur utilise une syntaxe Markdown pour le contenu rédactionnel, un moteur de templating pour mettre en forme ce dernier, et au final fournit un ensemble de fichiers HTML & CSS qui peuvent alors être posés sur un serveur et délivrés par Apache ou Nginx. Pas de base de données, pas de code interprété, et donc par conséquent une sécurité et une vitesse d'exécution sans équivalence.

Au fil des ans, le site internet que vous êtes en train de lire aura utilisé plusieurs de ces générateurs. Faisons un petit tour d’horizon de ce que j’ai déjà utilisé, avec (à mon avis) leurs forces et faiblesses.

### Jekyll

En premier, j'ai utilisé [Jekyll](https://jekyllrb.com). Précurseur de la mouvance JAMStack, il a été créé il y a plus de 15 ans par Tom Preston-Werner, le fondateur de GitHub. Aujourd’hui, Jekyll est probablement le générateur de site statique le plus connu et le plus utilisé au monde. C'est vraiment un système formidable, et sa documentation est excellente. Seulement voilà : Jekyll demande de posséder et maintenir un environnement Ruby. Et si comme moi vous n'êtes pas un développeur utilisant cet écosystème au quotidien, cela peut devenir un peu fastidieux.

### Hugo

J'ai utilisé par la suite [Hugo](https://gohugo.io), « fils spirituel » de Jekyll, et dont la force majeure est sa vitesse d'exécution hors pair. Seulement voilà (encore) : Hugo est écrit en Go et sa syntaxe de templating est disons, pour rester poli, spéciale. Je n'ai jamais pu me faire ni à ses opérateurs, ni à sa syntaxe globale. Le développement de cette version s'est clairement fait dans la douleur, d'autant plus que sa documentation est très hermétique. Ceci dit, Hugo possède deux choses que j'ai trouvé extrêmement puissantes à l’époque : sa notion de « contexte » dans les feuilles de templates, et sa gestion du multilangue. Le fait de pouvoir lier du contenu entre plusieurs langues de manière transparente est quelque chose d'extrêmement pratique qui fait gagner beaucoup de temps.

### Eleventy (11ty)

Finalement, la version actuelle du site a été faîte sous [Eleventy](https://www.11ty.dev). Là aussi, la documentation n'est pas des plus limpides, mais c'est un projet que je suis depuis longtemps et il bénéficie à la fois d’une communauté vivante et d’une approche très « ouverte », ce qui m’a donné l’envie de l'adopter. Le support i18n était inexistant jusqu'à il y a peu, mais de gros progrès ont été fait depuis. Son aspect le plus attrayant pour moi est le fait que Eleventy est écrit en JavaScript, et j'ai tout de suite été séduit par la liberté qu'il laisse à l'utilisateur (D'ailleurs je crois que son nom provient du nombre de moteurs de templates utilisables).

> Petite parenthèse en passant : le « branding » de ce projet est certainement l'un des plus maladroits qu'il m'ait été donné de voir. Le projet s'appelle « Eleventy » mais le domaine est épelé « 11ty », l'un des formats de templating acceptés possède l’extension .11ty.js, mais le fichier de configuration global s'appelle .eleventy.js. Cela peut être extrêmement troublant pour un néophyte, et je pense que le projet mériterait une meilleure cohésion autour de la « marque » Eleventy. Cela peut paraître anecdotique, mais en 2024 je pense que c’est un passage obligé pour pouvoir acquérir des utilisateurs, même pour un projet Open Source. Il suffit de voir le succès d’autres frameworks comme Astro ou Laravel pour se rendre compte à quel point l’image est importante dans le succès de tels produits. Allez, une petite dernière avant de fermer cette parenthèse : si vous cherchez le compte Twitter du projet, vous le trouverez sous le pseudo… [@eleven_ty](https://twitter.com/eleven_ty/) :zany_face:

Mais revenons donc à cette liberté d'utilisation, qui peut parfois paraître déroutante. Certes, c’est une grande force pour un développeur, mais je pense qu’une meilleure organisation de travail est possible, et elle permet d’avoir un code plus propre avec une structure plus facile à naviguer. C'est pourquoi dans ce premier article d'une série consacrée à Eleventy, je vous propose de vous partager la manière dont j'organise mon travail afin de conserver un maximum d'efficacité.

### La structure que je recommande

Par défaut, Eleventy fait des suppositions sur l'endroit où vous pouvez stocker vos données. Mais ces suppositions sont parfois trompeuses au niveau de leur nomenclature, et peuvent manquer de cohérence. Par exemple, le dossier attendu pour les templates s’appelle `/_includes`, celui pour les données `/_data`. Cela peut paraître anodin, mais une chose me dérange : ces dossiers se retrouvent mélangés avec l’arborescence du site final, avec les dossiers utilisés pour contenir du code qui devra être manipulé par la suite (SASS, JavaScript), et les fichiers de configuration du projet.

Personnellement, j’utilise donc cette structure :

```txt
/dist
/src
  /_assets
    /js
    /scss
  /_data
  /_layouts
  /en
    /about
    /…
  /fonts
  /fr
    /about
    /…
  /img
```

Et voici l’explication de ce choix :

- `/dist`

`/dist` est le répertoire de destination du site généré. Par défaut, Eleventy utilise le dossier `/_site` mais comme je le précisais plus haut, cela vient se mélanger avec les dossiers de data et autres. Ce répertoire est à ajouter dans le fichier `.gitignore` car il ne doit pas être commit.

- `/src`
- `/src/_assets`
- `/src/_data`
- `/src/_layouts`

`/src` devient le répertoire de travail principal. C’est dans ce dossier que va résider tout le code source du site à générer.

`/src/_assets` est un dossier réservé aux assets compilés ou minifiés, comme le JavaScript ou le SASS. Ces fichiers sont manipulés lors du build par un fichier spécifique, pour générer leur version finale (nous verrons comment dans un prochain article).

`/src/_data` est le dossier qui sert de « base de données » au site. Nous pouvons en effet utiliser des fichiers JSON comme sources de données sur lesquelles nous pouvons boucler, ou c’est encore ici que nous stockerons le dictionnaire multilingue. Ici je ne change pas la nomenclature d’11ty mais simplement l’emplacement du dossier.

`/src/_layouts` est l’endroit qui va contenir tous nos fichiers de template. J’ai fait le choix d’utiliser Nunjucks, mais on peut utiliser Liquid ou un autre, c’est une question de préférence. Par défaut, 11ty s’attend à utiliser un dossier `/_includes` et là encore la nomenclature que j’utilise a plus de sens, mais surtout se trouve dans un dossier unique `/src`.

- `/src/en`
- `/src/fr`
- `/src/en/about`
- `/src/fr/about`
- `/src/en/...`
- `/src/fr/...`

`/src/en`, `/src/fr` et leurs sous-dossiers font partie de l’arborescence principale du site compilé. C’est dans ces dossiers que nous retrouverons les différentes sections de notre site, avec leur contenu Markdown équivalent. Étant donné que je crée un site multilingue, j’ai décidé d’utiliser un sous-dossier par langue, comme le préconise la documentation. J’expliquerai dans un prochain article comment je fais le pont entre les langues.

- `/src/fonts`

`/src/fonts` est un endroit où je stocke les polices de caractères, car je préfère les servir directement plutôt que d’utiliser le CDN de Google. Cela me permet d’éviter un appel HTTP externe et surtout de me passer du fingerprinting de Google.

- `/src/img`

`/src/img` est le dossier où vont résider toutes les images du site. Petite note en passant : si vous ne le faîtes pas déjà, je vous encourage à utiliser au maximum un format récent comme l’AVIF ou le WEBP qui sont nettement plus performants en termes de compression par rapport au JPG ou au PNG.

### Aides à la compilation

Décider d’une arborescence est une chose, mais nous devons dire à 11ty où trouver ce qu’il cherche. Pour cela, nous devons configurer le fichier `/.eleventy.js` qui est utilisé lors du build.

```js
// /.eleventy.js
module.exports = function (eleventyConfig) {
return {
	markdownTemplateEngine: 'njk',
	htmlTemplateEngine: 'njk',
	templateFormats: ['md', 'njk', 'html', '11ty.js'],
	dir: {
  	input: 'src',
  	output: 'dist',
  	layouts: '_layouts'
	}
  };
};
```

Ici nous précisons que le moteur de template utilisé est Nunjucks, et que les fichiers qui doivent être considérés comme des templates par 11ty peuvent porter l’extension `.md`, `.njk`, `.html` ou `.11ty.js`. Ces fichiers là vont donc forcément passer par le moteur Nunjucks afin de générer leur contrepartie HTML ou autre (précisé dans le front-matter). Enfin, sous la clé `dir` nous précisons les dossiers utilisés pour l’input, la destination et les layouts.

Ainsi, la racine du projet peut se contenter de contenir tous les fichiers de configuration (`.eleventy.js`, `.gitignore`, `package.json`, etc…), le code source réside dans `/src` et le site généré va se retrouver dans `/dist`.

Dans un prochain article je décrirai comment compiler les assets JavaScript / SASS, ainsi que quelques astuces qui faciliteront le développement.
