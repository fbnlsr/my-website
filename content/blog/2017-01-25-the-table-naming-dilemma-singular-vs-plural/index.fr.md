---
title: "Nommer ses tables : singulier vs. pluriel"
date: 2017-01-25
excerpt: "Avez-vous déjà passé beaucoup trop de temps à réfléchir comment nommer vos tables ? Dans ce billet j'essaie de trouver la solution à ce problème épineux."
cover:
    author: "Eli Francis"
    link: "https://unsplash.com/@elifrancis"
---
L'autre jour, pendant un poker planning, la question du nommage d'une table a été posée. Pendant la conversation, un de nos dévelopeurs a suggéré que la table devait avoir un nom au singulier, pendant que d'autres pensaient que toutes les tables devaient être au pluriel. Cela m'a amené à poser la question : Y'a-t-il un choix meilleur qu'un autre ? Est-ce-que les tables doivent être au singulier ou au pluriel ?

Il est intéressant de voir que malgré le fait qu'il n'y a pas de convention claire sur ce sujet, c'est une question qui est posée assez souvent, et elle est la source de grands débats dans le monde des bases de données.

## Utiliser le pluriel

Narayana "Vyas" Kondreddi (un ingénieur SQL et Architecte de bases de données réputé) écrivait en 2001 :

> Les tables représentent les instances d'une entité. Par exemple, vous stockez toutes les informations de vos clients dans une table. Ici, un "client" est une entité et toutes les lignes dans la table clients représentent les instances de cette entité "client". Ainsi, pourquoi ne pas nommer votre table en utilisant l'entité qu'elle représente, le "client" ? Étant donné qu'elle stocke "plusieurs instances" des clients, utilisez le pluriel pour le nom de votre table.

Cela semble logique, et quelque peu "naturel". Vous stockez plusieurs clients dans une seule table (ces "instances multiples"), donc la table devrait être naturellement nommée `clients`. Cela a du sens aussi lorsque l'on écrit une commande SQL. Lorsque vous voulez naviguer à travers tous vos clients, vous utilisez `SELECT * FROM clients`...

En utilisant un nom au pluriel, on peut considérer la table comme une caisse contenant plusieurs objets. Une caisse de pommes devrait être étiquetée *Pommes*, qu'elle en contienne une seule ou une centaine.

## Utiliser le singulier

Les gens qui plébiscitent l'utilisation du singulier prennent souvent l'exemple que lorsqu'on pointe sur un enregistrement en base, cela semble souvent déroutant d'utiliser un mot au pluriel pour décrire un objet unique. Ainsi, pourquoi utiliser `clients.name` lorsqu'on pointe vers un seul client ?

Cela est d'autant plus mis en avant lors de l'écriture de commandes SQL, qui apparaissent alors plus naturelles pour certains. Par exemple, `SELECT activity.name` a plus de sens que `SELECT activities.name`.

Cela permet aussi d'éviter la confusion d'une pluralisation  anglaise qui peut parfois ne pas être évidente pour les personnes ne parlant pas courament la langue de Shakespeare. Par exemple, *activity* devient *activities* où *person* devient *people* et *data* reste *data*...

En utilisant le singulier, on peut aussi considérer la "théorie de l'ensemble", qui dit que chaque instance de cet ensemble en est représentante, donc une table `pomme` est l'ensemble Pomme. Elle est agnostique au nombre de pommes qu'il y a dans l'ensemble.

## Que devez-vous utiliser ?

Je pense personellement qu'une table de base de données est la représentation d'une collection d'objets. À ce titre, elle doit être nommée en utilisant le pluriel, étant donné qu'elle stocke plusieurs copies de cette entité. Ainsi, chaque `user` est stocké dans la table `users`.

La seule chose qui aurait pu me faire considérer l'utilisation du singulier est l'argument des commandes SQL, car cela semble moins naturel d'utiliser un nom pluriel pour une requête sur un seul objet. Si cela vous dérange tellement, vous pouvez utiliser cette astuce pour contourner le problème :

```SQL
SELECT id, name, description FROM products product WHERE product.name = 'foo' AND product.description = 'bar'
```

C'est même plus pratique lorsqu'on a affaire à une pluralisation complexe :

```SQL
SELECT id, name, description FROM activities activity WHERE activity.name = 'foo' AND activity.description = 'bar'
```

Et si vous êtes vraiment préoccupé à l'écriture d'un code propre qui ressemble à de l'anglais, mon conseil est d'utiliser le pluriel pour les noms des tables, mais le singulier pour leurs entités correspondantes. Ainsi pour une déclaration d'entité dans Symfony vous pouvez utiliser :

```php
/**
 * @Activity
 *
 * @ORM\Table(name="activities")
 */
class Activity
{
...
}
```

La table `activities` stocke toutes les instances d'un possible object `Activity`. Ainsi, lors de l'invocation et de l'interraction avec cet objet, cela a du sens d'utiliser la syntaxe `$activity = new Activity()` et `$activity->setName("foo")`.

## En résumé

Si je devais résumer à un conseil cependant, ce serait ceci : **soyez consistants**. Restez sur le choix que vous avez décidé, et appliquez-le durant tout le projet. Utilisez ce qui vous semble le plus naturel pour vous et votre équipe. Avoir la possibilité de se reposer sur une convention est souvent une bonne chose, mais parfois ce n'est pas suffisant. Ce qui est le plus important est de faire un choix clair et de l'adopter. Bien sûr, il est aussi important de garder une oreille attentive aux arguments que d'autres pourraient vous fournir.

Si vous cherchez encore des conseils, voici quelques astuces qui pourront vous aider lors du choix d'un nom de table :

- Utilisez des noms courts pour vos tables
- Utilisez des underscores pour séparer les mots (ni espaces, ni camelCase). Par ex : `product_dimensions`
- Essayez d'être un tant soit peu descriptif : une table doit toujours représenter son contenu. Il est plus facile de lire `client_bills` que `clb`
- Utilisez des noms uniques qui ne font pas de collision avec les mots réservés par SQL/SGBD (évitez `name`, `order`, `percent`...)
- N'utilisez pas le nom de la table suivi par "id" (ex : `clients_id`) comme clé primaire. `id` est largement suffisant et tout le monde comprendra
- Utilisez `id` et non `ID`
- D'ailleurs, n'utilisez jamais de lettre capitale dans le nom de vos tables. Jamais.

---

Sources :

- [http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names](http://stackoverflow.com/questions/338156/table-naming-dilemma-singular-vs-plural-names)
- [http://stackoverflow.com/questions/7899200/is-there-a-naming-convention-for-mysql](http://stackoverflow.com/questions/7899200/is-there-a-naming-convention-for-mysql)
- [http://vyaskn.tripod.com/object_naming.htm#Tables](http://vyaskn.tripod.com/object_naming.htm#Tables)
- [https://justinsomnia.org/2003/04/essential-database-naming-conventions-and-style/](https://justinsomnia.org/2003/04/essential-database-naming-conventions-and-style/)
