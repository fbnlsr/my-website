---
title: "Gitlab a crashé, à qui la faute ?"
date: 2017-02-02
excerpt: "Quelque part, un administrateur système sue à grosse gouttes après avoir détruit une grosse partie des données de production de GitLab. Mais est-il vraiment responsable ?"
---
La nuit dernière, un "admin système fatigué" a supprimé un dossier sur le mauvais serveur de la plateforme d'hébergement de code Gitlab, effaçant plus de 300 GB de données. Suite à cet incident, le site internet a été coupé pendant la manoeuvre de restauration. La blague : "aucune [de leur] technique de sauvegarde / réplication ne fonctionnait correctement ou était active à la base." Il leur a fallu une journée entière pour réparer les dommages, laissant des milliers de devs échoués, et perdant 6 heures de données.

Sur Twitter, Gitlab a posté le message le plus formidable et rageant que n'importe quel admin système peut poster dans sa carrière :

> We accidentally deleted production data and might have to restore from backup.

Pour être honnête, il ne peut pas y avoir de catastrophe plus désastreuse pouvant arriver à une société donc le fond de commerce repose sur la donnée. L'équipe avec laquelle je travaille actuellement utilise Gitlab depuis plusieurs mois, et nous avons déjà à souffrir de leurs temps d'arrêt régulier. À un moment, Gitlab.com pouvait se retrouver hors ligne trois à cinq fois par jour. Nous étions ravis d'apprendre qu'ils cherchaient à [quitter le cloud](https://about.gitlab.com/2016/12/11/proposed-server-purchase-for-gitlab-com/), pour apprendre seulement qu'au final ils vont étendre leur cloud initial.

Comme l'utilisateur *connorshea* le précise sur Hacker News :

> Ce n'est jamais la faute d'une personne, toujours d'un système.

Cela pourrait être appliqué à GitLab. C'est formidable que pour de tâches aussi critiques (on ne supprime pas une base de données entière tous les jours), ils n'utilisent pas de système de gestion aussi simple et efficace que des listes de contrôle. Elles sont utilisées autour du monde dès qu'un système encours un risque. Les pilotes de ligne, les chirurgiens et les infirmières, les militaires, tous ont des listes de contrôle. C'est la raison pour laquelle on voit les pilotes de ligne parler durant une procédure d'urgence, leur co-pilote confirmant tout ce qu'ils font. Cela se passe le plus souvent comme ceci :

> – "Je vais couper la clim.
>
> – OK pour couper la clim.
>
> – La clim est coupée.
>
> – Confirmé. La clim est coupée".

C'est grandement exagéré et la dernière fois que j'ai piloté un avion c'était... euh, jamais. Mais vous voyez ce que je veux dire. Chacune des étapes est surveillée et confirmée par un coéquipier. Si vous voulez en savoir plus vous pouvez lire cet article Wikipedia sur la [gestion des ressources d'équipe](https://en.wikipedia.org/wiki/Crew_resource_management).

Gitlab a choisi la politique de la transparence totale, allant jusqu'à diffuser en direct leur procédure de sauvegarde. Beaucoup les félicitent d'avoir pris une telle position, mais ils pouvaient difficilement en prendre une autre, car il y existe une possibilité non  négligeable d'un échec insurmontable.

Au final, la vraie question n'est pas vraiment de savoir "à *qui* la faute", mais plutôt "à *quoi* la faute ?" Une mauvaise pratique, un manque de préparation et la frustration d'un ingénieur fatigué font un mauvais cocktail. Je suis persuadé que Gitlab va grandir de ses erreurs. Je suis moins sûr quant à leur gestion de crise et sur le fait qu'ils perdent des clients chaque minute, mais bon on ne peut pas leur reprocher de vouloir sauver les meubles.

En souvenir de ce jour, [@CyberShambles](https://twitter.com/CyberShambles) a dédié le 1 février à la [journée de la sauvegarde](http://checkyourbackups.work/). Pas mal.

---
Source: [https://www.theregister.co.uk/2017/02/01/gitlab_data_loss/](https://www.theregister.co.uk/2017/02/01/gitlab_data_loss/)
