---
title: "Maîtriser Eleventy - Partie 2 : i18n et assets"
date: 2024-04-11
translationKey: "blog11typart2"
excerpt: "Dans cette série d'articles, je partage mes recommandations sur à l'implémentation d'un environnement de travail serein pour développer des sites web statiques avec Eleventy."
cover:
  author: "Susan Q Yin"
  link: "https://unsplash.com/@syinq"
---
Dans [la première partie](/fr/blog/maitriser-eleventy-partie-1-la-structure-de-projet/) de cette série d’articles consacrés à Eleventy, nous avions vu quelle structure de dossiers j’utilise pour bénéficier d’un environnement de travail sain et organisé.

Ici, nous allons voir comment utiliser Eleventy pour avoir un site multilingue, et gérer ses assets JavaScript et CSS à l’aide du processus de build.

## Compiler ses assets JS/SCSS

Commençons donc par la compilation du JavaScript et de la CSS. Pour cela, et comme nous l’avons vu dans la partie précédente, je stocke ces fichiers dans le dossier `/src/_assets` de mon projet. Laissés tels quels, les fichiers ne sont pas considérés par Eleventy, et se retrouvent tout simplement ignorés pendant le build. Pour qu’ils soient pris en compte lors du processus de build du site, je crée donc un fichier spécifique avec l’extension `.11ty.js`.

### JavaScript

Pour JavaScript, nous allons avoir besoin de la dépendance `esbuild` :

`npm install --save esbuild`

Nous créons ensuite le fichier `/src/scripts.11ty.js` avec le code suivant :

```js
// /src/scripts.11ty.js
const esbuild = require('esbuild');
const { NODE_ENV = 'production' } = process.env;

const isProduction = NODE_ENV === 'production';

module.exports = class {
  data() {
	return {
  	permalink: false,
  	eleventyExcludeFromCollections: true
	};
  }

  async render() {
	await esbuild.build({
  	entryPoints: ['src/_assets/js/main.js'],
  	bundle: true,
  	minify: isProduction,
  	outdir: 'dist/js',
  	sourcemap: !isProduction,
  	target: isProduction ? 'es6' : 'esnext'
	});
  }
};
```

On peut voir ici l’une des grandes forces d’Eleventy : ce fichier va être attrapé à la volée et compilé de manière à prendre notre fichier source `/src/_assets/js/main.js` et en faire le fichier `/dist/js/main.js`, qui va non seulement embarquer les dépendances de notre projet mais sera aussi minifié.

### Feuilles de style

Le principe est le même pour nos assets CSS. Pour cela nous allons avoir besoin de la dépendance `sass` :

`npm install --save sass`

Le fichier d’entrée sera `/src/styles.11ty.js` avec le contenu suivant :

```js
const path = require('path');
const sass = require('sass');

module.exports = class SassTemplate {
  data() {
	return { permalink: '/css/main.min.css' };
  }

  render(data) {
	return sass.compile(path.join(__dirname, './_assets/scss/main.scss'), {
  	style: 'compressed'
	}).css;
  }
};
```

Là encore, c’est grâce à l'extension `.11ty.js` que le fichier est pris à la volée lors du build, et le point d’entrée est `/src/_assets/scss/main.scss`. Le fichier final généré va ainsi embarquer tous les partials et mixins définis dans notre source et finira sa course dans `/dist/css/main.min.css`, compilé et minifié, prêt à être utilisé dans nos templates.

## Internationalisation (i18n)

Les assets JavaScript et CSS étant pris en compte, nous pouvons maintenant passer à l’internationalisation de notre site internet. Notons ici que je décris la méthode que j’ai décidé d’appliquer, mais elle n’est peut-être pas la plus pertinente ni la plus optimisée pour vous. Grâce à sa souplesse, Eleventy permet d’expérimenter et d’utiliser le système que l’on désire. Celui que j’ai décidé d’utiliser possède plusieurs avantages :

- La **séparation du contexte** : les langues possèdent leur propre dossier.
- La **flexibilité** : il est possible d’ajouter des langues assez simplement.
- La possibilité de **lier des pages** entre elles afin de créer un « pont » entre les langues.

La première chose à faire est donc de séparer les langues dans différents dossiers. Ainsi, nous aurons le contenu du site en Français dans le dossier `/fr/` et la version anglaise sera dans `/en/`. Cela permet ainsi une séparation du contexte, mais aussi de pouvoir faire une liaison (ou non) entre deux pages équivalentes.

### Gérer le menu principal

Le problème principal qui se pose est la gestion de la navigation principale : étant donné que notre site repose sur un système de layouts, il serait malvenu de décomposer ces derniers sur plusieurs langues. Encore une fois, ce serait possible, Eleventy nous permet ceci, mais la mutualisation des templates entre les différentes langues est préférée. Pour tout ce qui ne ressort pas du contenu rédactionnel, nous allons donc utiliser notre « base de données » qui réside dans `/_data/site.json` : il s’agit là d’un simple fichier JSON que nous pouvons utiliser comme bon nous semble. Je regroupe donc toutes les entrées du menu principal sous la clé headerLinks comme suit :

```json
// /src/_data/site.json
{
  "headerLinks": [
	{
  	"translationKey": "home",
  	"url": {
    	"en": "/en/",
    	"fr": "/fr/"
  	},
  	"external": false
	},
	{
  	"translationKey": "about",
  	"url": {
    	"en": "/en/about/",
    	"fr": "/fr/a-propos/"
  	},
  	"external": false
	},
	{
  	"translationKey": "projects",
  	"url": {
    	"en": "/en/projects/",
    	"fr": "/fr/projets/"
  	},
  	"external": false
	},
	{
  	"translationKey": "blog",
  	"url": {
    	"en": "/en/blog/",
    	"fr": "/fr/blog/"
  	},
  	"external": false
	},
	{
  	"translationKey": "contact",
  	"url": {
    	"en": "/en/contact/",
    	"fr": "/fr/contact/"
  	},
  	"external": false
	}
  ]
}
```

Sous celle-ci, nous trouvons donc un tableau d’objets avec les clés suivantes:

- `translationKey` est une valeur unique donnée à chacune des pages. C’est sur cette clé que tout repose.
- `url` spécifie, pour chacune des langues, la destination du lien.
- `external` est un booléen qui permet de spécifier si le lien doit s’ouvrir dans un nouvel onglet ou non.

Ceci nous permet donc de pouvoir générer le menu principal du site :

{% raw %}
```jinja2
{%- for item in site.headerLinks -%}
    <a class="navbar-item {% if (page.url == "/" + locale + "/" and item.translationKey == "home") or page.url == "/" + locale + "/" + item.url[locale] + "/" or item.translationKey == category -%}is-active{%- endif -%}" href="{{ item.url[locale] }}">{{ i18n[locale][item.translationKey] }}</a>
{%- endfor -%}
```
{% endraw %}

Dans cette boucle, nous vérifions si la page actuelle est :

- La home **ou**
- Une page faisant partie d’une catégorie donnée **ou**
- Une page de catégorie

Ceci nous permet de spécifier une classe CSS `is-active`, qui démarque l’entrée actuellement active du menu par une bordure de couleur.

Comme vous pouvez le constater, nous nous reposons sur cette fameuse `translationKey` dans une autre partie du lien du menu :

{% raw %}`{{ i18n[locale][item.translationKey] }}`{% endraw %}

Ceci fait appel à un autre fichier de « base de données », situé dans `/src/_data/i18n.json`. Ce fichier constitue le « dictionnaire » de notre site, et nous pouvons y stocker toutes les chaînes de caractères qui ont besoin d’une traduction. Voici un exemple très simplifié de ce fichier, pour que vous puissiez voir à quoi il ressemble :

```json
{
    "fr": {
        "aboutMe": "À propos de moi",
        "twitterShare": "Vous avez aimé cet article ? Partagez-le sur Twitter !",
    },
    "en": {
        "aboutMe": "About me",
        "twitterShare": "Did you like this article? Share it on Twitter!",
    }
}
```

Mais avant de pouvoir utiliser ce dictionnaire, il est nécessaire de spécifier une clé `locale` pour chacun de nos dossiers `/fr/` et `/en/`. Pour cela, nous pouvons utiliser une autre spécificité d’Eleventy qui nous permet de définir des données pour tout un dossier en utilisant une nomenclature de fichier simple : le fichier doit porter le nom de son dossier parent. Ainsi, nous créons un fichier `en.json` situé dans `/src/en/` et un fichier `fr.json` situé dans `/src/fr/`. Le fichier `en.json` va par exemple contenir :

```json
// /src/en/en.json
{
  "locale": "en"
}
```

Ce petit fichier JSON est primordial pour le support multilingue de notre site internet car il autorise l’utilisation de la clé `locale` partout dans nos templates. Cela permet donc de préciser à Eleventy que tout ce qui réside dans ce dossier possède une clé `locale` qui a pour valeur `en`.

Nous pouvons désormais utiliser plusieurs langues pour des pages statiques. Par exemple, il est maintenant possible d’avoir une page `/en/about.md` et une page `/fr/about.md`. Ces deux pages possédant la clé `translateKey` à about, elles sont « reconnues » dans le menu principal et la distinction de la page active se fait correctement.

> Notez que j’utilise ici le même nom de fichier mais rien ne nous empêcherait d’utiliser `/en/about.md` et `/fr/a-propos.md`. C’est une simple convention que j’ai décidé d’appliquer.

Mais qu’en est-il pour les pages secondaires, et particulièrement les articles de blog ? Voyons ceci immédiatement.

### Gérer les articles de blog

La première chose à faire est donc de spécifier un fichier `blog.11tydata.js` (dans le dossier `/fr/blog/` par exemple) afin d’y ajouter le code suivant :

```js
// /src/fr/blog/blog.11tydata.js
require('dotenv').config();
const fs = require('fs');

const isDevEnv = process.env.ELEVENTY_ENV === 'development';
const todaysDate = new Date();

function showDraft(data) {
  const isDraft = 'draft' in data && data.draft !== false;
  const isFutureDate = data.page.date > todaysDate;
  return isDevEnv || (!isDraft && !isFutureDate);
}

module.exports = function () {
  return {
	eleventyComputed: {
        eleventyExcludeFromCollections: function (data) {
            if (showDraft(data)) {
                return data.eleventyExcludeFromCollections;
            } else {
                return true;
            }
        },
        hasCover: function (data) {
            if (data.page.date) {
                const year = data.page.date.getFullYear().toString();
                const month = ('0' + (data.page.date.getMonth() + 1)).slice(-2).toString();
                const day = ('0' + data.page.date.getDate()).slice(-2).toString();

                const path = `./src/img/blog/${year}-${month}-${day}/cover.webp`;

                return fs.existsSync(path);
            } else {
                return false;
            }
        }
	},
	layout: 'blogpost.njk',
	tags: 'posts_fr',
	category: 'blog',
	permalink: '/fr/blog/{{ title | slugify }}/'
  };
};
```

Ce fichier est un peu plus complexe que le simple `fr.json` que nous avons utilisé plus haut, mais il nous permet plusieurs choses :

- L’utilisation de la clé `eleventyComputed` nous permet d’effectuer des calculs afin de retourner un booléen pour certaines clés qui peuvent être ensuite utilisées dans les templates. Ici par exemple, je vérifie la présence d’un fichier `cover.webp` dans le dossier d’images correspondant au timestamp de l’article en cours, afin de préciser si ledit article possède une image de couverture ou non.
- La spécification de différents paramètres communs à tous les articles, comme le fichier de layout à utiliser, mais surtout trois choses très importantes : les clés `tags`, `category` et `permalink`.

La première clé `tags` nous permet de spécifier le nom d’une collection sur laquelle nous pouvons boucler dans notre fichier de template. Cela peut paraître un peu compliqué au premier abord, mais une fois cette chose mise en place, le gain de temps est considérable. C’est aussi la raison pour laquelle j’ai choisi Nunjucks comme moteur de template : nous pouvons reconstruire la clé à utiliser dans le template en utilisant la locale définie dans le dossier parent. Ainsi, si nous voulons boucler sur les articles dans la locale actuelle, nous pouvons utiliser le code suivant dans notre template :

{% raw %}
```jinja2
{%- for post in collections["posts_" + locale] | reverse -%}
<a href="{{ post.url }}">{{ post.data.title }}</a>
{%- endfor -%}
```
{% endraw %}

Pour rappel, l’utilisation de `post.data.title` va utiliser le front-matter de nos fichiers Markdown d’articles.

La seconde clé `category` elle nous permet de bien s’assurer que nous somme dans la section “blog” du site dans le menu (cf. plus haut).

La troisième clé enfin, `permalink`, permet une génération à la volée d’un permalien unique, composé du titre de l’article, mis en forme avec la dépendance `slugify`.

> **Note :** J’utilise aussi une clé calculée spécifique `eleventyExcludeFromCollections` qui permet de savoir si un article doit apparaître ou non : les articles marqués comme brouillon (avec une clé `draft` à `true` dans le front-matter) sont cachés sauf si nous sommes dans l’environnement de développement. Cela permet de pouvoir prévisualiser les articles en brouillon, tout en les excluant directement de la collection lors du déploiement en production.

### Lier des articles entre eux

Grâce à tout ceci, il est désormais possible de lier des pages entre elles grâce à cette utilisation des clés `locale` et `translationKey`. Par exemple, dans le template qui permet d'afficher un article de blog, voici comment je fais la liaison avec un article rédigé dans les deux langues (Français et Anglais) :

{% raw %}
```jinja2
{%- if locale == 'fr' -%}
    {%- set otherLocale = 'en' -%}
{%- else -%}
    {%- set otherLocale = 'fr' -%}
{%- endif -%}

{%- if translationKey -%}
    {%- for otherPost in collections["posts_" + otherLocale] -%}
        {%- if otherPost.data.translationKey == translationKey -%}
            <p class="is-translation-link noprint">
                <a class="is-lang-switcher" data-lang="en" href="{{ otherPost.url }}">{{ i18n[locale]['postAlsoAvailable'] }}</a>
            </p>
        {%- endif -%}
    {%- endfor -%}
{%- endif -%}
```
{% endraw %}

## Conclusion

Nous pouvons donc désormais utiliser plusieurs langues sur notre site internet. Les traductions des contenus rédactionnels des pages se font directement grâce aux fichiers markdown qui se trouvent dans les dossiers idoines, et les données appartenant au reste du site (UI, boutons & co) sont traduites grâce au dictionnaire du site.

Alors certes, la configuration peut paraître lourde et il aurait été agréable d’avoir un support directement intégré à Eleventy. Mais c’est aussi ce qui fait sa grande force : c’est un générateur de sites statique qui aime mettre le développeur à la barre, et il nous laisse trouver la meilleure solution (ou tout du moins la plus confortable) pour les problèmes que nous pouvons rencontrer.

Dans la prochaine (et peut-être dernière ?) partie de cette série d’articles, nous verrons comment générer une sitemap et un fichier de flux RSS pour nos articles de blog, ainsi que quelques astuces pour se faciliter la vie sur les pages et articles du site.
