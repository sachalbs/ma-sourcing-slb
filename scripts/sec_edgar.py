#!/usr/bin/env python3
"""
Recherche sur SEC EDGAR : societes cotees US et etrangeres enregistrees.
Utile pour qualifier des acquereurs cotes ou des cibles US, lire les filings
(10-K, 10-Q, 8-K) et recuperer des financials publics (XBRL).
Gratuit, sans cle. Un User-Agent identifiant est requis par la SEC.
Exemples :
  python sec_edgar.py --rechercher "Schneider Electric"
  python sec_edgar.py --cik 0000320193 --facts CA
  python sec_edgar.py --recents-8k 0000320193
Doc : https://www.sec.gov/search-filings/edgar-application-programming-interfaces
"""
import argparse
import json
import sys
import urllib.parse
import urllib.request
# La SEC impose un User-Agent avec un contact. A personnaliser par Allinvest.
UA = "Allinvest Corporate Finance research contact@allinvest.example"
TICKERS_URL = "https://www.sec.gov/files/company_tickers.json"
SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik}.json"
FACTS = "https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json"
def _get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))
def _cik10(cik):
    return str(cik).lstrip("CIK").zfill(10)
def rechercher(nom):
    """Recherche une societe par nom dans la table des tickers SEC."""
    data = _get(TICKERS_URL)
    nom_l = nom.lower()
    res = []
    for item in data.values():
        if nom_l in item.get("title", "").lower():
            res.append({
                "nom": item.get("title"),
                "ticker": item.get("ticker"),
                "cik": _cik10(item.get("cik_str")),
                "source": "SEC EDGAR company_tickers",
            })
    return res[:25]
def derniers_filings(cik, type_filtre=None, limite=15):
    data = _get(SUBMISSIONS.format(cik=_cik10(cik)))
    recent = data.get("filings", {}).get("recent", {})
    formes = recent.get("form", [])
    dates = recent.get("filingDate", [])
    accnos = recent.get("accessionNumber", [])
    docs = recent.get("primaryDocument", [])
    out = []
    for i in range(len(formes)):
        if type_filtre and formes[i] != type_filtre:
            continue
        out.append({
            "type": formes[i],
            "date": dates[i] if i < len(dates) else None,
            "accession": accnos[i] if i < len(accnos) else None,
            "document": docs[i] if i < len(docs) else None,
            "source": "SEC EDGAR submissions",
        })
        if len(out) >= limite:
            break
    return {"societe": data.get("name"), "cik": _cik10(cik), "filings": out}
# Concepts XBRL US-GAAP usuels
CONCEPTS = {
    "CA": "Revenues",
    "REVENUE": "RevenueFromContractWithCustomerExcludingAssessedTax",
    "NET_INCOME": "NetIncomeLoss",
    "ASSETS": "Assets",
    "EBIT": "OperatingIncomeLoss",
}
def facts(cik, concept_cle):
    concept = CONCEPTS.get(concept_cle.upper(), concept_cle)
    url = f"https://data.sec.gov/api/xbrl/companyconcept/CIK{_cik10(cik)}/us-gaap/{concept}.json"
    try:
        data = _get(url)
    except Exception as e:
        return {"erreur": f"{concept} indisponible : {e}"}
    unites = data.get("units", {})
    serie = []
    for unite, vals in unites.items():
        for v in vals:
            if v.get("form") in ("10-K", "20-F"):
                serie.append({
                    "fin": v.get("end"),
                    "valeur": v.get("val"),
                    "unite": unite,
                    "annee_fiscale": v.get("fy"),
                    "form": v.get("form"),
                })
    serie = sorted(serie, key=lambda x: x.get("fin") or "")[-8:]
    return {
        "societe": data.get("entityName"),
        "concept": concept,
        "serie": serie,
        "source": "SEC EDGAR XBRL companyconcept",
    }
def main():
    p = argparse.ArgumentParser(description="Recherche SEC EDGAR (source legale gratuite, US)")
    p.add_argument("--rechercher", help="Recherche une societe cotee par nom")
    p.add_argument("--cik", help="CIK de la societe")
    p.add_argument("--facts", help="Concept financier a extraire (CA, NET_INCOME, ASSETS, EBIT...)")
    p.add_argument("--recents-8k", dest="recents_8k", help="Derniers 8-K (operations) pour un CIK")
    p.add_argument("--filings", action="store_true", help="Derniers filings pour le CIK")
    args = p.parse_args()
    if args.rechercher:
        print(json.dumps(rechercher(args.rechercher), ensure_ascii=False, indent=2))
    elif args.recents_8k:
        print(json.dumps(derniers_filings(args.recents_8k, "8-K"), ensure_ascii=False, indent=2))
    elif args.cik and args.facts:
        print(json.dumps(facts(args.cik, args.facts), ensure_ascii=False, indent=2))
    elif args.cik and args.filings:
        print(json.dumps(derniers_filings(args.cik), ensure_ascii=False, indent=2))
    else:
        p.print_help()
if __name__ == "__main__":
    main()
