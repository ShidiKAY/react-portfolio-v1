# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Portfolio – notes

- **Routes** : `/` (accueil), `/about` → redirect `/#toabout`, `/projects/:id`, `/labs`, `*` (404).
- **Projets** : ouverture en page pleine via `Link` vers `ProjectDetail` (plus de modal).
- **SEO** : `src/config/seo.js` contient `SEO_BASE_URL` (à remplacer par ton domaine en prod). OG/Twitter par page (Home, Labs, ProjectDetail). `public/robots.txt` et `public/sitemap.xml` (remplacer `your-portfolio-domain.com` si besoin).
- **PWA** : `public/manifest.webmanifest` + lien dans `index.html`. Pour un vrai offline, ajouter `vite-plugin-pwa`.
- **Tests** : `npm run test` lance Jest. Config : `jest.config.cjs`, mocks dans `src/__mocks__/`, helpers dans `src/test-utils.js`. Exemples : `App.test.jsx`, `About.test.jsx`, `Navbar.test.jsx`, `SkillsModern.test.jsx`. Pour un nouveau test : créer `Composant.test.jsx` à côté du composant et importer `@testing-library/react` + `@testing-library/jest-dom` ; utiliser `renderWithProviders` de `test-utils.js` si besoin de router/i18n.
