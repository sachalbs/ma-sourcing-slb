/**
 * Villa Films, envoi et suivi automatiques depuis sachalbs@gmail.com
 *
 * Ce script tourne dans le compte Google de Sacha, pas sur une machine tierce.
 * Il envoie tout seul, respecte la fenêtre brésilienne, espace les envois,
 * s'arrête sur une société dès qu'elle répond, et relance une seule fois à J+4.
 *
 * Installation : voir envoi-auto.md, cinq étapes, une seule fois.
 */

// ---------- réglages ----------

var SITE         = 'https://villa-films.vercel.app';
var EXPEDITEUR   = 'Sacha';        // nom affiché au destinataire
var MAX_PAR_JOUR = 20;             // plafond quotidien, un Gmail gratuit tient 500
var ESPACEMENT   = 8;              // minutes minimum entre deux envois
var JOURS_RELANCE = 4;             // relance unique à J+4
var MARQUEUR     = '##ENVIAR##';   // brouillon portant ce marqueur : nettoyé puis envoyé

var L_ENVOYE  = 'VF/envoye';
var L_REPONDU = 'VF/repondu';
var L_RELANCE = 'VF/relance';
var L_CLOS    = 'VF/clos';

var PROSPECTS = [
  {nome:"Latin Exclusive", mail:"info@latinexclusive.com", assunto:"Your free video, straight from a listing link",
   corpo:"Hi,\n\nSacha here, following up on our conversation about the vertical videos.\n\nYou don't need to gather anything on your side. Just send me the link to one of your listings and I'll pull the photos straight from it. Around 20 seconds, vertical, back within 24 hours.\n\nIt works for both sides of your portfolio: the same video sells a rental week and a property for sale.\n\nThe first one is on me, no commitment. After that: 59 dollars per video, 39 in a pack of ten, or 890 a month for a continuous flow.\n\nAn example of what I deliver: https://villa-films.vercel.app\n\nBest,\nSacha"},
  {nome:"Holmy, Estefany", mail:"comercial@holmy.com.br", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá Estefany,\n\nMeu nome é Sacha, falei com a equipe de vocês no Instagram e me indicaram você.\n\nEu transformo as fotos que já estão no anúncio em vídeo vertical de 20 segundos, pronto em 24 horas. Sem fotógrafo, sem agenda, sem ninguém entrando na casa. Serve para a capa, para Reels e para TikTok.\n\nVi o volume de casas que vocês listam em Trancoso. Nesse ritmo, sessão de vídeo casa por casa não fecha a conta. Como não tem deslocamento nem produção no local, dá para rodar em lote: dez imóveis, dez vídeos, de volta em 72 horas.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Me manda o link de um anúncio e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"Matueté Villas", mail:"villas@matuete.com", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nVi o catálogo de vocês, com casas em Trancoso, Búzios, Angra e Ilhabela no mesmo lugar, e reparei que quase tudo é apresentado só em foto.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"Villas in Brazil", mail:"info@villasinbrazil.com", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nBoa parte dos hóspedes de vocês reserva de fora do Brasil, sem nunca ter visto a casa pessoalmente. O vídeo é o que chega mais perto de uma visita.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"WhereInRio", mail:"info@whereinrio.com", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nCasa assinada por arquiteto é justamente o que a foto parada não mostra: o volume do espaço e a passagem de um ambiente pro outro.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"NIAMÃ", mail:"reservas@niama.com.br", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nVi as casas de vocês em Altos de Trancoso e o serviço que vem junto. Isso se mostra melhor em movimento do que em foto parada.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"Cocar Trancoso", mail:"reservas@cocartrancoso.com", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nComo vocês operam só as casas de vocês, o padrão visual do anúncio é decisão de vocês, sem precisar convencer proprietário nenhum.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"OmniVillas", mail:"hello@omnivillas.com", assunto:"Vertical video from the photos already on your listings",
   corpo:"Hi,\n\nMy name is Sacha. I turn the photos already on a property listing into a vertical video of about 20 seconds, back within 24 hours. No photographer, no scheduling, nobody entering the house.\n\nYou manage homes across several countries, so the bottleneck is never one house, it is doing it at portfolio scale. There is no travel and no on-site production here, so it runs in batches: ten homes, ten videos, all back within 72 hours.\n\nPricing: 59 dollars per video, 39 in a pack of ten, or 890 a month for a continuous flow.\n\nThe first one is on me, no commitment. Just send me the link to one of your listings and I'll take the photos from there.\n\nAn example of what I deliver: https://villa-films.vercel.app\n\nBest,\nSacha"},
  {nome:"Villas de Trancoso", mail:"reservas@villasdetrancoso.com", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nAs villas de vocês carregam o nome do resort, então o padrão da imagem conta. Um vídeo por villa mantém esse padrão nos anúncios e no Instagram.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"Porto Bracuhy Imóveis", mail:"contato@portobracuhy.com.br", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nCondomínio com marina e casas de frente pro mar é material muito visual, e hoje está tudo parado em foto.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"Bahia Luxury", mail:"contato@bahialuxury.com.br", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nO portfólio de vocês está inteiro em foto, sem nenhum vídeo. Em Trancoso, quem chega pelo Instagram decide no primeiro segundo.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"Smartbnb", mail:"contato@smartbnb.com.br", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nNo Rio a concorrência é enorme e quem decide o clique é a capa do anúncio. E vocês colocam imóvel novo no ar o tempo todo: um por um não acompanha esse ritmo.\n\nComo não tem deslocamento nem produção no local, dá para rodar em lote: dez imóveis, dez vídeos, de volta em 72 horas.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"Floripa Minha Hospedagem", mail:"contato@floripaminhahospedagem.com.br", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nVocês entraram na rede de cohosts do Airbnb e recebem imóvel novo o tempo todo. Sessão de vídeo um por um não acompanha esse ritmo.\n\nComo não tem deslocamento nem produção no local, dá para rodar em lote: dez imóveis, dez vídeos, de volta em 72 horas.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"},
  {nome:"HostnJoy", mail:"contato@hostnjoy.com", assunto:"Vídeo vertical a partir das fotos que vocês já têm",
   corpo:"Olá,\n\nMeu nome é Sacha. Eu transformo as fotos que já estão no anúncio de uma casa em um vídeo vertical de uns 20 segundos, pronto em 24 horas. Sem diária de fotógrafo, sem agenda, sem ninguém entrando na casa.\n\nVocês operam em cinco cidades. A conta que importa aí não é o preço de um vídeo, é o custo por imóvel.\n\nComo não tem deslocamento nem produção no local, dá para rodar em lote: dez imóveis, dez vídeos, de volta em 72 horas.\n\nValores: 59 dólares o vídeo avulso, 39 no pacote de dez, ou 890 por mês para um fluxo contínuo.\n\nFaço o primeiro por minha conta, sem compromisso. Não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá.\n\nExemplo: https://villa-films.vercel.app\n\nFico à disposição,\nSacha"}
];

// ---------- fenêtre d'envoi ----------

/** Fenêtre Brésil : 14 h - 17 h et 19 h - 23 h heure de Paris, du lundi au vendredi. */
function dansLaFenetre_() {
  var now = new Date();
  var jour = Number(Utilities.formatDate(now, 'Europe/Paris', 'u')); // 1 = lundi
  var heure = Number(Utilities.formatDate(now, 'Europe/Paris', 'H'));
  if (jour > 5) return false;
  return (heure >= 14 && heure < 17) || (heure >= 19 && heure < 23);
}

function props_() { return PropertiesService.getScriptProperties(); }

function jourCourant_() {
  return Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd');
}

function compteurDuJour_() {
  var p = props_();
  if (p.getProperty('jour') !== jourCourant_()) {
    p.setProperty('jour', jourCourant_());
    p.setProperty('envoyes', '0');
  }
  return Number(p.getProperty('envoyes') || 0);
}

function incrementer_() {
  props_().setProperty('envoyes', String(compteurDuJour_() + 1));
  props_().setProperty('dernierEnvoi', String(Date.now()));
}

function espacementRespecte_() {
  var dernier = Number(props_().getProperty('dernierEnvoi') || 0);
  return (Date.now() - dernier) >= ESPACEMENT * 60 * 1000;
}

function label_(nom) {
  return GmailApp.getUserLabelByName(nom) || GmailApp.createLabel(nom);
}

/** Une société a répondu si un message venant d'elle existe dans la boîte. */
function aRepondu_(mail) {
  return GmailApp.search('from:' + mail + ' newer_than:60d', 0, 1).length > 0;
}

/** Société déjà contactée, pour ne jamais écrire deux fois. */
function dejaEnvoye_(mail) {
  return GmailApp.search('to:' + mail + ' in:sent newer_than:90d', 0, 1).length > 0;
}

function marquerFil_(mail, nomLabel) {
  var fils = GmailApp.search('to:' + mail + ' in:sent newer_than:2d', 0, 1);
  if (fils.length) fils[0].addLabel(label_(nomLabel));
}

// ---------- 1. la vague, et le canal de réponse de l'agent ----------

/** Envoie au plus un mail par passage, dans la fenêtre, en respectant l'espacement. */
function cicloEnvio() {
  if (!dansLaFenetre_()) return;
  if (compteurDuJour_() >= MAX_PAR_JOUR) return;
  if (!espacementRespecte_()) return;

  // les brouillons préparés par l'agent passent en premier, ce sont des réponses
  if (envoyerUnBrouillon_()) return;

  for (var i = 0; i < PROSPECTS.length; i++) {
    var p = PROSPECTS[i];
    if (dejaEnvoye_(p.mail)) continue;
    if (aRepondu_(p.mail)) continue;

    GmailApp.sendEmail(p.mail, p.assunto, p.corpo, { name: EXPEDITEUR });
    incrementer_();
    marquerFil_(p.mail, L_ENVOYE);
    Logger.log('envoyé à ' + p.nome + ' (' + p.mail + ')');
    return; // un seul par passage
  }
}

/**
 * L'agent dépose un brouillon dont le corps se termine par ##ENVIAR##.
 * Ce script le nettoie et l'envoie. C'est ainsi que l'agent répond aux
 * prospects sans avoir lui même le droit d'envoyer.
 */
function envoyerUnBrouillon_() {
  var brouillons = GmailApp.getDrafts();
  for (var i = 0; i < brouillons.length; i++) {
    var msg = brouillons[i].getMessage();
    var corps = msg.getPlainBody();
    if (corps.indexOf(MARQUEUR) === -1) continue;

    var propre = corps.replace(MARQUEUR, '').replace(/\s+$/, '');
    brouillons[i].update(msg.getTo(), msg.getSubject(), propre, { name: EXPEDITEUR });
    brouillons[i].send();
    incrementer_();
    Logger.log('réponse envoyée à ' + msg.getTo());
    return true;
  }
  return false;
}

// ---------- 2. la relance unique à J+4 ----------

function relanceJ4() {
  if (!dansLaFenetre_()) return;
  if (compteurDuJour_() >= MAX_PAR_JOUR) return;
  if (!espacementRespecte_()) return;

  var limite = new Date().getTime() - JOURS_RELANCE * 24 * 3600 * 1000;

  for (var i = 0; i < PROSPECTS.length; i++) {
    var p = PROSPECTS[i];
    if (aRepondu_(p.mail)) continue;

    var fils = GmailApp.search('to:' + p.mail + ' in:sent', 0, 1);
    if (!fils.length) continue;
    if (fils[0].getLastMessageDate().getTime() > limite) continue;

    var labels = fils[0].getLabels().map(function (l) { return l.getName(); });
    if (labels.indexOf(L_RELANCE) !== -1) continue; // une seule relance, jamais deux
    if (labels.indexOf(L_CLOS) !== -1) continue;

    fils[0].reply(texteRelance_(), { name: EXPEDITEUR });
    incrementer_();
    fils[0].addLabel(label_(L_RELANCE));
    Logger.log('relance envoyée à ' + p.nome);
    return;
  }
}

function texteRelance_() {
  return 'Olá,\n\n'
    + 'Só para saber se faz sentido para vocês. A primeira peça continua por minha conta, '
    + 'e não precisa juntar nada: me manda o link de um anúncio de vocês e eu tiro as fotos de lá. '
    + 'Devolvo em 24 horas.\n\n'
    + 'Exemplo: ' + SITE + '\n\n'
    + 'Abraço,\nSacha';
}

// ---------- 3. marquer les réponses reçues ----------

/** Étiquette les fils où le prospect a répondu, pour que l'agent les repère. */
function marcarRespostas() {
  for (var i = 0; i < PROSPECTS.length; i++) {
    var fils = GmailApp.search('from:' + PROSPECTS[i].mail + ' newer_than:60d', 0, 3);
    for (var j = 0; j < fils.length; j++) {
      var labels = fils[j].getLabels().map(function (l) { return l.getName(); });
      if (labels.indexOf(L_REPONDU) === -1) fils[j].addLabel(label_(L_REPONDU));
    }
  }
}

// ---------- 4. installation et pilotage ----------

/** À lancer une seule fois. Installe les minuteurs et crée les étiquettes. */
function instalarGatilhos() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });

  ScriptApp.newTrigger('cicloEnvio').timeBased().everyMinutes(10).create();
  ScriptApp.newTrigger('marcarRespostas').timeBased().everyHours(1).create();
  ScriptApp.newTrigger('relanceJ4').timeBased().everyHours(4).create();

  [L_ENVOYE, L_REPONDU, L_RELANCE, L_CLOS].forEach(function (n) { label_(n); });

  Logger.log('Minuteurs installés. La vague part au prochain créneau brésilien.');
}

/** Arrêt d'urgence, coupe tout. */
function pararTudo() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  Logger.log('Tout est arrêté, plus aucun envoi automatique.');
}

/** État courant, à lire dans les journaux d'exécution. */
function estado() {
  var restants = 0;
  for (var i = 0; i < PROSPECTS.length; i++) {
    if (!dejaEnvoye_(PROSPECTS[i].mail)) restants++;
  }
  Logger.log('Fenêtre ouverte : ' + dansLaFenetre_());
  Logger.log('Envoyés aujourd hui : ' + compteurDuJour_() + ' sur ' + MAX_PAR_JOUR);
  Logger.log('Sociétés restant à contacter : ' + restants + ' sur ' + PROSPECTS.length);
  Logger.log('Minuteurs actifs : ' + ScriptApp.getProjectTriggers().length);
}
