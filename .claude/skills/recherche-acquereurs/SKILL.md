---
name: recherche-acquereurs
description: "Skill de recherche d'acquéreurs potentiels pour une cible en vente (mandat sell-side). À utiliser une fois le cahier de recherche validé via intake-mandat. Identifie et priorise les acquéreurs corporate et financiers pertinents, avec rationale d'acquisition et coordonnées des décideurs, le tout sourcé."
---
# Recherche d'acquéreurs
À lancer uniquement après validation du cahier de recherche (skill `intake-mandat`). Contexte type : mandat sell-side, on cherche qui pourrait racheter la cible.
## Méthode : workflow agent en parallèle
Travailler en deux pistes parallèles : acquéreurs stratégiques (corporate) et acquéreurs financiers (PE, fonds), puis consolider et prioriser.
### Piste A : acquéreurs stratégiques (corporate)
- Identifier les acteurs du même secteur et des secteurs adjacents qui auraient une logique d'acquisition : concurrents en quête de taille, acteurs cherchant à entrer sur le segment ou la géographie de la cible, intégration verticale amont ou aval.
- Sources : registres officiels pour la taille et la solidité, sites corporate et communiqués pour la stratégie déclarée et l'historique d'acquisitions, presse sectorielle.
- Regarder l'historique de croissance externe : un acquéreur qui a déjà fait des deals dans le secteur est un acquéreur crédible (croiser avec BODACC et la presse).
### Piste B : acquéreurs financiers (PE, fonds)
- Identifier les fonds actifs sur le secteur et la taille de deal correspondante.
- Repérer les fonds détenant déjà une plateforme dans le secteur (logique de build-up : la cible devient un add-on).
- Sources : PitchBook / Capital IQ si accès Allinvest, presse deals (CFNEWS), communiqués des fonds.
### Enrichissement et coordonnées
- Pour chaque acquéreur retenu : taille, capacité financière indicative, logique d'acquisition spécifique à la cible, historique de deals pertinents.
- Identifier le bon interlocuteur (corporate development, M&A director, directeur de participation) via les bases Apollo / Lusha si accès Allinvest.
- Source et date sur chaque donnée. Chiffres croisés sur 2 sources.
### Priorisation
Classer les acquéreurs par pertinence (Élevée / Moyenne / Faible) selon : force de la rationale, capacité financière, historique d'acquisition, fit géographique et stratégique. Justifier chaque priorité.
### Vérification
Passer le mapping à l'agent `verificateur-sources` avant livraison.
## Livrable : mapping d'acquéreurs Excel
- Onglet "Mapping acquéreurs" : Acquéreur, Type (corporate / financier), Description, Logique d'acquisition pour cette cible, Taille / capacité, Historique de deals pertinents, Interlocuteur clé, Coordonnées, Priorité, Source.
- Onglet "Critères de recherche" : le cahier de recherche validé.
- Onglet "Sources" : chaque source avec date.
- Charte Allinvest (en-têtes bleu foncé RGB 0,51,102, filtres, gel des volets, mise en forme conditionnelle sur la Priorité).
Sauvegarder dans `outputs/` : `cible_acquereurs_AAAA-MM-JJ.xlsx`.
## Restitution à l'analyste
Synthèse : nombre d'acquéreurs par type, top 5 priorités avec rationale en une phrase, où trouver le fichier.
