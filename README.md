# Allinvest Sourcing
Assistant de recherche M&A pour les analystes d'Allinvest. Il trouve des **cibles**, des **acquéreurs** et des **transactions précédentes**, à partir de sources légales et officielles, avec chaque information sourcée et datée.
Vous n'avez pas besoin de savoir coder. Vous discutez avec l'assistant en français, normalement.
## Comment ça marche, en une phrase
Vous lui dites ce que vous cherchez, il vous pose les bonnes questions pour bien cadrer, il vous montre un récapitulatif, et il ne lance la recherche qu'une fois que vous avez dit "go".
## Les 3 portes d'entrée
Tapez simplement l'une de ces commandes pour démarrer, ou décrivez votre besoin en langage naturel.
| Vous voulez... | Tapez | Ce que vous obtenez |
|---|---|---|
| Trouver des cibles d'acquisition | `/cible` | Une screening list Excel de cibles qualifiées et sourcées |
| Trouver des acquéreurs potentiels | `/acquereur` | Un mapping d'acquéreurs (corporate et financiers) priorisés |
| Lister des deals passés du secteur | `/transactions` | Une table de transactions comparables avec multiples |
Vous pouvez aussi écrire directement, par exemple : "Je cherche des cibles dans la logistique du dernier kilomètre en France, 20 à 80 M€ de CA". L'assistant comprendra et lancera l'intake.
## Le déroulé type
1. **Vous lancez** une commande ou décrivez votre besoin.
2. **L'assistant vous pose des questions**, une par une (secteur, taille, géographie, thèse, etc.). Répondez simplement. Si vous ne savez pas, dites-le, il s'adapte.
3. **Il vous montre le cahier de recherche** : un résumé clair de ce qu'il va chercher.
4. **Vous validez** ("c'est bon, lance") ou vous ajustez.
5. **Il cherche**, en croisant les registres officiels et le web, puis vous livre un fichier Excel dans le dossier `outputs/`.
## Ce qui est garanti
- **Tout est sourcé et daté.** Chaque chiffre indique d'où il vient. Aucun chiffre inventé.
- **Sources légales en priorité.** Registres officiels (INSEE, INPI, BODACC, greffes), puis bases professionnelles d'Allinvest, puis sources primaires et presse spécialisée.
- **Les chiffres financiers sont croisés** sur plusieurs sources avant d'être retenus.
- **Confidentialité.** L'outil ne travaille que sur de la donnée publique. Ne collez jamais d'information client confidentielle (CIM, NDA, modèle, nom d'un mandat non public).
## Où sont mes résultats
Dans le dossier `outputs/`. Chaque fichier est nommé par secteur, type et date.
## Une question, un blocage
Demandez simplement à l'assistant. Pour les sujets techniques (mise à jour, accès aux bases payantes, sécurité), voir avec l'équipe technique d'Allinvest.
