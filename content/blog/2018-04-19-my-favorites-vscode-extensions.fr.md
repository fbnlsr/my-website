---
title: 10 extensions indispensable pour VS Code
date: 2018-04-19
cover:
    image: pankaj-patel-516482.jpg
    author: Panjak patel
    link: "https://unsplash.com/photos/yEAOfWSdzgM"
menu: blog
links:
    devto: "https://dev.to/fbnlsr/10-essential-extensions-for-vscode-174i"
    medium: "https://medium.com/@fbnlsr/10-essential-extensions-for-vs-code-fdfa17f4f66c"
---
J'utilise [Visual Studio Code](https://code.visualstudio.com/) comme principal éditeur de code depuis plus de deux ans maintenant. J'avais pour habitude de travailler sous Sublime Text, qui est formidable (surtout venant de Notepad++). Mais il faut reconnaître que Microsoft fourni un travail énorme pour faire de son éditeur le meilleur qui soit, et les mises à jour mensuelles montrent à quel point ils sont dédiés à la tâche.

C'est donc mon éditeur de choix, mais un bon éditeur ne serait rien sans de bonnes extensions. J'ai compilé une liste des 10 extensions (et un peu plus) sans lesquelles je ne pourrais pas vivre. Elles me facilitent le travail et me permettent de gagner tellement de temps sur le long terme. Les voici (sans ordre spécial) :

**[Color Info](https://marketplace.visualstudio.com/items?itemName=bierner.color-info)**

VS Code fournit une petite boîte de pré-visualisation pour les couleurs dans les fichiers CSS. Color Info permet d'avoir une bien meilleure vue de la couleur sur laquelle votre souris s'arrête, avec plein d'infos pratiques comme les valeurs CMJN ou Alpha. Elle peut même être utilisée comme color picker, ce qui est tout aussi pratique.

![Color Info](/img/posts/color-infos.png)

**[:emojisense:](https://marketplace.visualstudio.com/items?itemName=bierner.emojisense)**

Vous savez que [j'adore les emojis](/fr/blog/parlons-un-peu-des-emojis/). Cette extensions permet d'insérer directement des emojis ou des shortcodes dans vos fichiers. Par exemple, imaginons que je veuille insérer l'emoji joystick. Il suffit de commencer à taper `:joy` et une fenêtre d'auto-complétion apparaît qui permet d'insérer directement 🕹 la bonne icône. Si vous tapez `::joy` cela permet d'insérer `:joystick:` avec une pré-visualisation de l'emoji concerné. C'est parfait !

**[Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)**

Comme son nom l'indique, cette extension simple montre le résultat du `git blame` de la ligne active dans la barre de statut.

![Git Blame](/img/posts/git-blame.gif)

**[Markdown All In One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)**

J'adore Markdown. En fait ce site fait grand usage de ce format car il est compilé avec Hugo. Cette extension permet d'écrire du Markdown en ajoutant des raccourcis pratiques comme `Cmd + B` pour mettre un texte en gras, `Cmd + I` pour les italiques, et ainsi de suite. Très pratique !

**[Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)**

Si comme moi vous travaillez sur plusieurs machines (parfois virtuelles), cette extension est formidable ! Elle permet d'utiliser un Gist Github pour synchroniser tous les paramètres et les extensions de votre éditeur.

**[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)**

Comme son nom l'indique, elle surligne les TODOs, FIXMEs et autres mot-clés que vous configurez. Écrivez juste `TODO:` quelque part et non seulement il sera surligné, mais l'extension va aussi lister tous les mot-clés déjà écrits n'importe où dans votre projet.

![Todo Highlight](/img/posts/todo-highlight.png)

**[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)**

Cette extension est un véritable couteau suisse pour Vue. De l'auto-complétion aux snippets, c'est un "must-have" pour tout développeur front.

**[Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright)**

Un correcteur orthographique multi-langue, offline et "léger". Spell Right utilise le dictionnaire intégré à votre machine pour trouver les erreurs de frappe, et peut vérifier n'importe quel (et même plusieurs à la fois) langage n'importe où dans votre projet. Attention cependant avec les gros fichiers, cela peut prendre un peu de temps pour faire la vérification. Je l'ai désactivé par défaut. C'est très facile de lui demander de faire une correction orthographique : il suffit de cliquer sur une petite icône dans la barre des tâches.

**[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)**

Étrangement, VS Code ne supporte pas [EditorConfig](http://editorconfig.org/) par défaut. Installez simplement cette application et il va automatiquement commencer à surveiller tous les fichiers `.editorconfig` qu'il rencontre.

**[Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)**

En voici une que j'utilise constamment ! Bookmarks est une extension qui ajoute de petits marque-pages dans la gouttière de votre éditeur. C'est très pratique lorsqu'on veut basculer rapidement de position au sein d'un même fichier, ou si l'on doit se faire un petit rappel n'importe où dans un projet. J'ai configuré le mien avec les raccourcis `shift + cmd + =` (ajouter/supprimer un marque-page) et `shift + cmd + -` (marque-page suivant) et grâce à cela je peux sauter dans mes fichiers sans quitter le confort de mon clavier. Cette extension ajoute aussi un petit panneau sous l'explorateurs de fichier de VS Code qui liste tous les marque-pages actifs du projet actuel. À avoir absolument.

![Bookmarks](/img/posts/bookmarks.png)

## Mentions spéciales

**[AutoFileName](https://marketplace.visualstudio.com/items?itemName=JerryHong.autofilename)**

Cette extension est plutôt basique. Tapez simplement le début du nom d'un fichier/dossier et elle va le compléter pour vous. C'est très pratique quand on doit pointer vers un fichier perdu dans les méandres de `node_modules`.

**[cdnjs](https://marketplace.visualstudio.com/items?itemName=JakeWilson.vscode-cdnjs)**

La plupart du temps je gère mes injections de dépendance Javascript avec Webpack. Mais lorsque j'ai besoin de faire un mockup rapide, cette extension me fait gagner un temps fou. En utilisant la palette de commandes, vous pouvez insérer l'URL ou les balises script/style de toutes les librairies hébergées chez cdnjs. Très pratique.

![cdnjs](/img/posts/cdnjs.gif)

**Vous avez une suggestion ?**

Voici donc quelques extensions que j'utilise tous les jours. Si vous en avez une que je devrais tester, n'hésitez pas à laisser un commentaire ou [envoyez-moi un tweet](https://twitter.com/fbnlsr) !
