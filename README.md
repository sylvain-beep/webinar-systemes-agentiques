# Livre blanc Galadrim — Systèmes agentiques (landing page)

Landing page de téléchargement du livre blanc « Systèmes agentiques : du premier
diagnostic au retour sur investissement », destinée à une campagne publicitaire.

## Contenu

Site statique, sans build :

- `index.html` — la page complète (HTML / CSS / JS en ligne)
- `assets/`
  - `colors_and_type.css` — design tokens Galadrim (couleurs, typographie)
  - `galadrim-logo.svg` — logo, recoloré à l'exécution
  - `framer-motion-dom.js` — moteur d'animation (entrées, reveals au scroll)
  - `livre-blanc-galadrim-systemes-agentiques.pdf` — le livre blanc téléchargé

## Aperçu local

```bash
python3 -m http.server 8765
```

Puis ouvrir http://127.0.0.1:8765/

## Déploiement (GitHub Pages)

Settings → Pages → Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.

## À brancher

Le formulaire est aujourd'hui **simulé** : il ouvre le PDF mais ne capture aucun
email (voir le commentaire `NOTE:` dans le `<script>` de `index.html`). Pour la
campagne, brancher un service de capture de leads (HubSpot, Formspree, etc.).
