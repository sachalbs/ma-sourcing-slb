---
description: Lance un balayage de veille deal sourcing sur la période récente
---
Exécute une veille deal sourcing complète.

1. Charge `config/these-investissement.md`, `config/sources.md`, `veille/watchlist.md`,
   `veille/journal-deals.md` et `veille/taches.md`.
2. Interroge d'abord les connecteurs premium (PitchBook, S&P, Moody's, Lusha, Apollo,
   Explorium), puis complète par une recherche web sur l'actu des 7 derniers jours.
3. Filtre selon la thèse, déduplique contre le journal, score chaque deal (fit 0-5).
4. Exécute aussi les tâches récurrentes dues dans `veille/taches.md`.
5. Présente les deals au format défini dans CLAUDE.md, avec un top 3.
6. Ajoute les deals retenus à `veille/journal-deals.md` (statut = nouveau).

Argument optionnel : $ARGUMENTS (ex. "focus healthtech", "30 derniers jours").
