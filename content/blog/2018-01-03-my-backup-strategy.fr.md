---
title: Ma stratégie de sauvegarde
date: 2018-01-03
menu: blog
cover:
    image: "/img/posts/patryk-gradys-128898.jpg"
    author: Patryk Grądys
    link: https://unsplash.com/@patrykgradyscom
links:
    devto: https://dev.to/fbnlsr/my-backup-strategy-4gi7
    medium:
---
Dans ce billet je parle de ma stratégie de backup actuelle, et comment une catastrophe irreversible m'a appris à être très méfiant quant à la protection de mes souvenirs numériques.

<!--more-->

La protection des données numériques est une industrie pesant plusieurs millions de dollars. Qu'il s'agisse de données à portée militaire, scientifique ou financière, chacune de ces industries doit se préparer en cas de perte, et planifier leur sécurité. Elles déploient parfois des mesures extrêmes, allant jusqu'à avoir leur propre (et double) lignes électriques dédiées. Mais qu'en est-il des photos du dernier barbecue de votre ami ? Ou la vidéo des premiers pas de votre petit dernier ? Voici comment j'ai appris ma leçon suite à une défaillance tragique d'un système et ce à quoi mon équipement actuel ressemble.

## Une défaillance catastrophique

En 2008, je me suis fabriqué un NAS (**Network Attached Storage**) fait sur mesure à partir de vieilles pièces informatiques, un tas de disques durs de 500 GB et une copie de **FreeNAS**. L'OS tournait sur une petite mémoire flash montée sur IDE, et l'assortiment des disques était configuré pour utiliser du **RAID5**. Cela voulait dire qu'au cas où un disque venait à être endommagé, je pouvais en théorie remplacer le disque défaillant et les données se reconstruisaient automatiquement. En théorie. Car tout a bien fonctionné jusqu'à notre déménagement en 2010. Et nous avons stocké le NAS dans un carton à côté d'un haut-parleur pendant un mois. Et deux disques sont morts.

J'ai passé des semaines à chercher une solution pour récupérer les données perdues. Mais après un moment, j'ai dû me rendre à l'évidence. C'était en vain. Des années de photos et vidéos de famille, une collection entière de MP3, tous mes jeux vidéo... Tout était perdu, à tout jamais. Ma petite amie était en larmes et ma "fierté de geek" après avoir passé tout ce temps à planifier et monter ce système en prit un sacré coup. Bien sûr que j'avais des solutions de recours, d'où le RAID5, mais je ne m'étais pas préparé à une catastrophe de cette amplitude. Et lorsqu'on parle de sécurité informatique, on *doit* prévoir le pire.

Des années plus tard, j'ai retenu la leçon. Voici comment je gère ma vie numérique désormais.

## Mon setup actuel

Ma stratégie actuelle est construite autour de deux choses : un nouveau NAS, que j'ai acheté et non construit, et une suite logicielle qui automatise comment les données sont gérées.

Le NAS que j'utilise est un **Synology DiskStation DS214se**. C'est une machine très simple, qui tourne grâce à un CPU double coeur cadencé à 800 MHz, avec 256 MB de RAM et deux baies pour disque dur. J'ai mis dedans **deux 2 TB Western Digital Green**, et configuré une seule grappe en **RAID1**: tout ce qui est écrit sur un disque est répliqué sur le second. Cela veut dire que je perds la moitié du stockage théorique, mais si un disque dur crame je peux le changer et les données vont se reconstruire automatiquement.

Le NAS est connecté à un **onduleur APC**. Si le courant est coupé dans mon appartement, le NAS continue de tourner et je peux le couper manuellement (et en toute sécurité) soit via son bouton physique (qui envoie une commande de PWR OFF) ou même depuis mon téléphone (mon routeur étant lui aussi connecté à l'onduleur, j'ai toujours du réseau pendant quelques minutes même sans électricité).

La stratégie principale de sauvegarde est gérée par un logiciel très pratique : **SyncBack Free**. Ce logiciel me permet de mettre en place plusieurs scénarios de sauvegarde, appelés "profiles". Le profil principal est un **backup physique** vers un disque dur externe. Lorsque j'ai acheté le NAS Synology, j'ai pris un troisième disque dur de 2 TB qui est maintenant utilisé comme sauvegarde. C'est ma première sécurité. C'est ce qui manquait à mon système précédent. Une fois que la tâche de sauvegarde est exécutée, ce disque est stocké **hors-ligne** et **hors-site**, de manière à le protéger en cas que panne électrique. Et en cas d'incendie ou d'inondation, mes données sont sauves.

SyncBack lance ensuite deux autre tâches. De toutes les données perdues dans la destruction de mon précédent setup, les photos de famille furent le plus difficile à accepter. On peut toujours remplacer la musique ou les films qu'on aime par de nouveaux, car le flux de divertissement à consommer est sans fin. Mais les souvenirs s'effacent et sont impossible à récupérer. J'ai donc décidé d'ajouter une couche supplémentaire de redondance dans ma stratégie de sauvegarde en ce qui concerne les photos et je les stocke en ligne, dans mon **Google Drive**. SyncBack compare le contenu du dossier dans le NAS et mon Google Drive, et met à jour les données en effectuant une **Vérification en Redondance Cyclique** de chacun des fichiers pour voir s'ils sont identique de chaque côté.

Je dois noter ici que je pourrais utiliser deux applications qui existent nativement sur les NAS Synology : **USB Copy** et **Hyper Backup**. Après avoir essayé ces applications dans différents scénarios, j'ai décidé de ne pas les utiliser car soit elles stockent les données dans un format propriétaire (Hyper Backup) ou ajoutent un tas de fichier de métadonnées commençant par `._` à mes dossiers existants (USB Copy). J'apprécie le fait que si je dois récupérer mes fichiers en dehors de l'écosystème Synology, je peux utiliser une bonne vieille commande `cp` pour retrouver mes données.

## Mais ce n'est pas tout !

Mes données sont donc dans une grappe en RAID1, et sur un disque dur externe. Et mes photos sont sauvegardées en ligne sur mon Google Drive. J'aurais pu m'arrêter là mais je me suis dit que ce n'était pas assez. Grâce à mon abonnement **Amazon Prime**, je peux envoyer autant de photo que je veux sur **Amazon Drive** sans que cela affecte mon quota. Alors profitons de cette opportunité ! Un nouveau profil SyncBack sauvegarde le contenu de mon dossier Photos sur les serveurs d'Amazon. J'apprécie le fait que mes données soient stockées chez deux fournisseurs de stockage différents. Google et Amazon ont chacun leur infrastructure.

Mais pourquoi s'arrêter là ? Mes photos sont stockées dans quatre endroits différents maintenant (le NAS, le disque dur externe, Google Drive et Amazon Drive). Mais qu'en est-il du reste ? Ma musique, mes documents, mes vidéos de famille ? Bien sûr, tout se trouve sur le NAS et le disque dur externe, mais je me suis dit que j'avais besoin d'une protection supplémentaire. Car jusqu'à présent toutes mes stratégies de sauvegarde reposent sur ce qui peut constituer un **point individuel de défaillance** : SyncBack. Si le logiciel se comporte mal ou un de mes profils de backup n'est pas bien configuré, je peux me retrouver avec rien d'autre qu'une mauvaise sauvegarde à plusieurs endroits. Je n'ai aussi pas accès au disque dur externe aussi facilement, ce qui fait que si j'ai besoin de faire une sauvegarde à n'importe quel moment, je dois me préparer au moins un jour à l'avance.

C'est la raison pour laquelle j'ai pris un abonnement à **[Synology C2](https://c2.synology.com/en-us)**. C'est un service totalement intégré qui tourne nativement sur **DSM** (*DiskStation Manager:* le système d'exploitation de Synology) et qui permet d'envoyer l'intégralité du NAS (moins les films et séries TV, car ce n'est pas très important) vers les serveurs de Synology. Il utilise l'AES-256 pour chiffrer les données en local avant de les envoyer sur le réseau. Je l'ai configuré pour qu'il fasse une sauvegarde automatique tous les lundi, et une vérification de l'intégrité des données deux jours plus tard.

J'ai aussi considéré l'offre de Online [C14](https://www.online.net/en/c14), car elle est très peu chère et on peut envoyer les fichier via (S)FTP mais malheureusement ils ne supportent pas Synology.

## Évolutions possibles

Voici donc à quoi ressemble mon setup actuel :

{{< figure src="/img/posts/backup-strategy.jpg" title="Mon setup actuel" caption="Mon setup actuel" >}}

Chaque fichier est stocké physiquement sur jusqu'à 6 endroits différents, avec différents niveaux de sécurité.

Est-ce que ce setup est parfait ? Bien sûr que non. Tout d'abord, tout ceci manque d'automatisation. Je dois toujours démarrer chacune des tâches de sauvegarde à la main (à part celle qui envoie les données vers C2), et je ne suis pas à l'abris d'une erreur. Je travaille avec des données vivantes, donc la grappe est en constante évolution, mais c'est une sauvegarde, pas un stockage froid. Et le disque dur externe que j'utilise doit être transporté et manipulé, c'est donc un point de défaillance supplémentaire.

Une chose que je risque changer dans peu de temps est le modèle des disques que j'utilise. les WD Green sont "bien" mais ils ne sont pas fait pour être utilisé dans un NAS. Je pense donc les remplacer par soit des WD Red ou des Seagate Ironwolf, et peut-être en profiter pour faire une mise à jour de capacité vers 3 ou 4 TB.

L'un dans l'autre, le problème principal avec les stratégies de sauvegarde est qu'elles ne sont jamais parfaites. Regardez ce qui [s'est passé chez GitLab](https://techcrunch.com/2017/02/01/gitlab-suffers-major-backup-failure-after-data-deletion-incident/) il y a quelques mois, ou la catastrophe qui a [mis OVH sur les rotules](https://www.theregister.co.uk/2017/07/13/watercooling_leak_killed_vnx_array/) pendant plusieurs heures.

Personne ne peut réellement faire face à une perte de données. Ceci dit, je peux dire que je me sens *confiant* avec cette stratégie, et j'ai essayé de penser à tous les scénarios possibles (même les vents solaires, mais c'est une tout autre histoire). Nous verront bien où se trouvent mes données dans quelques années.
