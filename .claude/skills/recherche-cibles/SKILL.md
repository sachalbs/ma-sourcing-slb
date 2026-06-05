---
name: recherche-cibles
description: "Skill de recherche de cibles d'acquisition M&A. À utiliser une fois le cahier de recherche validé via intake-mandat. Construit une longlist de cibles qualifiées et sourcées via les registres officiels et la recherche web, croise les sources, score les cibles, et produit une screening list Excel selon la charte Allinvest."
---
# Recherche de cibles
À lancer uniquement après validation du cahier de recherche (skill `intake-mandat`).
## Méthode : workflow agent en parallèle
Pour une longlist sérieuse, répartir le travail entre plusieurs chercheurs spécialisés qui travaillent en parallèle, puis consolider. Pour un volume important (plus de 30 cibles ou plusieurs sous-segments), lancer un workflow agent ; pour un besoin ponctuel, enchaîner les étapes directement.
### Phase 1 : constituer le vivier brut
- Interroger les registres officiels via `scripts/recherche_entreprises.py` par code NAF, géographie et tranche d'effectifs correspondant au cahier de recherche.
- En parallèle, recherche web pour identifier les acteurs du secteur : classements sectoriels, syndicats professionnels, salons, presse spécialisée, annuaires métier.
- Si Allinvest a un accès PitchBook / Capital IQ, l'utiliser pour compléter par les sociétés déjà profilées.
- Objectif : un vivier large, quitte à filtrer ensuite.
### Phase 2 : dédoublonner et filtrer
- Dédoublonner par SIREN et par nom de domaine.
- Filtrer selon les critères du cahier (taille, géographie, sous-segment, exclusions).
- Écarter ce qui ne correspond manifestement pas, en gardant une trace.
### Phase 3 : enrichir et sourcer
Pour chaque cible retenue, collecter et croiser :
- Identité légale et dirigeants (recherche-entreprises).
- CA, effectifs, date de création (recherche-entreprises + comptes publiés + site).
- Signaux récents via BODACC (`scripts/bodacc.py`) : changements, opérations, difficultés.
- Activité et positionnement (site corporate, communiqués, presse).
- Actionnariat (fondateur, familial, PE, coté).
- Chaque chiffre financier croisé sur 2 sources minimum. Source et date sur chaque donnée.
### Phase 4 : scorer
Noter le fit stratégique (Élevé / Moyen / Faible) selon une rubrique pondérée tirée du cahier de recherche : adéquation au sous-segment, taille dans la fourchette, critères qualitatifs prioritaires, signaux d'ouverture à une opération. Justifier chaque note en une ligne.
### Phase 5 : vérifier
Avant de produire le livrable, passer la longlist à l'agent `verificateur-sources` : contrôle que chaque donnée est sourcée et datée, que les chiffres sont croisés, qu'aucune valeur n'est inventée, et que les "n.d." et "est." sont correctement posés.
## Livrable : screening list Excel
Produire le fichier selon la structure et la charte définies dans la skill `ma-target-screening` (livrable 1) :
- Onglet "Screening List" : une ligne par cible, colonnes Entreprise, Description, Secteur/Sous-secteur, Localisation, Date de création, CA, EBITDA, Marge EBITDA, Effectifs, Actionnariat, Récurrence CA, Croissance CA, Fit stratégique, Commentaires, Source.
- Onglet "Critères de recherche" : le cahier de recherche validé.
- Onglet "Transactions comparables" : si pertinent, deals récents du secteur.
- Onglet "Sources" : chaque source avec date de consultation.
- Charte : en-têtes bleu foncé RGB 0,51,102 texte blanc, filtres, gel des volets, alternance de lignes, formules Excel et non valeurs hardcodées.
Sauvegarder dans `outputs/` : `secteur_cibles_AAAA-MM-JJ.xlsx`.
## Restitution à l'analyste
Présenter en quelques lignes : nombre de cibles, répartition par fit, 3 à 5 cibles les plus prometteuses avec une phrase chacune, et où trouver le fichier. Pas de jargon technique.
