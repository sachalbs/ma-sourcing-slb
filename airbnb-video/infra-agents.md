# Infrastructure d'agents, ce qui tient debout et ce qui ne tient pas

Date : 4 août 2026

Objectif visé : des agents qui couvrent les territoires selon leurs horaires, envoient tout seuls,
répondent aux prospects, et ne réveillent Sacha qu'au moment de produire une vidéo.

Ce document sépare ce qui est réellement automatisable de ce qui ne l'est pas, pour ne pas
construire sur du sable.

## Ce qui ne sera jamais automatisable, autant l'acter

**Instagram.** L'interface de messagerie de Meta n'autorise un envoi automatique que vers une
personne qui vous a écrit en premier, dans une fenêtre de 24 heures. Le message à froid vers un
compte qui ne vous connaît pas est interdit par leurs règles et détecté rapidement. Instagram reste
donc un canal manuel, quinze par jour, cinq minutes d'écart.

**WhatsApp.** L'envoi automatisé existe, mais il passe par un compte professionnel vérifié, des
modèles de messages validés un par un par Meta, et surtout le consentement préalable du
destinataire. Une campagne à froid n'y passe pas. Le numéro personnel est déjà restreint, il ne
faut plus rien tenter dessus.

Conclusion : **le mail est le seul canal automatisable**. Toute l'infrastructure se construit
dessus.

## Les cinq couches

### 1. Le carnet
`prospects-bresil.csv` et `prospects-indonesie.csv`. Chaque société porte son territoire, son
fuseau, son angle, son statut et la fiabilité de son adresse. C'est la seule source de vérité, tout
le reste s'y raccroche.

### 2. L'envoi automatique
Passe par Apollo, connecté au compte personnel de Sacha, avec sa boîte sachalbs@outlook.com comme
expéditeur. Apollo sait enchaîner une séquence, l'étaler dans le temps, respecter une fenêtre
horaire par fuseau, et s'arrêter tout seul dès qu'un prospect répond. C'est exactement le
comportement recherché, et il n'y a rien à écrire pour l'obtenir.

Deux réserves sérieuses :

- **Le lien avec Apollo a expiré le 4 août 2026** en cours de session. Il faut le réautoriser, une
  fois, pour que les agents puissent envoyer.
- **L'adresse d'envoi est un domaine gratuit.** Pour quelques dizaines de mails, aucun problème.
  Pour de la centaine par semaine, l'adresse personnelle finit filtrée, exactement comme le numéro
  WhatsApp a fini restreint. Le volume réel demande un domaine dédié, voir plus bas.

### 3. La réponse aux prospects
C'est la couche la plus fragile, et la raison est simple : **la boîte Outlook n'est pas lisible
depuis ici**. L'accès direct aux serveurs de messagerie est fermé par la politique réseau de
l'environnement. Un agent ne peut donc pas voir arriver une réponse.

Le contournement qui fonctionne : une règle dans Outlook qui **fait suivre les réponses vers une
boîte connectée**, que l'agent peut lire. Il lit la réponse, rédige la suite en portugais, et
l'envoie via Apollo depuis l'adresse d'origine, ce qui garde le fil cohérent côté prospect.

Garde-fous obligatoires sur cette couche, un agent qui répond seul à un client engage l'affaire :
- Il ne négocie jamais le prix. La grille est 59, 39 en pack de dix, 890 par mois, point.
- Il ne promet aucun délai autre que 24 heures, ni aucune vidéo offerte au delà de la première.
- Il ne s'engage sur rien de fiscal ni de contractuel.
- Tout ce qui sort de ce cadre remonte à Sacha au lieu de partir.

### 4. Le réveil aux bonnes heures
Une tâche programmée par territoire, qui déclenche un agent aux heures ouvrées locales.

| Territoire | Fuseau | Fenêtre locale | Heure de Paris en août |
|---|---|---|---|
| Brésil | UTC-3 | 9 h - 12 h et 14 h - 18 h | 14 h - 17 h et 19 h - 23 h |
| Indonésie | UTC+8 | 9 h - 17 h | 3 h - 11 h |

C'est tout l'intérêt de la mécanique : la fenêtre indonésienne, intenable à la main, ne coûte rien
à un agent qui se réveille seul.

### 5. La production, sur signal uniquement
L'agent ne produit jamais de vidéo. Il notifie Sacha, sur son téléphone, **uniquement quand les
trois conditions de `CLAUDE.md` sont réunies** : bien précis désigné, prix annoncé sans recul,
interlocuteur décisionnaire. Tant que ce n'est pas le cas, il continue seul et ne dérange personne.

À 60 crédits la vidéo et 262 crédits en réserve, c'est cette règle qui protège la trésorerie.

## Le point dur : l'adresse d'expédition

C'est la seule vraie dépense à décider, et elle conditionne le volume.

| | Boîte actuelle | Domaine dédié |
|---|---|---|
| Coût | zéro | environ 15 € le domaine par an, plus 6 à 10 € par mois la boîte |
| Volume tenable | 15 à 20 mails par jour | 100 à 200 par jour après montée en puissance |
| Délai avant volume | immédiat | 2 à 3 semaines de chauffe |
| Risque | l'adresse personnelle finit filtrée | aucun sur l'adresse personnelle |

La lecture raisonnable est de faire les deux : partir ce soir avec la boîte actuelle sur les
quatorze sociétés déjà prêtes, ce qui est un volume de mails parfaitement normal pour une personne,
et lancer en parallèle le domaine dédié pour que la vraie montée en volume ait lieu dans trois
semaines sur une adresse propre.

## Ordre de construction

1. Réautoriser le lien Apollo, une manipulation.
2. Séquence Brésil sur les quatorze sociétés, envoi étalé depuis la boîte actuelle.
3. Règle de renvoi Outlook vers une boîte lisible, pour que l'agent voie les réponses.
4. Tâche programmée Brésil, puis Indonésie, avec notification sur téléphone au seul moment utile.
5. Domaine dédié et chauffe, en parallèle, pour le volume des semaines suivantes.
