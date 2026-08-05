# Envoi automatisé des messages WhatsApp

Date : 4 août 2026

## Ce qui est vérifié

Depuis l'environnement d'exécution auquel j'ai accès, les serveurs suivants sont joignables :

| Service | État |
|---|---|
| graph.facebook.com, API WhatsApp Business de Meta | joignable |
| api.twilio.com | joignable |
| web.whatsapp.com | joignable |

Conclusion : l'envoi automatisé est techniquement possible. Il ne manque qu'un compte d'envoi et une clé d'accès.

## Les deux voies possibles

### Voie 1, Twilio (recommandée)

Twilio revend l'accès à l'API WhatsApp Business et prend en charge les démarches auprès de Meta, ce qui est le seul intérêt réel par rapport au passage en direct.

Ce qu'il faut ouvrir de votre côté :

1. Un compte Twilio
2. Un expéditeur WhatsApp rattaché à un numéro
3. Un modèle de message soumis à validation

Délai : quelques jours, principalement l'attente de validation du modèle.
Coût : quelques centimes par conversation ouverte.

Une fois que vous m'aurez transmis l'identifiant de compte et le jeton, j'envoie depuis ici, je gère les relances et je récupère les statuts de livraison.

### Voie 2, Meta en direct

Moins cher au message, mais il faut créer un compte Meta Business, faire vérifier l'entreprise, enregistrer un numéro dédié et soumettre les modèles. Plus long, et sans intérêt tant que les volumes sont faibles.

## Le point qui compte vraiment

Un premier message vers quelqu'un qui ne vous a jamais écrit exige un **modèle validé par Meta**, et la politique de Meta impose que le destinataire ait consenti à recevoir vos messages. Nos 13 prospects n'ont rien demandé.

En pratique : les modèles de type commercial passent souvent la validation, mais si des destinataires signalent le message, la qualité du numéro chute et Meta finit par le restreindre. Le risque n'est pas théorique.

Une fois qu'un prospect vous a répondu, une fenêtre de 24 h s'ouvre où tout devient libre, sans modèle ni restriction. C'est là que l'automatisation devient à la fois légale et confortable.

## L'arbitrage honnête

**Pour les 13 prospects actuels : ça n'en vaut pas la peine.** Compter plusieurs jours de démarches et un risque sur le numéro, pour économiser 13 appuis de pouce à deux secondes chacun, n'a pas de sens. La console fait le travail.

**À partir de 150 à 200 prospects, ça change tout.** Là, l'envoi manuel devient un métier à plein temps, la mise en place se rentabilise en une seule campagne, et l'investissement se justifie.

## Ce que je ne construirai pas

L'automatisation de WhatsApp Web par pilotage de navigateur est techniquement à portée, le site est joignable et l'outillage est installé. Je ne le ferai pas, pour deux raisons :

1. L'environnement d'exécution est détruit une dizaine de secondes après chaque commande, donc une session WhatsApp Web ne survivrait pas d'un envoi à l'autre. Ça ne marcherait pas, même en essayant.
2. C'est le moyen le plus rapide de perdre définitivement le numéro, et votre activité entière repose dessus.

## Script d'envoi, prêt à l'emploi

Le script est dans `envoi-whatsapp.sh`. Il attend trois variables d'environnement et envoie la première vague. Rien ne part tant que les identifiants ne sont pas fournis.
