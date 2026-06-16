/**
 * Galadrim — Livre blanc « Systèmes agentiques »
 * Backend du formulaire de la landing page.
 *
 * À chaque soumission :
 *   1. envoie le PDF au lead, EN PIÈCE JOINTE, depuis ce compte Gmail ;
 *   2. enregistre le lead dans un Google Sheet (date, prénom, email, entreprise) ;
 *   3. envoie une notification de nouveau lead à NOTIFY_TO.
 *
 * Déploiement : voir apps-script/README.md
 */

// ─────────────────────────── CONFIG ───────────────────────────
// URL publique du PDF (servi par GitHub Pages). Le script le récupère ici
// pour le joindre à l'email. Adapte-la si l'URL finale du site change.
const PDF_URL   = 'https://sylvain-beep.github.io/webinar-systemes-agentiques/assets/livre-blanc-galadrim-systemes-agentiques.pdf';
const PDF_NAME  = 'Livre-blanc-Galadrim-Systemes-agentiques.pdf';

// ID du Google Sheet où logger les leads (la partie entre /d/ et /edit dans l'URL).
// Laisse '' pour désactiver le log. Le script crée l'onglet/les entêtes au besoin.
const SHEET_ID  = '1mbBXhcbT1zHhp3s1-2591X8JuVPbyEU5m5vqGw-PpCU';
const SHEET_TAB = 'Leads';

const NOTIFY_TO = 'sylvain@galadrim.ch';                 // notification de nouveau lead
const FROM_NAME = 'Sylvain de Muynck · Galadrim';        // nom affiché de l'expéditeur
const CALENDLY  = 'https://calendly.com/sylvain-galadrim/30min';
// ───────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    const prenom     = (p.prenom     || '').toString().trim();
    const email      = (p.email      || '').toString().trim();
    const entreprise = (p.entreprise || '').toString().trim();

    if (!prenom || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: 'invalid_input' });
    }

    // 1) PDF en pièce jointe (récupéré depuis l'URL publique)
    const pdf = UrlFetchApp.fetch(PDF_URL).getBlob().setName(PDF_NAME);

    // 2) Email au lead
    GmailApp.sendEmail(email, 'Votre livre blanc — Systèmes agentiques', plainBody(prenom), {
      name: FROM_NAME,
      htmlBody: htmlBody(prenom),
      attachments: [pdf],
      replyTo: NOTIFY_TO
    });

    // 3) Log dans le Google Sheet (si configuré)
    logToSheet(prenom, email, entreprise);

    // 4) Notification interne
    GmailApp.sendEmail(NOTIFY_TO, 'Nouveau lead livre blanc : ' + prenom,
      'Prénom : ' + prenom + '\nEmail : ' + email + '\nEntreprise : ' + (entreprise || '—'));

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, msg: 'Galadrim livre blanc endpoint' });
}

// ─────────────────────────── Helpers ──────────────────────────
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function logToSheet(prenom, email, entreprise) {
  if (!SHEET_ID) return;
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(SHEET_TAB);
  if (!sh) {
    sh = ss.insertSheet(SHEET_TAB);
    sh.appendRow(['Date', 'Prénom', 'Email', 'Entreprise']);
  }
  sh.appendRow([new Date(), prenom, email, entreprise || '']);
}

function plainBody(prenom) {
  return 'Bonjour ' + prenom + ',\n\n' +
    'Merci pour votre intérêt. Vous trouverez en pièce jointe le livre blanc ' +
    '« Systèmes agentiques : du premier diagnostic au retour sur investissement ».\n\n' +
    'Pour en discuter et identifier votre premier agent rentable, réservez 30 minutes avec moi, ' +
    'sans engagement : ' + CALENDLY + '\n\n' +
    'Bien à vous,\nSylvain de Muynck — Galadrim';
}

function htmlBody(prenom) {
  return '' +
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#0C1628;max-width:520px">' +
      '<p>Bonjour ' + escapeHtml(prenom) + ',</p>' +
      '<p>Merci pour votre intérêt. Vous trouverez en pièce jointe le livre blanc ' +
        '<b>« Systèmes agentiques : du premier diagnostic au retour sur investissement »</b>.</p>' +
      '<p>Pour en discuter et identifier votre premier agent rentable, réservez 30 minutes avec moi, sans engagement :</p>' +
      '<p><a href="' + CALENDLY + '" style="display:inline-block;background:#FF2362;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:600">Réserver un créneau</a></p>' +
      '<p style="margin-top:24px">Bien à vous,<br><b>Sylvain de Muynck</b><br>Galadrim — Studio de développement digital et IA</p>' +
    '</div>';
}

function escapeHtml(s) {
  return String(s).replace(/[<>&"']/g, function (c) {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
