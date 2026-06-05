# Référentiel des sources
Hiérarchie et description des sources utilisées par l'assistant. Du plus fiable au moins fiable. Les sources légales officielles priment toujours pour les données factuelles et financières.
## Niveau 1, registres officiels (gratuits, légaux)
| Source | Couverture | Accès |
|---|---|---|
| **recherche-entreprises (api.gouv.fr)** | Toutes les entreprises FR : raison sociale, SIREN/SIRET, dirigeants, code NAF, effectifs, date de création, siège, agrège INSEE + INPI + greffes | `scripts/recherche_entreprises.py`, gratuit, sans clé |
| **BODACC (DILA)** | Annonces légales : cessions de fonds, ventes, procédures collectives, créations, modifications, dépôts de comptes. Signal M&A en temps réel | `scripts/bodacc.py`, gratuit, sans clé |
| **INSEE SIRENE** | Données légales et établissements | Inclus dans recherche-entreprises |
| **INPI / RNE** | Comptes annuels déposés, bénéficiaires effectifs, marques, brevets | Inclus dans recherche-entreprises pour l'essentiel |
| **SEC EDGAR** | Sociétés cotées US et étrangères enregistrées : 10-K, 10-Q, 8-K, financials XBRL | `scripts/sec_edgar.py`, gratuit, sans clé (User-Agent requis) |
## Niveau 2, bases professionnelles déjà souscrites par Allinvest
À utiliser via les connecteurs déjà en place. Ne pas souscrire de nouvel abonnement sans validation.
- **PitchBook** : private market data, valorisations, deals, investisseurs.
- **S&P Capital IQ / Kensho** : données financières publiques, ratios, comparables.
- **Moody's** : données crédit et financières.
- **Apollo, Lusha** : contacts et coordonnées des décideurs (corporate dev, M&A directors).
## Niveau 3, sources primaires de l'entreprise
- Site corporate, page investisseurs, communiqués de presse.
- Comptes publiés, documents de référence, rapports annuels.
- À lire directement via la recherche et la lecture de pages web.
## Niveau 4, presse et études sectorielles
- CFNEWS, Les Échos, La Lettre, presse professionnelle du secteur.
- Études de marché et classements sectoriels reconnus.
- Acceptable pour le qualitatif et le contexte, jamais comme source unique d'un chiffre financier.
## À proscrire
- Agrégateurs non datés, forums, contenu sans source identifiable.
- Toute source pour un chiffre financier sans croisement avec au moins une autre source.
## Règles transverses
- Chaque donnée retenue porte sa source et sa date de consultation.
- Tout chiffre financier est croisé sur 2 sources minimum.
- Estimation annotée "est.", donnée absente annotée "n.d.".
- L'onglet "Sources" de chaque livrable liste toutes les sources avec dates.
