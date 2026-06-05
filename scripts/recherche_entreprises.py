#!/usr/bin/env python3
"""
Recherche d'entreprises francaises via l'API officielle gratuite
recherche-entreprises.api.gouv.fr (agrege INSEE/SIRENE, INPI/RNE, greffes).
Gratuit, sans cle, sans authentification. Source legale officielle.
Exemples :
  python recherche_entreprises.py --texte "maintenance CVC" --departement 69 --min-effectif 20
  python recherche_entreprises.py --naf 43.22A --region 84 --pages 3 --csv sortie.csv
  python recherche_entreprises.py --siren 552032534
Doc API : https://recherche-entreprises.api.gouv.fr/docs/
"""
import argparse
import csv
import json
import sys
import time
import urllib.parse
import urllib.request
BASE = "https://recherche-entreprises.api.gouv.fr"
UA = "Allinvest-Sourcing/1.0 (recherche M&A, donnees publiques)"
def _get(path, params):
    url = f"{BASE}{path}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))
def chercher(args):
    """Recherche multicritere. Retourne la liste des entreprises agregees."""
    resultats = []
    for page in range(1, args.pages + 1):
        params = {"page": page, "per_page": 25}
        if args.texte:
            params["q"] = args.texte
        if args.naf:
            params["activite_principale"] = args.naf
        if args.departement:
            params["departement"] = args.departement
        if args.region:
            params["region"] = args.region
        if args.code_postal:
            params["code_postal"] = args.code_postal
        if args.min_effectif is not None:
            # tranches INSEE : 11=10-19, 12=20-49, 21=50-99, 22=100-199, etc.
            params["tranche_effectif_salarie_min"] = args.min_effectif
        if args.section_naf:
            params["section_activite_principale"] = args.section_naf
        try:
            data = _get("/search", params)
        except Exception as e:
            print(f"Erreur page {page} : {e}", file=sys.stderr)
            break
        lot = data.get("results", [])
        if not lot:
            break
        resultats.extend(lot)
        if page >= data.get("total_pages", page):
            break
        time.sleep(0.2)  # courtoisie envers l'API publique
    return resultats
def par_siren(siren):
    data = _get("/search", {"q": siren})
    return data.get("results", [])
def simplifier(e):
    """Extrait les champs utiles pour le sourcing M&A."""
    siege = e.get("siege") or {}
    dirigeants = e.get("dirigeants") or []
    noms_dir = []
    for d in dirigeants[:5]:
        nom = d.get("nom_complet") or " ".join(
            x for x in [d.get("prenoms"), d.get("nom")] if x
        ) or d.get("denomination")
        if nom:
            qualite = d.get("qualite")
            noms_dir.append(f"{nom} ({qualite})" if qualite else nom)
    return {
        "denomination": e.get("nom_complet") or e.get("nom_raison_sociale"),
        "siren": e.get("siren"),
        "naf": siege.get("activite_principale") or e.get("activite_principale"),
        "tranche_effectif": e.get("tranche_effectif_salarie"),
        "annee_effectif": e.get("annee_tranche_effectif_salarie"),
        "date_creation": e.get("date_creation"),
        "ville": siege.get("libelle_commune"),
        "code_postal": siege.get("code_postal"),
        "departement": siege.get("departement"),
        "dirigeants": " ; ".join(noms_dir) if noms_dir else "n.d.",
        "etat": e.get("etat_administratif"),
        "source": "recherche-entreprises.api.gouv.fr (INSEE/INPI/greffes)",
    }
def main():
    p = argparse.ArgumentParser(description="Recherche d'entreprises FR (source legale gratuite)")
    p.add_argument("--texte", help="Recherche plein texte (activite, nom, mots-cles)")
    p.add_argument("--naf", help="Code NAF/APE exact, ex 43.22A")
    p.add_argument("--section-naf", help="Section NAF (lettre), ex F pour construction")
    p.add_argument("--departement", help="Code departement, ex 69")
    p.add_argument("--region", help="Code region INSEE, ex 84")
    p.add_argument("--code-postal", help="Code postal")
    p.add_argument("--min-effectif", type=int,
                   help="Tranche effectif min (code INSEE : 11=10-19, 12=20-49, 21=50-99, 22=100-199, 31=200-249, 32=250-499...)")
    p.add_argument("--siren", help="Recherche directe par SIREN")
    p.add_argument("--pages", type=int, default=2, help="Nombre de pages (25 resultats/page)")
    p.add_argument("--csv", help="Chemin de sortie CSV (sinon affichage JSON)")
    args = p.parse_args()
    if args.siren:
        bruts = par_siren(args.siren)
    else:
        bruts = chercher(args)
    lignes = [simplifier(e) for e in bruts]
    if args.csv:
        if not lignes:
            print("Aucun resultat.", file=sys.stderr)
            return
        with open(args.csv, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(lignes[0].keys()))
            w.writeheader()
            w.writerows(lignes)
        print(f"{len(lignes)} entreprises ecrites dans {args.csv}")
    else:
        print(json.dumps(lignes, ensure_ascii=False, indent=2))
        print(f"\n{len(lignes)} entreprises trouvees.", file=sys.stderr)
if __name__ == "__main__":
    main()
