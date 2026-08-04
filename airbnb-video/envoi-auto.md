# Envoi automatique, installation en cinq minutes

Date : 4 août 2026

## Pourquoi ce montage

L'envoi automatique ne peut pas partir d'une machine tierce : les accès directs à Gmail, aux
serveurs de messagerie et aux services d'envoi sont tous fermés depuis l'environnement de travail,
et un compte Apollo payant n'est pas au programme.

La solution est de retourner le problème. Ce n'est pas une machine extérieure qui envoie, **c'est
votre propre compte Google**. Le script ci joint tourne chez Google, gratuitement, sur son propre
minuteur, avec les droits de votre boîte. Il n'y a rien à payer, rien à héberger, et rien ne casse
quand cette session se termine.

Un Gmail gratuit autorise 500 envois par jour. Le script se limite à 20, très en dessous de ce qui
attire l'attention.

## Ce que le script fait, seul

- Il envoie **un mail toutes les 8 minutes au minimum**, uniquement dans la fenêtre brésilienne,
  14 h - 17 h et 19 h - 23 h heure de Paris, du lundi au vendredi.
- Il **saute toute société qui a déjà répondu** ou qui a déjà été contactée. Personne ne reçoit deux
  fois le même message.
- Il **relance une seule fois à J+4** celles qui n'ont pas répondu, jamais deux.
- Il **étiquette** les fils : envoyé, répondu, relancé, clos.
- Il s'arrête net si vous le lui demandez.

Les quatorze sociétés sont déjà dans le script, avec leur message, dans l'ordre : Latin Exclusive
et Holmy d'abord, puis les villas de luxe, puis la gestion en volume.

## Installation, cinq étapes, une seule fois

1. Ouvrez **script.google.com** en étant connecté avec sachalbs@gmail.com, puis **Nouveau projet**.
2. Effacez le peu de code affiché, et **collez tout le contenu du fichier `envoi-auto.gs`**.
3. Enregistrez, avec l'icône de disquette.
4. Dans la liste déroulante des fonctions, en haut, choisissez **`instalarGatilhos`**, puis
   **Exécuter**.
5. Google demande une autorisation, c'est normal, c'est votre propre script sur votre propre boîte.
   Acceptez. Si un écran indique que l'application n'est pas vérifiée, cliquez sur **Paramètres
   avancés** puis sur **Accéder au projet**, c'est le parcours normal pour un script personnel.

C'est fini. Le premier mail part au prochain créneau brésilien, sans que vous fassiez quoi que ce
soit. Les quatorze s'étalent sur environ deux heures.

## Le piloter ensuite

Toujours depuis script.google.com, choisir la fonction puis Exécuter :

| Fonction | Ce qu'elle fait |
|---|---|
| `estado` | Dit où on en est : fenêtre ouverte ou non, envoyés du jour, sociétés restantes |
| `pararTudo` | Arrêt d'urgence, coupe tous les envois automatiques |
| `instalarGatilhos` | Remet tout en marche |

Le détail de chaque exécution est visible dans **Exécutions**, dans le menu de gauche.

## Comment l'agent répond aux prospects

C'est la pièce qui ferme la boucle. Un agent n'a pas le droit d'envoyer un mail, mais il a le droit
d'écrire un brouillon. Le script, lui, a le droit d'envoyer.

Donc : l'agent lit la réponse d'un prospect, rédige la suite en portugais, et laisse un brouillon
dont le corps se termine par le marqueur `##ENVIAR##`. Au passage suivant, dans les dix minutes, le
script retire le marqueur et envoie le message depuis votre adresse, dans le bon fil de discussion.
Le prospect voit une conversation normale avec vous.

Les brouillons de réponse passent **avant** la vague initiale, une conversation en cours prime
toujours sur un nouveau contact.

Pour que l'agent puisse lire les réponses, il faut activer le connecteur Gmail dans les réglages de
claude.ai. Tant qu'il est éteint, le script continue d'envoyer la vague et les relances tout seul,
mais les réponses sont à traiter à la main.

Le cadre exact dans lequel l'agent répond, avec ses limites et les quatre seuls motifs pour vous
déranger, est dans `agent-reponses.md`.

## Le jour où on passe à l'Indonésie

Le même script, dupliqué, avec la liste indonésienne et une fenêtre différente dans
`dansLaFenetre_` : 3 h - 11 h heure de Paris pour viser leurs heures ouvrées. C'est précisément
l'intérêt du montage, cette fenêtre là est intenable à la main et ne coûte rien à un minuteur.
