# Agent de veille deal sourcing — pour Claude Code

Projet Claude Code préconfiguré pour faire de la veille sur les deals récents pertinents
pour ton fonds, et auquel tu peux ajouter des tâches.

## Installation (2 min)
1. Décompresse ce dossier là où tu veux (ex. `~/veille-fonds`).
2. Ouvre un terminal dedans et lance `claude`.
3. Vérifie que tes connecteurs (PitchBook, S&P, Moody's, Lusha, Apollo, Explorium) sont
   bien branchés dans Claude Code (réglages MCP). C'est ce qui rend la veille puissante.
4. **Remplis `config/these-investissement.md`** avec les vrais critères de ton fonds.
   (Ou colle-moi ta thèse ici et je te le pré-remplis.)

## Utilisation
- `/veille` — balayage des deals récents matchant ta thèse. Le rapport s'affiche
  directement dans Claude. Ajoute un focus : `/veille focus healthtech France`.
- `/deal <nom>` — deep-dive sur une cible précise.
- `/ajouter-tache <description>` — ajoute une tâche récurrente ou ponctuelle.

## Structure
```
veille-fonds/
├── CLAUDE.md                       # cerveau de l'agent (comportement + règles)
├── config/
│   ├── these-investissement.md     # ⚠️ à remplir : ce que tu cherches
│   └── sources.md                  # où chercher (connecteurs + web)
├── veille/
│   ├── watchlist.md                # cibles / concurrents / thèmes suivis
│   ├── journal-deals.md            # deals déjà signalés (anti-doublon)
│   └── taches.md                   # tes tâches récurrentes / ponctuelles
└── .claude/commands/               # /veille, /deal, /ajouter-tache
```

## Veille vraiment automatique (optionnel)
Claude Code déclenche à la demande. Pour un balayage programmé sans rien faire, mets un cron
qui appelle Claude en mode headless et écrit le résultat dans un fichier daté :
```bash
# tous les lundis à 8h — adapte le chemin
0 8 * * 1 cd ~/veille-fonds && claude -p "/veille" >> veille/rapports-$(date +\%Y-\%m-\%d).md 2>&1
```
Tu retrouveras les rapports dans le dossier, et tu peux ensuite en discuter avec Claude.
