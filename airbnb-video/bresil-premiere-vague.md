# Brésil, première vague de prospection

Date : 4 août 2026
Console d'envoi : https://claude.ai/code/artifact/36c553e6-dce3-4dfb-8999-62ac1eb6cb44

## Pourquoi le Brésil avant l'Indonésie

Le décalage. Le Brésil est à UTC-3, Paris à UTC+2 en été, soit 5 heures d'écart. Un message envoyé
à 14 h chez vous arrive à 9 h chez eux, en début de journée de travail. L'Indonésie imposait la
fenêtre 3 h - 11 h du matin heure de Paris, ce qui était intenable en pratique.

Fenêtre d'envoi : 14 h - 17 h et 19 h - 23 h heure de Paris, du lundi au vendredi.
La console affiche l'heure de Brasília en direct et dit si le moment est bon.

## Les douze sociétés

Chaque numéro a été relevé sur le site officiel de la société, sur le lien WhatsApp qu'elle publie
elle-même. Aucun numéro n'est deviné ni reconstitué.

### Priorité A, villas de luxe, gros panier

| Société | Zone | WhatsApp | Pourquoi elle |
|---|---|---|---|
| Matueté Villas | Trancoso, Búzios, Angra, Ilhabela, Paraty | +55 11 98498-5186 | Le portefeuille de villas de luxe avec service le plus étendu du Brésil, cinq destinations |
| Villas in Brazil | Angra, Trancoso | +55 21 99803-7681 | Clientèle internationale qui réserve sans avoir vu la maison |
| WhereInRio | Rio, Búzios | +55 21 96531-9121 | Maisons d'architectes, chef privé, chauffeur |
| NIAMÃ | Trancoso | +55 73 98849-5317 | Altos de Trancoso, service complet, structure légère |
| Cocar Trancoso | Trancoso | +55 71 99169-6993 | N'exploite que ses propres maisons, décide seul |
| Latin Exclusive | Angra dos Reis | +55 21 98207-1352 | Location saisonnière, longue durée et vente dans le même portefeuille |

### Priorité B, volume et gestion locative

| Société | Zone | WhatsApp | Pourquoi elle |
|---|---|---|---|
| Porto Bracuhy | Angra dos Reis | +55 21 99148-2404 | Condominium avec marina, biens très visuels |
| Bahia Luxury | Trancoso | +55 73 9843-9000 | Portefeuille entièrement statique |
| Holmy | Trancoso | +55 11 93375-4731 | Volume de biens listés |
| Floripa Minha Hospedagem | Florianópolis | +55 48 98855-5811 | Réseau de co-hôtes Airbnb depuis 2024 |
| Smartbnb | Rio de Janeiro | +55 21 97131-3905 | Marché de Rio saturé |
| HostnJoy | 5 villes | +55 31 98604-4645 | Raisonne en coût par bien, pas en prix d'une vidéo |

## Deux angles, deux messages

**Villas de luxe.** L'argument n'est pas le prix, c'est ce que la photo ne montre pas : le volume
d'un espace, le passage d'une pièce à l'autre, la lumière qui change. Ces sociétés vendent des
séjours à plusieurs milliers d'euros la semaine, 59 dollars ne pèse rien dans leur décision.
Ne jamais employer le mot « IA » avec eux.

**Gestion locative en volume.** L'argument est le débit et le coût par bien. Ils font entrer des
logements en continu et un tournage par logement ne tient pas la cadence. Le pack de dix parle
directement à ce problème.

## Ce qui protège du non-paiement

La première vidéo est offerte, une seule par société. Elle part en définition réduite avec une
mention discrète. Dès la première commande payante, paiement intégral d'avance par lien Stripe
envoyé dans la conversation. Le détail est dans `economie-et-paiement.md`.

## Cadence

Deux minutes minimum entre deux envois. Une rafale depuis un numéro personnel fait chuter sa note
de qualité chez WhatsApp et finit par le faire restreindre. Douze messages étalés sur une demi-heure
ne posent aucun problème.

Relance unique à J+4, déjà rédigée dans la console. Au-delà, on n'insiste pas.

## Ce qui se passe après une réponse

Une réponse ouvre une fenêtre de 24 heures pendant laquelle tout est permis, y compris l'envoi de
fichiers. C'est le moment de demander six à dix photos d'une maison et de livrer la vidéo le
lendemain. Rien ne se joue avant.
