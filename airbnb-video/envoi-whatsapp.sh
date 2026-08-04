#!/usr/bin/env bash
# Envoi de la premiere vague WhatsApp via Twilio.
# Rien ne part sans les trois variables ci-dessous.
#
#   TWILIO_SID=ACxxxxxxxx
#   TWILIO_TOKEN=xxxxxxxx
#   TWILIO_FROM=whatsapp:+14155238886     # expediteur WhatsApp Twilio
#   CONTENT_SID=HXxxxxxxxx                # modele valide par Meta
#
# Usage : TWILIO_SID=... TWILIO_TOKEN=... TWILIO_FROM=... CONTENT_SID=... ./envoi-whatsapp.sh
# Ajouter --dry-run pour afficher sans envoyer.

set -euo pipefail

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

for var in TWILIO_SID TWILIO_TOKEN TWILIO_FROM CONTENT_SID; do
  if [[ -z "${!var:-}" ]]; then
    echo "Variable manquante : $var" >&2
    exit 1
  fi
done

# Prospects de la premiere vague, du plus gros portefeuille au plus petit.
# Les variables du modele sont passees dans l'ordre : 1 = accroche propre a la societe.
PROSPECTS=(
  "+6281138200390|BaliSuperHost|you tell owners their villa is live across the OTAs within two to three weeks of onboarding"
  "+6281339783231|Balitecture|you are selling off-plan villas from \$199K across Uluwatu, Ubud and Canggu"
  "+6287861854989|Bali Management Villas|photoshoots are already part of what you do in house"
  "+628113905023|Betterplace|you sell owners on real ADR and occupancy benchmarks rather than promises"
  "+6281239012686|Bukit Vista|you built BV GO and GAIA in house"
)

SENT=0
FAILED=0

for row in "${PROSPECTS[@]}"; do
  IFS='|' read -r number name hook <<< "$row"

  echo "→ $name  ($number)"

  if $DRY_RUN; then
    echo "   [essai a blanc] accroche : $hook"
    continue
  fi

  response=$(curl -s -w "\n%{http_code}" -X POST \
    "https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json" \
    --data-urlencode "From=${TWILIO_FROM}" \
    --data-urlencode "To=whatsapp:${number}" \
    --data-urlencode "ContentSid=${CONTENT_SID}" \
    --data-urlencode "ContentVariables={\"1\":\"${hook}\"}" \
    -u "${TWILIO_SID}:${TWILIO_TOKEN}")

  code=$(tail -n1 <<< "$response")
  body=$(sed '$d' <<< "$response")

  if [[ "$code" == "201" ]]; then
    sid=$(grep -o '"sid": *"[^"]*"' <<< "$body" | head -1 | cut -d'"' -f4)
    echo "   envoye  ($sid)"
    SENT=$((SENT + 1))
  else
    echo "   echec   (HTTP $code)"
    echo "   $body" | head -c 300
    echo
    FAILED=$((FAILED + 1))
  fi

  # Espacement volontaire : une rafale degrade la note de qualite du numero.
  sleep 90
done

echo
echo "Envoyes : $SENT   Echecs : $FAILED"
