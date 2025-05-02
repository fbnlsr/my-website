---
title: "Containerized Symfony & Vue.js environment with DDEV"
date: 2025-04-29
translationKey: "blogPhpNodeDdev"
excerpt: "In this article, I describe how I set up a PHP & Node development environment using DDEV. It provides a fully containerized environment, allowing for a TypeScript frontend to make calls to a PHP backend, in this case a Vue.js app with a Symfony API."
cover:
  author: "Samuel Sianipar"
  link: "https://unsplash.com/@samthewam24"
---

For the past year or so, [DDEV](https://ddev.com/) has been my go-to tool for setting up a development environment. With a simple
`.yaml` file, this nifty tool is capable of providing a containerized workbench with PHP, a MariaDB/PostreSQL database, and Mailpit. It's perfect for anything from WordPress to the most complex Symfony app. However, out of the box it's not tailored to be used alongside Node. Granted, it does come bundled with Node pre-installed, but if you want to use your PHP backend with a TypeScript frontend, it requires a tiny bit of configuration. This is what this article is about. It is inspired by Andy Blum's blog post over at [Lullabot](https://www.lullabot.com/articles/nodejs-development-ddev). My approach is similar but a bit simpler.

---

My web stack of choice is Symfony as an API (either RESTful or using GraphQL) and a frontend using Vue.js. I used to rely on [NVM](https://github.com/nvm-sh/nvm) or [Volta](https://volta.sh/) and make use of my locally installed Node instance, but I wanted to have something completely portable - something where I could just clone a repo, run
`ddev start` and get to work. To achieve that, we're going to set things up as follows:

- Set up the PHP container and Symfony
- Freeze the Node version and install Vue.js
- Add a reverse proxy to access the frontend
- Enhance the DX thanks to a Makefile

For this project, we're going to use a made-up domain - let's say `tinydev.ddev.site` - and have the API available at
`api.tinydev.ddev.site` and the web app at
`app.tinydev.ddev.site`. I'm going to assume you already have Docker and [DDEV installed](https://ddev.com/get-started/) and ready to use.

To keep things tidy, we'll use the following folder structure:

```conf
/.ddev
 - config.yaml
/backend
 - Symfony files...
/webapp
 - Vue.js files...
```

The `/.ddev` folder will contain its configuration file (`config.yaml`), with the Symfony API inside
`/backend` and our frontend inside `/webapp`.

## Setting up the Symfony app

Let's begin by using `ddev config` to initialize the project, selecting
`symfony` as the application type. The docroot for our project will be `backend/public`.

Once configured, open `/.ddev/config.yaml` and add the additional host names (`api.tinydev` and
`app.tinydev`). The configuration file should look like this:

```yaml
name: tinydev
type: symfony
docroot: backend/public
php_version: '8.3'
webserver_type: nginx-fpm
xdebug_enabled: false
additional_hostnames: [ 'api.tinydev', 'app.tinydev' ]
additional_fqdns: [ ]
database:
  type: mariadb
  version: '10.11'
use_dns_when_possible: true
composer_version: '2'
web_environment: [ ]
corepack_enable: false
```

Start DDEV with `ddev start`, then enter the web container using
`ddev ssh`. We'll [install Symfony](https://symfony.com/doc/current/setup.html) in the
`backend` directory (at this time of writing the latest version of Symfony is 7.2). We'll have to delete the
`backend` directory first so that Composer can generate the project.

```bash
> rm -rf backend && composer create-project symfony/skeleton:"7.2.x" backend
```

Once installed, create a simple controller to test everything is working as it should:

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

You can go ahead and point your web browser to
`https://tinydev.ddev.site` and you should be greeted with a "Hello, World!" message. If not, don't hesitate to restart DDEV with
`ddev restart`.

At this point, `https://app.tinydev.ddev.site` is also pointing to Symfony. Let's take care of that.

## Freeze Node's version and install Vue.js

By default, DDEV comes bundled with Node v22. Let's freeze that so we don't have any bad surprises during our development phase. This can be done very simply inside
`/.ddev/config.yaml`

```yaml
nodejs_version: '22'
```

Go ahead and restart DDEV (`ddev restart`) and enter your web container with `ddev ssh`. We'll now install Vue.js in the
`webapp` directory:

```bash
> npm create vue@latest
```

You can choose the flavor you're most familiar with, but the important thing is to specify
`webapp` as your project's name, as this will be the directory used to install the Vue.js app. Then you can install the app itself:

```bash
> cd webapp && npm install
```

Let's point our browser to
`https://app.tinydev.ddev.site` and get... nothing? That's expected. The app is installed, but it's not accessible yet.

## Add a reverse proxy to access the frontend

To address this issue, let's add an nginx config file in `/.ddev/nginx_full/app.tinydev.conf`:

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

We'll also have to edit `vite.config.ts` to allow for this new hostname:

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

Let's now restart DDEV (`ddev restart`) once more, then hop into the container (`ddev ssh`) and run
`npm run dev` inside the `/webapp` directory. Don't forget to run `npm install` if you haven't already.

If you now point your browser to `https://app.tinydev.ddev.site`, you should see Vite's default project page.

We now have a working project using Symfony and Vue.js entirely containerized thanks to DDEV! Yay! :tada:

You can now enjoy your web app on `https://app.tinydev.ddev.site`, and send calls to your API that's residing on
`https://api.tinydev.ddev.site`.

Let's finally add a bit of magic and enhance our Developer Experience thanks to a simple Makefile.

## Enhance the DX thanks to a Makefile

Having to enter the container to start Vite's web server can get tedious. The same goes for simple Symfony tasks like creating a migration or even emptying the cache, we'd have to change directories and tinker with
`php bin/console` commands. Fortunately, we can use a Makefile as a development toolbox with handy shortcuts:

**Important:** Make sure to use tabs (not spaces) for indentation!

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

Keep in mind that you may still want to use `ddev ssh` for running Composer, as DDEV executes the
`ddev composer` command at the project root by default.

So there you have it! A simple, portable development environment you can use anywhere and share with others.

**Happy coding!**
