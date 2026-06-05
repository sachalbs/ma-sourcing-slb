#!/usr/bin/env python3
"""
Recherche d'annonces BODACC (Bulletin officiel des annonces civiles et
commerciales) via l'API publique gratuite DILA / OpenDataSoft.
Signal M&A en temps reel : cessions de fonds, ventes, procedures collectives,
creations, modifications, depots de comptes. Source legale officielle.
Gratuit, sans cle. Dataset : annonces-commerciales.
Exemples :
  python bodacc.py --texte "cession fonds de commerce" --departement 75 --depuis 2024-01-01
  python bodacc.py --siren 552032534
  python bodacc.py --texte "boulangerie" --famille Ventes --csv ventes.csv
Doc : https://bodacc-datadila.opendatasoft.com/explore/dataset/annonces-commerciales/
"""
import argparse
import csv
import json
import sys
import urllib.parse
import urllib.request
BASE = ("https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/"
        "catalog/datasets/annonces-commerciales/records")
UA = "Allinvest-Sourcing/1.0 (recherche M&A, donnees publiques)"
def _get(params):
    url = f"{BASE}?{urllib.parse.urlencode(params, quote_via=urllib.parse.quote)}"
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))
def chercher(args):
    where = []
    if args.siren:
        where.append(f'registre LIKE "{args.siren}"')
    if args.departement:
        where.append(f'departement_traitement = "{args.departement}"')
    if args.famille:
        # familleavis : Creation, Ventes, Procedure collective, Modification, Depot des comptes...
        where.append(f'familleavis_lib LIKE "{args.famille}"')
    if args.depuis:
        where.append(f'dateparution >= "{args.depuis}"')
    if args.jusqua:
        where.append(f'dateparution <= "{args.jusqua}"')
    params = {
        "limit": min(args.limite, 100),
        "order_by": "dateparution desc",
    }
    if args.texte:
        params["q"] = args.texte
    if where:
        params["where"] = " AND ".join(where)
    try:
        data = _get(params)
    except Exception as e:
        print(f"Erreur API BODACC : {e}", file=sys.stderr)
        return []
    return data.get("results", [])
def simplifier(rec):
    return {
        "date_parution": rec.get("dateparution"),
        "famille": rec.get("familleavis_lib") or rec.get("familleavis"),
        "type_avis": rec.get("typeavis_lib") or rec.get("typeavis"),
        "registre": rec.get("registre"),
        "commercant": rec.get("commercant"),
        "ville": rec.get("ville"),
        "cp": rec.get("cp"),
        "departement": rec.get("departement_traitement"),
        "tribunal": rec.get("tribunal"),
        "numero_annonce": rec.get("numeroannonce"),
        "source": "BODACC / DILA (annonce legale officielle)",
    }
def main():
    p = argparse.ArgumentParser(description="Recherche BODACC, signaux M&A (source legale gratuite)")
    p.add_argument("--texte", help="Recherche plein texte dans l'annonce")
    p.add_argument("--siren", help="SIREN (recherche dans le registre)")
    p.add_argument("--departement", help="Code departement de traitement, ex 75")
    p.add_argument("--famille", help='Famille d\'avis : Ventes, "Procedure collective", Creation, Modification, "Depot des comptes"')
    p.add_argument("--depuis", help="Date min de parution AAAA-MM-JJ")
    p.add_argument("--jusqua", help="Date max de parution AAAA-MM-JJ")
    p.add_argument("--limite", type=int, default=50, help="Nombre max d'annonces (max 100)")
    p.add_argument("--csv", help="Chemin de sortie CSV (sinon affichage JSON)")
    args = p.parse_args()
    recs = chercher(args)
    lignes = [simplifier(r) for r in recs]
    if args.csv:
        if not lignes:
            print("Aucune annonce.", file=sys.stderr)
            return
        with open(args.csv, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(lignes[0].keys()))
            w.writeheader()
            w.writerows(lignes)
        print(f"{len(lignes)} annonces ecrites dans {args.csv}")
    else:
        print(json.dumps(lignes, ensure_ascii=False, indent=2))
        print(f"\n{len(lignes)} annonces trouvees.", file=sys.stderr)
if __name__ == "__main__":
    main()
