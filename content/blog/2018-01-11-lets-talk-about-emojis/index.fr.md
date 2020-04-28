---
title: "Parlons un peu des emojis"
date: 2018-01-11
excerpt: "J'aime les emojis. Pardon, j'❤️ les emojis. Mais qu'en est-il des emojis... dans du code ? Voyons voir si c'est la meilleure ou la pire idée de tous les temps. Parcequ'il faut se rendre à l'évidence, parfois il y a des questions très importantes et il faut se demander si on peut déclarer 🤖 comme nom de variable."
cover:
    author: "Nong Vang"
    link: "https://unsplash.com/@californong"
links:
    devto: "https://dev.to/fbnlsr/lets-talk-about-emojis-2788"
    medium: "https://medium.com/@fbnlsr/lets-talk-about-emojis-d0a07c88b319"
---
Les emojis sont partout. De Twitter à Facebook Chat, ils sont devenus le [Mot de l'Année 2015](http://time.com/4114886/oxford-word-of-the-year-2015-emoji/) pour Oxford, et on a même pu les voir dans un [film épouvantable](https://www.rottentomatoes.com/m/the_emoji_movie). Mais qu'en est-il en dehors des SMS et de la messagerie instantanée ? Quid de l'utilisation des emojis dans les commentaires de code ou même les messages de commit ? Voyons voir comment utiliser au mieux ces petites images marrantes.

Contrairement à ce que peuvent penser les gens, les emojis existent depuis bien longtemps. Le premier emoji date de 1999, et a été créé par Shigetaka Kurita, un employé de la société japonaise de télécommunications NTT Docomo. Tout d'abord utilisé uniquement au Japon, il aura fallu attendre dix ans pour que certains d'entre eux soient ajoutés à l'espace de caractères Unicode. Ainsi, en octobre 2010, le Standard Unicode 6.0 sort officiellement, et avec lui 722 emojis. Ils ne vivent pas dans leur bloc dédié cependant et sont disséminés un peu partout dans les tables Unicode. Il a fallu des années pour que de multiples ingénieurs de Google et Apple arrivent à convaincre le Comité Technique de Unicode de les ajouter. Maintenant, les emojis font partie de la vie de tous les jours.

Il existe même des bizarreries et autres faits marrants autour de ces petites images. Par exemple : les emojis peuvent varier d'une plateforme à une autre. À cause de ceci, l'emoji "calendrier" est représenté pour toujours montrer la date du 17 juillet sur les produits Apple (date représentant l'annonce de iCal en 2002). C'est ainsi que par "erreur", le 17 juillet a été déclaré comme le Jour Mondial de l'Emoji.

Les emojis sont aussi représentés différemment entre les plateformes, et peuvent donc être *interprétés* différemment. Prenez par exemple l'emoji `astonished face`. Le premier est l'interprétation d'Apple, le second celui de Samsung.

![emoji1](emoji1.png)

Celle d'Apple semble plus "sage" que celle de Samsung, vous ne trouvez pas ?

Parfois, c'est le contraire. Dans cet exemple, l'interprétation de Samsung pour la `pouting face` semble moins "énervée" que celle de Twitter.

![emoji2](emoji2.png)

Mais assez d'histoire, parlons de code.

## Les emojis dans les messages de commit

Github a popularisé le support des emojis dans leur écosystème dans un [post de 2012](https://github.com/blog/1289-emoji-autocomplete) grâce à leur fameux raccourci "`:`". Grâce à ce dernier, si vous voulez utiliser l'emoji `fox face` 🦊 quelque part dans Github (un message de commit, une issue ou un gist), vous pouvez simplement utiliser `:fox_face:` à la place et ce sera automatiquement interprété et remplacé.

Utiliser des raccourcis est une solution élégante face au problème des emojis non interprétés. Vous ne courrez pas le risque de casser quelque chose et même s'ils ne sont pas (ou mal) rendus, le message est toujours lisible.

Les emojis peuvent aussi ajouter plus de clarté aux messages de commit. Comparez ces deux séquences :

```markdown
- Fix editing user not being saved to the database
- Cleanup code
- Add the ability to edit a user
- Fix bad function callback on API request
```

&nbsp;

```markdown
- 🐛 Fix editing user not being saved to the database
- 📝 Cleanup code
- ✨ Add the ability to edit a user
- 🐛 Fix bad function callback on API request
```

On peut tout de suite voir où les bugs ont été corrigés et où de nouvelles fonctionnalités ont été ajoutées.

Sur une plateforme qui ne supporte pas les emojis, cela donne ceci :

```markdown
- :bug: Fix editing user not being saved to the database
- :memo: Cleanup code
- :sparkles: Add the ability to edit a user
- :bug: Fix bad function callback on API request
```

Clairement pas aussi fun, mais toujours totalement lisible.

L'industrie s'est appropriée ces raccourcis et est allé [beaucoup plus loin](https://www.webpagefx.com/tools/emoji-cheat-sheet/) que de simples emojis. Bien sûr c'est sympa d'utiliser 🐛 pour parler de la résolution d'un bug, mais essayez d'utiliser `:trollface:` sur Slack ou Redmine. Boom, vous êtes désormais le nouveau mec cool du quartier. Mais attention à ne pas trop les utiliser, vous ne voulez pas être *ce gars*.

**Mon conseil :** N'hésitez pas à utiliser des emojis dans les messages de commit, mais préférez les raccourcis. Je vous suggère aussi de ne pas trop en faire et garder une liste de quelques un pour noter les actions majeures (résolution de bug, fonctionnalité, style, nettoyage de code, etc...).

Si vous ne savez pas par où commencer ou voulez suggérer une ligne à suivre à votre équipe, je recommande chaudement le [Gitmoji](https://gitmoji.carloscuesta.me/) de Carlos Cuesta. Il existe même une ligne de commande très pratique (simplement appelée [`gitmoji-cli`](https://github.com/carloscuesta/gitmoji-cli)) qui vous aidera à écrire vos messages de commit par le biais d'une interface interactive. Gitmoji est même utilisé dans la [ligne directrice de contribution](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages) d'Atom.

## Les emojis dans du code

Techniquement, vous *pourriez* utiliser des emojis dans du code informatique, mais vous devez faire très attention. Les emojis sont interprétés comme des chaînes de caractères en Javascript, mais leur longueur peut varier.

```javascript
"🐼".length         // retourne 2
"🇨🇦".length         // retourne 4
```

Il ne faut pas oublier que les emojis peuvent être connectés (un peu à la manière des ligatures de Fira Code que certains apprécient tant). C'est de cette manière que vous pouvez avoir des modificateurs de couleur de peau (appelés `EMOJI MODIFIER FITZPATRICK TYPE-1`, `-2`, `-3`, `-4`, `-5` et `-6`. Je ne plaisante pas). Ou même mieux, si vous combinez les emojis 👨, 👩 et 👧 vous obtenez une famille complète 👨‍👩‍👧 ! Voyons celui-ci dans Javascript.

```javascript
"👨‍👩‍👧".length         // retourne 5
```

Pourquoi 5 ? Car non seulement vous obtenez la longueur de chacun des symboles dont cet emoji est fait, mais il utilise aussi deux `ZWJ` (Zero Width Joiner) comme "colle". Vous pouvez voir ceci en action : copiez/collez cet emoji dans VS Code par exemple, et il vous faudra cinq fois la touche "flèche" pour le traverser.

**Mon conseil :** N'utilisez pas d'emoji dans du code, tout simplement. Mais vous pouvez toujours les utiliser dans vos vues. Les navigateurs web ont de très bonnes capacités en ce qui concerne les emojis, et savent comment basculer vers une police qui *va* afficher votre icône "pouce levé". Mais attention lors de l'utilisation de raccourcis dans des interprètes de code dans ces vues, en particulier si vous affichez des blocs de code sur votre site. Cela peut vous jouer des tours et par exemple interpréter `h:m:s` comme `hⓂ️️s`, ce qui rend le bloc inutile.

## Les emojis dans les commentaires

Qu'en est-il donc des commentaires de code ? Mettez des emojis partout ! Autant que je sache, vous n'êtes pas susceptible de casser quelque chose en les utilisant dans les commentaires. Les éditeurs de code modernes (Atom, VS Code, Sublime, Intellij...) ont un très bon support des emojis. Ils peuvent même se rendre très utiles pour faire ressortir quelque chose.

```javascript
/**
 * WARNING: Do NOT change this file.
 */
```

Comparé avec :

```javascript
/*
 * 🛑 WARNING: Do NOT change this file.
 */
```

## Conclusion

Les emojis sont comme une épée à double tranchant. Ils nous permettent d'exprimer des sentiments complexes de manière rapide et fun. Ils sont l'extension naturelle des emoticônes que nous utilisions à l'époque faste d'IRC. Ils peuvent être utilisés comme décorateurs, ajoutant un sentiment à une phrase qui peut paraître fade au premier abord. Ils peuvent aussi être utilisés comme marqueurs pour faire ressortir quelque chose, et même devenir un outil de communication à part entière lorsqu'ils sont utilisés seuls.

Ceci étant dit, étant donné qu'ils ne sont pas dessinés et interprétés de manière uniforme à travers les plateformes, ils peuvent être source de mésentente. La communication repose sur la stabilité de ses moyens de propagation. Si un symbole change entre l'émetteur et le destinataire, le message n'est plus le même. En tant que caractères, ils doivent aussi être mis dans leur contexte. C'est pour cela que certains ont du être changés. Par exemple l'emoji `:gun:` 🔫 qui était représenté par un vrai pistolet est maintenant un pistolet à eau.

En ce qui concerne le code par contre, je suis pour l'utilisation des emojis. Pas dans le code lui même, comme je l'ai dit plus haut, mais plutôt dans les commentaires et les messages de commit. Ils embellissent le message auquel ils sont rattachés, lorsqu'ils sont utilisés comme pointeurs. Et grâce aux raccourcis, vous pouvez les utiliser sans craindre de casser quoi que ce soit.

Si vous voulez en savoir plus sur les emojis, je vous conseille les travaux de [Monica Dinculescu](https://meowni.ca/), et en particulier ses présentations.

Je recommande aussi le billet d'Angela Guzman sur la [création des emojis d'Apple](https://medium.com/@agzmn/the-making-of-apples-emoji-how-designing-these-tiny-icons-changed-my-life-16317250a9ee). Angela écrit comment elle et son mentor Raymond on designé plus de 500 emojis pendant son stage en 2008. Cela a changé sa vie, et son travail est maintenant dans les mains de millions de gens.

Alors allez-y et utilisez des emojis partout ! Vous améliorerez la lecture de votre travail et casserez avec la monotonie d'un écran fade rempli de lignes de code. 😄
