---
title: "Une stack Symfony & Vue.js conteneurisée avec DDEV"
date: 2025-04-29
translationKey: "blogPhpNodeDdev"
excerpt: "Dans cet article, je décris comment je mets en place un environnement de développement PHP & Node avec DDEV. Il fournit un environnement entièrement conteneurisé, permettant à un frontend TypeScript d'effectuer des appels à un backend PHP, dans ce cas une application Vue.js avec une API Symfony."
cover:
  author: "Samuel Sianipar"
  link: "https://unsplash.com/@samthewam24"
---

Depuis trois ans environ, j'utilise [DDEV](https://ddev.com/) dès que j'ai besoin de mettre en place un environnement de développement. Grâce à un simple fichier
`.yaml`, cet outil très pratique est capable de fournir un espace de travail en conteneur avec PHP, une base de données MariaDB/PostreSQL, et Mailpit. C'est parfait pour des projets de toute taille, du simple site vitrine WordPress à l'application Symfony la plus complexe. Cependant, il n'est pas vraiment conçu pour être utilisé avec Node par défaut. Tout du moins, même s'il embarque Node de base, si vous souhaitez utiliser un backend PHP avec un frontend en TypeScript, cela demande un peu de configuration, comme nous allons le voir dans cet article. Il est inspiré de celui d'Andy Blum sur le blog de [Lullabot](https://www.lullabot.com/articles/nodejs-development-ddev). Mon approche est similaire, mais simplifiée.

---

Ma stack web de prédilection est Symfony en mode API (soit en RESTful ou avec GraphQL) et un frontend qui utilise Vue.js. J'utilisais auparavant [NVM](https://github.com/nvm-sh/nvm) ou [Volta](https://volta.sh/) avec une version de Node installée localement, mais je désirais quelque chose de totalement portable - quelque chose où je peux simplement cloner un dépôt, lancer
`ddev start` et me mettre au travail. Pour cela, nous allons suivre les étapes suivantes :

- Mettre en place le conteneur PHP et Symfony
- Geler la version de Node et installer Vue.js
- Ajouter un reverse proxy pour accéder au frontend
- Améliorer la DX grâce à un Makefile

Pour ce projet, nous allons utiliser un domaine fictif - disons `tinydev.ddev.site` - et avoir l'API sur
`api.tinydev.ddev.site` et l'app web sur
`app.tinydev.ddev.site`. Je pars du principe que vous avez déjà Docker et [DDEV installé](https://ddev.com/get-started/) et prêt à l'emploi.

Pour que les choses soient bien rangées, nous allons utiliser la structure de dossier suivante :

```conf
/.ddev
 - config.yaml
/backend
 - Le projet Symfony...
/webapp
 - Le projet Vue.js...
```

Le dossier `.ddev` va contenir le fichier de configuration de DDEV (`config.yaml`), l'API Symfony sera dans
`/backend` et l'app front sera dans `/webapp`.

## Mise en place de l'app Symfony

Commençons par initialiser le projet grâce à `ddev config`, en prenant soin de sélectionner
`symfony` comme type d'application. Le docroot pour notre projet sera `backend/public`.

Une fois configuré, ouvrez `/.ddev/config.yaml` et ajoutez les hosts additionels (`api.tinydev` et
`app.tinydev`). Le fichier de configuration devrait ressembler à ceci :

```yaml
name: tinydev
type: symfony
docroot: backend/public
php_version: '8.3'
webserver_type: nginx-fpm
xdebug_enabled: false
additional_hostnames: ['api.tinydev', 'app.tinydev']
additional_fqdns: []
database:
  type: mariadb
  version: '10.11'
use_dns_when_possible: true
composer_version: '2'
web_environment: []
corepack_enable: false
```

Démarrez DDEV avec `ddev start`, et entrez dans le conteneur grâce à
`ddev ssh`. Nous allons [installer Symfony](https://symfony.com/doc/current/setup.html) dans le dossier
`backend` (au moment où j'écris ces lignes la dernière version de Symfony est la 7.2). Nous allons devoir effacer le dossier
`backend` pour que Composer puisse l'initialiser correctement.

```bash
> rm -rf backend && composer create-project symfony/skeleton:"7.2.x" backend
```

Une fois installé, créez un contrôleur simple pour vérifier que tout fonctionne correctement :

```php
<?php
// /backend/src/Controller/HomeController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/')]
    public function index()
    {
        return new Response("Hello, World!");
    }
}
```

Vous pouvez naviguer à l'adresse
`https://tinydev.ddev.site` et vous devriez voir le message « Hello, World! ». Si ce n'est pas le cas, n'hésitez pas à redémarrer DDEV avec
`ddev restart`.

À ce moment,
`https://api.tinydev.ddev.site` pointe toujours vers l'application Symfony. Nous allons régler cela tout de suite.

## Geler la version de Node et installer Vue.js

Par défaut, DDEV embarque Node v22. Nous allons geler cette version pour éviter les mauvaises surprises pendant la phase de développement. Cela peut être fait très facilement dans
`/.ddev/config.yaml`

```yaml
nodejs_version: '22'
```

Redémarrez DDEV (`ddev restart`) et entrez dans le conteneur avec
`ddev ssh`. Nous allons maintenant installer Vue.js dans le dossier `webapp` :

```bash
> npm create vue@latest
```

Choisissez les options qui vous conviennent, mais spécifiez
`webapp` comme nom de projet, car c'est ce nom qui sera utilisé comme dossier de destination pour les fichiers de l'app Vue.js. Vous pouvez ensuite installer l'application elle-même :

```bash
> cd webapp && npm install
```

Naviguons maintenant vers
`https://app.tinydev.ddev.site` pour voir... rien ? C'est normal. L'app est installée, mais elle n'est pas encore accessible.

## Ajouter un reverse proxy pour accéder au frontend

Pour solutioner ce problème, nous allons ajouter un fichier de configuration nginx dans
`/.ddev/nginx_full/app.tinydev.conf`:

```conf
server {

    server_name app.tinydev.ddev.site;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
    listen 443 ssl;

    ssl_certificate /etc/ssl/certs/master.crt;
    ssl_certificate_key /etc/ssl/certs/master.key;

    include /etc/nginx/monitoring.conf;

    error_log /dev/stdout info;
    access_log /var/log/nginx/access.log;

    include /etc/nginx/common.d/*.conf;
    include /mnt/ddev_config/nginx/*.conf;
}
```

Nous devons aussi éditer `vite.config.ts` pour autoriser ce nouvel hôte :

```ts
// /webapp/vite.config.ts
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  server: {
    allowedHosts: ['app.tinydev.ddev.site'],
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

Redémarrez DDEV à nouveau (`ddev restart`), allez dans le conteneur (`ddev ssh`), et lancez
`npm run dev` dans le dossier `/webapp`. N'oubliez pas d'exécuter `npm install` si cela n'est pas déjà fait.

Si vous naviguez désormais sur
`https://app.tinydev.ddev.site`, vous devriez voir la page de présentation par défaut d'un nouveau projet Vite.

Vous avez désormais un projet utilisant Symfony et Vue.js, et entièrement conteneurisé grâce à DDEV ! Félicitations ! :tada:

Vous pouvez maintenant accéder à votre web app sur
`https://app.tinydev.ddev.site`, en effectuant des appels à votre API qui se trouve sur `https://api.tinydev.ddev.site`.

Finissons ce tutoriel en ajoutant un peu de magie pour améliorer notre DX grâce à un simple fichier Makefile.

## Améliorer la DX grâce à un Makefile

Devoir entrer dans le conteneur à chaque fois que nous voulons lancer le serveur web Vite peut rapidement devenir contraignant. De même, il serait bien plus pratique de ne pas avoir à le faire dès que nous voulons lancer des commandes symfony comme lancer une migration ou vider le cache. Heureusement, nous pouvons nous faciliter la tâche avec un Makefile et des raccourcis très pratiques :

**Important :** Pensez à utiliser des tabs (et non des espaces) pour l'indentation de votre fichier !

```makefile
# /Makefile

WEBAPP_FOLDER=/var/www/html/webapp
API_FOLDER=/var/www/html/backend

start:
	ddev start

stop:
	ddev stop

up: start
	ddev exec --dir $(WEBAPP_FOLDER) npm run dev

cache-clear:
	ddev exec --dir $(API_FOLDER) php bin/console cache:clear

cc: cache-clear

migration:
    ddev exec --dir $(API_FOLDER) php bin/console make:migration
```

Gardez à l'esprit que vous devrez tout de même utiliser `ddev ssh` pour exécuter des commandes Composer, car
`ddev composer` s'exécute à la racine du projet par défaut.

Et voilà ! Un environnement de développement simple et portable que vous pouvez utiliser n'importe où et partager avec d'autres.

**Codez bien !**
