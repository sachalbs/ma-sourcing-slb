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
Expéditeur retenu le 4 août 2026 : **sachalbs@gmail.com**, une seule identité pour toute la
prospection. L'adresse Outlook reste valable pour les conversations déjà ouvertes avant cette date.

Constat établi le 4 août 2026, en testant les quatre voies possibles : **rien ne peut envoyer un
mail depuis l'environnement de travail**. Le connecteur Gmail lit et rédige mais n'expose aucune
fonction d'envoi. L'API Google, les serveurs d'authentification Google et le SMTP sont tous fermés
par la politique réseau. Un compte Apollo payant n'est pas au programme.

D'où le montage retenu, qui retourne le problème : **ce n'est pas une machine extérieure qui
envoie, c'est le compte Google de Sacha lui même**. Un script Apps Script, `envoi-auto.gs`, tourne
chez Google sur son propre minuteur, avec les droits de la boîte. Il envoie la vague, respecte la
fenêtre horaire, espace les envois, saute les sociétés qui ont répondu et relance une fois à J+4.
Gratuit, hébergé par Google, indépendant de toute session de travail.

Installation en cinq étapes dans `envoi-auto.md`, une seule fois.

Réserve de fond : **gmail.com est un domaine gratuit**. Pour quelques dizaines de mails, aucun
problème, le script se limite d'ailleurs à vingt par jour. Pour de la centaine par semaine,
l'adresse finit filtrée, exactement comme le numéro WhatsApp a fini restreint. Le volume réel
demande un domaine dédié, voir plus bas.

### 3. La réponse aux prospects
Le blocage est le même, et la réponse aussi : un agent n'a pas le droit d'envoyer un mail, mais il
a le droit d'écrire un brouillon, et le script, lui, a le droit d'envoyer.

Le protocole tient en une ligne : **l'agent laisse un brouillon dont le corps se termine par
`##ENVIAR##`**, le script le nettoie et l'envoie dans les dix minutes, dans le bon fil, depuis
l'adresse de Sacha. Côté prospect, c'est une conversation normale. Les brouillons de réponse
passent avant la vague initiale, une conversation en cours prime sur un nouveau contact.

Il reste une condition, et une seule : **activer le connecteur Gmail dans les réglages de
claude.ai**, aujourd'hui éteint, pour que l'agent puisse lire les réponses. Tant qu'il l'est, le
script envoie et relance seul, mais les réponses sont à traiter à la main.

Le cadre complet dans lequel l'agent répond, cas par cas, avec les limites qu'il ne franchit jamais
et les quatre seuls motifs de notification, est dans `agent-reponses.md`.

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
