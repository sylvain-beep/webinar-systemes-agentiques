# Backend formulaire: Google Apps Script

Le formulaire de la landing envoie le livre blanc **par email depuis ton Gmail**
(`sylvain@galadrim.ch`), enregistre chaque lead dans un **Google Sheet**, et te
notifie. Aucun service tiers, aucun lien de téléchargement exposé sur la page.

## 1. (Optionnel mais recommandé) Créer le Google Sheet des leads

1. Crée un Google Sheet vide (ex. « Leads : Livre blanc »).
2. Dans son URL `https://docs.google.com/spreadsheets/d/XXXXXXXX/edit`,
   copie la partie `XXXXXXXX` : c'est le **SHEET_ID**.
3. Dans `Code.gs`, renseigne `const SHEET_ID = 'XXXXXXXX';`.
   (L'onglet `Leads` et ses entêtes sont créés automatiquement au 1er lead.)

## 2. Créer le script

1. Va sur https://script.google.com → **Nouveau projet**.
2. Connecte-toi avec **sylvain@galadrim.ch** (c'est ce compte qui enverra les emails).
3. Remplace le contenu de `Code.gs` par le fichier `Code.gs` de ce dossier.
4. Vérifie les constantes en haut du fichier (PDF_URL, SHEET_ID, NOTIFY_TO…).

## 3. Déployer en application web

1. **Déployer** → **Nouveau déploiement** → roue dentée → **Application Web**.
2. Réglages :
   - **Exécuter en tant que** : *Moi (sylvain@galadrim.ch)*
   - **Qui a accès** : *Tout le monde*
3. **Déployer** → autorise les accès Gmail/Sheets quand Google le demande.
4. Copie l'**URL de l'application Web** (se termine par `/exec`).

## 4. Brancher la page

Dans `index.html`, remplace :

```js
const ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_EXEC_URL_HERE';
```

par l'URL `/exec` copiée à l'étape précédente. Commit + push.

## Mettre à jour le script plus tard

Après toute modif de `Code.gs` : **Déployer** → **Gérer les déploiements** →
édite le déploiement existant → **Nouvelle version** (l'URL `/exec` reste la même).

## Notes

- Le PDF est récupéré depuis `PDF_URL` (l'URL publique GitHub Pages) pour être
  joint à l'email. Si tu changes le domaine du site, mets `PDF_URL` à jour.
- Le formulaire POST en `application/x-www-form-urlencoded` : c'est une requête
  « simple », donc pas de blocage CORS avec Apps Script.
- Quotas Gmail : ~100 envois/jour sur un compte Google Workspace standard
  (largement suffisant ; à surveiller si gros pic de campagne).
