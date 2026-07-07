# Agent de veille deal sourcing — B&Capital (pour Claude Code)

Projet Claude Code préconfiguré : veille sur les deals récents pertinents pour un buyout
smidcap français (tickets 20-50 M€), + mercato des banquiers, + normes des fonds (ESG…),
+ analyse des deals qu'on a ratés.

## Utilisation
- `/veille` — veille complète, 4 flux, résultat direct dans Claude.
  Focus possible : `/veille focus santé` ou `/veille 30 derniers jours`.
- `/deal <nom>` — deep-dive sur une cible.
- `/manque <deal>` — pourquoi on est passé à côté d'un deal + leçon.
- `/ajouter-tache <description>` — ajoute une tâche récurrente ou ponctuelle.

## Les 4 flux
- **A. Deals** : 20-50 M€, PME FR, 6 secteurs (services B2B, santé, distribution,
  technologies, industries spécialisées, environnement), tous types d'opé.
- **B. Mercato** : mouvements de banquiers M&A / associés de fonds / conseils.
- **C. Normes** : ESG/SFDR/CSRD, AMF, carried — évolutions à impact réel.
- **D. Deals manqués** : gagnant, valo/multiple, conseil, pourquoi eux, leçon actionnable.

## Structure
```
veille-fonds/
├── CLAUDE.md                       # comportement de l'agent (4 flux + règles)
├── config/
│   ├── these-investissement.md     # périmètre B&Capital (rempli)
│   └── sources.md                  # connecteurs + web
├── veille/
│   ├── watchlist.md                # cibles / concurrents / intermédiaires
│   ├── journal-deals.md            # deals signalés (anti-doublon)
│   ├── deals-manques.md            # deals ratés + leçons
│   ├── mercato-normes.md           # mouvements banquiers + normes
│   └── taches.md                   # tâches récurrentes / ponctuelles
└── .claude/commands/               # /veille /deal /manque /ajouter-tache
```

## Connecteurs
Apollo, Lusha, Explorium répondent. PitchBook / S&P / Moody's : à brancher pour
fiabiliser les valos et multiples (utile surtout pour le flux D).

## Veille programmée (optionnel)
```bash
# lundi 8h — balayage auto écrit dans un fichier daté
0 8 * * 1 cd ~/veille-fonds && claude -p "/veille" >> veille/rapports-$(date +\%Y-\%m-\%d).md 2>&1
```
