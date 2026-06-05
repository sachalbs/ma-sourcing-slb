---
name: intake-mandat
description: "Skill de cadrage d'un mandat de sourcing M&A. À utiliser systématiquement au début de toute demande de recherche de cibles, d'acquéreurs ou de transactions, AVANT toute recherche. Pose les bonnes questions une par une, construit un cahier de recherche structuré, et obtient la validation de l'analyste avant de lancer quoi que ce soit. Se déclenche dès qu'un analyste exprime un besoin de sourcing, même vague."
---
# Intake d'un mandat de sourcing
Cette skill garantit qu'on ne lance jamais de recherche sur un brief flou. Elle s'applique à tout type de recherche : cibles, acquéreurs, transactions.
## Principe
Une recherche ne vaut que par la qualité de son cadrage. Tant que le brief n'est pas parfait, on ne cherche pas. On questionne, on reformule, on fait valider.
## Étape 1 : poser les questions, une par une
Mener un dialogue naturel, pas un questionnaire. **Une seule question par message.** Adapter les questions au type de recherche. Si une réponse rend une question suivante inutile, la sauter. Si l'analyste a déjà donné une information dans sa demande initiale, ne pas la redemander.
Si l'analyste ne sait pas répondre à une question, proposer des options concrètes ou une valeur par défaut raisonnable, et avancer. Ne jamais bloquer.
### Questions pour une recherche de CIBLES
1. Quelle est la logique de l'opération ? (build-up / consolidation, diversification, intégration verticale, expansion géographique, acquisition primaire pour un fonds)
2. Pour le compte de qui ? (un corporate précis, un fonds, un family office, ou exploratoire)
3. Quel secteur et quels sous-segments précisément ?
4. Quelle géographie ? (France, zone, Europe, international)
5. Quelle taille de cible ? (fourchette de CA, idéalement EBITDA, effectifs)
6. Des critères qualitatifs prioritaires ? (récurrence du CA, croissance, technologie, certifications, profil d'actionnariat)
7. Des exemples de sociétés "type" qui ressemblent à ce qu'on cherche, ou au contraire à exclure ?
8. Combien de cibles visées dans la longlist, et pour quelle échéance ?
### Questions pour une recherche d'ACQUÉREURS
1. Quelle est la cible ou le profil de cible à céder ? (activité, taille, géographie)
2. Acquéreurs recherchés : corporate (stratégiques), financiers (PE, fonds), ou les deux ?
3. Quelle rationale d'acquisition mettre en avant ? (synergies, accès marché, technologie, taille critique)
4. Périmètre géographique des acquéreurs ?
5. Y a-t-il des acquéreurs déjà identifiés, ou à exclure (concurrents directs, sensibilités) ?
6. Combien d'acquéreurs visés, et pour quelle échéance ?
### Questions pour une recherche de TRANSACTIONS PRÉCÉDENTES
1. Quel secteur et sous-segment ?
2. Quelle géographie des transactions ?
3. Quelle période ? (par défaut, 3 à 5 ans)
4. Quelle fourchette de taille de deal ?
5. Objectif : benchmark de multiples, validation de thèse, ou identification de consolidateurs actifs ?
6. Faut-il les multiples (EV/EBITDA, EV/CA) quand ils sont publics, ou juste la liste des deals ?
## Étape 2 : construire et présenter le cahier de recherche
Une fois les réponses réunies, présenter un récapitulatif structuré et lisible. Exemple de format :
```
CAHIER DE RECHERCHE
Type : recherche de cibles
Logique : build-up pour un acteur de la maintenance CVC
Secteur : maintenance multitechnique, focus CVC et froid commercial
Géographie : France, priorité grand quart Sud-Est
Taille : CA 10 à 50 M€, EBITDA si dispo > 1,5 M€
Critères clés : CA récurrent (contrats de maintenance), équipe en place, pas de dépendance client > 20%
Exclusions : pure installation neuve sans maintenance
Volume visé : longlist de 40 à 60 cibles
Échéance : sous 2 semaines
Sources prioritaires : registres officiels (recherche-entreprises, BODACC), PitchBook, presse pro
```
Puis demander explicitement : **"C'est bien ça ? Je peux lancer la recherche, ou il faut ajuster ?"**
## Étape 3 : attendre le feu vert
Ne lancer aucune recherche, aucun appel aux registres, aucune recherche web, tant que l'analyste n'a pas validé.
Une fois validé :
- Sauvegarder le cahier de recherche, il alimentera l'onglet "Critères de recherche" du livrable Excel.
- Passer la main à la skill adaptée : `recherche-cibles`, `recherche-acquereurs`, ou `transactions-precedentes`.
## Rappels
- Une question par message, ton conversationnel.
- Jamais de jargon technique avec l'analyste.
- Si le brief initial est déjà complet, reformuler pour confirmation sans re-questionner.
- Le feu vert est obligatoire avant toute recherche.
