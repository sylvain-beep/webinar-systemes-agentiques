# Livre blanc Galadrim: Systèmes agentiques (landing page)

Landing page de téléchargement du livre blanc « Systèmes agentiques : du premier
diagnostic au retour sur investissement », destinée à une campagne publicitaire.

## Contenu

Site statique, sans build :

- `index.html` : la page complète (HTML / CSS / JS en ligne)
- `assets/`
  - `colors_and_type.css` : design tokens Galadrim (couleurs, typographie)
  - `galadrim-logo.svg` : logo, recoloré à l'exécution
  - `framer-motion-dom.js` : moteur d'animation (entrées, reveals au scroll)
  - `livre-blanc-galadrim-systemes-agentiques.pdf` : le livre blanc téléchargé

## Aperçu local

```bash
python3 -m http.server 8765
```

Puis ouvrir http://127.0.0.1:8765/

## Déploiement (GitHub Pages)

Settings → Pages → Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.

## Formulaire → envoi du PDF par email

À la soumission, le formulaire envoie les coordonnées à un script **Google Apps
Script** (hébergé sur le compte `sylvain@galadrim.ch`) qui :

1. envoie le livre blanc **par email**, en pièce jointe, depuis le Gmail de Sylvain ;
2. enregistre le lead dans un **Google Sheet** ;
3. notifie Sylvain du nouveau lead.

Le PDF n'est plus proposé en téléchargement direct sur la page.

Mise en place et déploiement du script : voir [`apps-script/README.md`](apps-script/README.md).
Une fois le script déployé, coller son URL `/exec` dans la constante `ENDPOINT`
du `<script>` de `index.html`.
