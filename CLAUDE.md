# Villa Films
Villa Films transforme les photos déjà présentes dans une annonce de villa en vidéo verticale de 20 secondes, livrée en 24 heures. Cible : les sociétés de location et de gestion de villas, d'abord au Brésil, puis en Indonésie. Le projet vit dans le dossier `airbnb-video/`.
Structure présentée aux prospects : Sacha, indépendant, opérant sous le nom Villa Films. Ne pas promettre de nota fiscal brésilienne, une facture française suffit.
**Adresse d'expédition de toute la prospection depuis le 4 août 2026 : sachalbs@gmail.com**, une seule identité. L'adresse sachalbs@outlook.com reste valable pour les conversations ouvertes avant cette date, on ne change pas d'adresse au milieu d'un échange.
Site de démonstration : https://villa-films.vercel.app
## Ton et style
- Français clair, pas de jargon technique. Ne pas montrer de code ni de commandes sauf demande explicite.
- Concis et factuel, pas de remplissage.
- Ne jamais utiliser de tirets longs. Utiliser virgules, points ou reformulations.
- Si quelque chose échoue techniquement, l'expliquer simplement et proposer une alternative.
## Positionnement commercial, à ne pas déformer
- **Un seul visuel offert par société**, en démonstration, sans engagement. Ce n'est pas "les premières vidéos" ni "la vidéo entière". La suite est payante.
- Grille tarifaire : **59 dollars la vidéo à l'unité, 39 dollars par vidéo en pack de dix, 890 dollars par mois** pour un flux continu.
- Deux angles de vente. Pour les villas de luxe : ce que la photo fixe ne montre pas, le volume, le passage d'une pièce à l'autre, la lumière. Pour la gestion locative en volume : le débit et le coût par bien, le traitement par lots. **Ne jamais employer le mot "IA" avec les villas de luxe.**
## Langue et restitution
Les échanges avec les prospects brésiliens se rédigent **en portugais du Brésil**. Toujours accompagner d'une traduction ou d'un résumé en français pour Sacha, qui ne relit pas le portugais. Même logique pour l'Indonésie le jour venu, en anglais.
## Canaux et cadence
- Le numéro WhatsApp personnel a été restreint le 4 août 2026 après une première vague de douze messages. **Ne plus proposer d'envoi en rafale depuis ce numéro.**
- **L'envoi automatique passe par `envoi-auto.gs`**, un script hébergé dans le compte Google de Sacha. Rien ne peut envoyer de mail depuis l'environnement de travail, vérifié le 4 août 2026 sur les quatre voies possibles : le connecteur Gmail n'a pas de fonction d'envoi, l'API Google et le SMTP sont fermés par la politique réseau. Un agent qui doit faire partir un message **écrit un brouillon terminé par `##ENVIAR##`**, le script l'envoie dans les dix minutes.
- Instagram et WhatsApp ne sont pas automatisables, les règles de Meta interdisent l'approche à froid programmée. Instagram reste manuel, WhatsApp est arrêté.
- Canal principal depuis le 4 août 2026 : **le mail**, sans plafond quotidien. Instagram reste ouvert mais lent, quinze par jour maximum, cinq minutes d'écart.
- Jamais deux canaux le même jour vers la même société. Relance unique à J+4.
- Fenêtre d'envoi Brésil : 14 h - 17 h et 19 h - 23 h heure de Paris, du lundi au vendredi. Au moins une minute entre deux mails.
## Format attendu des livrables de prospection
Sacha travaille depuis son téléphone. Un message qu'il doit recomposer à la main est un message qui ne part pas.
- Fournir systématiquement un **lien cliquable qui préremplit tout** : destinataire, objet, corps. Pour le mail, un lien de rédaction Gmail et un lien vers l'application, les deux.
- Garder ces liens **courts, sous 1500 caractères**, sinon certains clients les tronquent. Raccourcir le texte du message plutôt que de laisser un lien trop long.
- Toujours doubler le lien d'une version en texte brut à copier, en secours.
- **Ne jamais demander au prospect de rassembler des photos.** Demander le lien d'une de ses annonces, les photos se prennent dessus. La demande de six à dix photos est ce qui a bloqué Latin Exclusive.
## Quand produire la vidéo offerte, règle stricte
Une vidéo coûte cher au regard du stock : il reste **262 crédits au 4 août 2026, soit quatre vidéos** à 60 crédits pièce. On ne génère donc **pas après une simple réponse**, on génère quand la signature est proche. Les trois conditions doivent être réunies :
1. Le prospect a **désigné un bien précis**, en envoyant le lien d'une annonce ou des photos.
2. Le **prix a été annoncé** et n'a pas fait reculer.
3. L'interlocuteur est **celui qui décide**, ou l'a explicitement relayé à son décideur.
Un "intéressant, envoyez un exemple" ne remplit aucune des trois. Dans ce cas, renvoyer le site de démonstration, qui ne coûte rien.
Ne jamais promettre plus de visuels offerts qu'il n'y a de crédits en réserve. Au delà, recharger : l'abonnement Ultra annuel donne cinquante vidéos par mois pour 99 €.
**Sacha est prévenu uniquement à ce moment là**, quand les trois conditions sont réunies et qu'il faut lancer la production. Le reste du cycle ne le sollicite pas.
## Fichiers de référence
| Fichier | Contenu |
|---|---|
| `envoi-auto.gs` | Script Apps Script qui envoie la vague et les relances seul, depuis le compte Google de Sacha |
| `envoi-auto.md` | Notice d'installation du script, cinq étapes, et protocole du marqueur `##ENVIAR##` |
| `agent-reponses.md` | Cadre dans lequel un agent répond seul aux prospects, limites, motifs de notification |
| `infra-agents.md` | Architecture de la prospection tenue par des agents, couche par couche |
| `ce-soir.md` | Plan de la soirée du 4 août, ordre d'envoi, contraintes |
| `prospects-bresil.csv` | Les sociétés brésiliennes, contacts, fiabilité des adresses, angles, statut |
| `vague-mail.html` | Console de la vague mail, quatorze sociétés, liens préremplis |
| `console-bresil.html` | Console d'envoi Instagram et WhatsApp |
| `bresil-premiere-vague.md` | Stratégie de la première vague, choix du Brésil, cadence |
| `bresil-instagram-et-mails.md` | Messages Instagram et mails prêts à envoyer, un par société |
| `economie-et-paiement.md` | Modèle économique, protection contre le non-paiement |
| `site/index.html` | Site de démonstration Villa Films |
| `prospects-indonesie.csv` | Deuxième marché, pas encore attaqué |
## État au 4 août 2026
- **Holmy** : leur équipe a redirigé vers Estefany, comercial@holmy.com.br. Mail prêt, premier à partir.
- **Latin Exclusive** : en discussion, bloqué sur l'envoi des photos. Adresse trouvée le 4 août, info@latinexclusive.com. La relance demande un lien d'annonce au lieu des photos.
- Douze autres sociétés ont une adresse exploitable et un message prêt dans `vague-mail.html`.
- Neuf sociétés repérées sans adresse, à récupérer depuis leur page contact. Les deux qui valent le détour : **Seazone** (Florianópolis, plus de 250 collaborateurs, tout le Brésil) et **Anfitriões de Aluguel** (réseau en franchise).
- Les adresses relevées en recherche sans avoir pu ouvrir la page du site sont signalées dans le CSV et marquées d'une étoile dans la console. Elles peuvent rebondir.
