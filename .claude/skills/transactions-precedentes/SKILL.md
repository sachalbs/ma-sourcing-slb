---
name: transactions-precedentes
description: "Skill de recherche de transactions M&A précédentes dans un secteur. À utiliser une fois le cahier de recherche validé via intake-mandat. Identifie les deals passés, leurs caractéristiques et multiples quand publics, pour benchmarker une valorisation, valider une thèse ou repérer les consolidateurs actifs. Toutes les données sourcées et datées."
---
# Transactions précédentes
À lancer uniquement après validation du cahier de recherche (skill `intake-mandat`).
## Objectifs possibles
- Benchmark de multiples (EV/EBITDA, EV/CA) pour calibrer une valorisation.
- Validation d'une thèse de consolidation (le secteur bouge-t-il ?).
- Identification des acquéreurs actifs (qui consolide le secteur ?).
## Méthode
### Phase 1 : identifier les deals
- BODACC (`scripts/bodacc.py`) : cessions de fonds, ventes, opérations enregistrées en France sur la période.
- Recherche web : presse deals (CFNEWS, Les Échos, La Lettre), communiqués d'acquéreurs, classements de deals sectoriels.
- PitchBook / Capital IQ si accès Allinvest : la source la plus structurée pour les deals et multiples.
- SEC EDGAR pour les acquéreurs cotés US (8-K d'acquisition).
- Couvrir la période demandée (par défaut 3 à 5 ans) et la fourchette de taille.
### Phase 2 : caractériser chaque deal
Pour chaque transaction : cible, acquéreur, date, secteur / sous-segment, géographie, valeur d'entreprise si publique, multiple EV/EBITDA et EV/CA si publics, type d'opération (build-up, primaire, secondaire, corporate), rationale annoncée.
### Phase 3 : qualité des multiples
- Les multiples ne sont retenus que s'ils sont publics ou solidement étayés. Sinon "n.d.".
- Distinguer les multiples annoncés des multiples estimés par la presse ("est.").
- Croiser chaque multiple sur 2 sources quand possible.
- Ne jamais inventer ni extrapoler un multiple sans le signaler.
### Phase 4 : vérification
Passer la table à l'agent `verificateur-sources`.
## Livrable : table de transactions comparables Excel
- Onglet "Transactions comparables" : Date, Cible, Acquéreur, Type acquéreur, Secteur / Sous-segment, Géographie, CA cible, EBITDA cible, Valeur d'entreprise, EV/EBITDA, EV/CA, Type d'opération, Rationale, Source.
- Onglet "Synthèse multiples" : médiane, moyenne, min, max des multiples retenus (formules Excel), avec le nombre de deals dans l'échantillon et un commentaire sur la représentativité.
- Onglet "Consolidateurs actifs" : si pertinent, acquéreurs ayant fait plusieurs deals sur la période.
- Onglet "Critères de recherche" et onglet "Sources" daté.
- Charte Allinvest, formules Excel et non valeurs hardcodées.
Sauvegarder dans `outputs/` : `secteur_transactions_AAAA-MM-JJ.xlsx`.
## Restitution à l'analyste
Synthèse : nombre de deals trouvés, fourchette et médiane des multiples retenus, principaux consolidateurs, où trouver le fichier. Préciser le niveau de fiabilité des multiples (combien sont publics vs estimés).
