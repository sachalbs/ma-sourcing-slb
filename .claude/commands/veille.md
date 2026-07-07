---
description: Veille deal sourcing complète (4 flux) sur le périmètre B&Capital
---
Exécute une veille complète sur les 7 derniers jours (sauf période précisée : $ARGUMENTS).

1. Charge CLAUDE.md, config/ et tous les journaux de veille/.
2. Interroge d'abord les connecteurs premium (Apollo, Lusha, Explorium, + PitchBook/S&P/
   Moody's si branchés), puis complète par le web.
3. Couvre les 4 flux :
   A. Deals du périmètre (ticket 20-50 M€, PME FR, 6 secteurs, opé éligible)
   B. Mercato des banquiers / dealmakers / conseils
   C. Normes & réglementation des fonds (ESG/SFDR, AMF, carried…)
   D. Deals manqués : deals du périmètre bouclés sans nous -> pourquoi eux + leçon
4. Filtre AGRESSIVEMENT : ne garde que le vraiment pertinent. Déduplique contre les journaux.
5. Exécute les tâches récurrentes dues (veille/taches.md).
6. Restitue par flux (format CLAUDE.md) + top 3 priorités tous flux confondus.
7. Journalise : deals -> journal-deals.md ; manqués -> deals-manques.md ;
   mercato/normes -> mercato-normes.md.
