# Performance & Core Web Vitals

## Stratégie images (WebP / AVIF)

Pour viser un score Lighthouse 100 et un LCP optimal :

1. **Formats**  
   Proposer des versions **WebP** et **AVIF** en plus du PNG/JPEG pour les images du portfolio (`/public/images/` et `/public/images/project-images/`).

2. **Implémentation**  
   Utiliser `<picture>` avec `source` pour les images clés :
   - `profile.png` (À propos)
   - `profile-rounded2.png` (favicon / partage)
   - Logos projets dans les cartes et la page détail

   Exemple :

   ```html
   <picture>
     <source srcSet="/images/profile.webp" type="image/webp" />
     <source srcSet="/images/profile.avif" type="image/avif" />
     <img src="/images/profile.png" alt="..." loading="lazy" decoding="async" width="200" height="200" />
   </picture>
   ```

3. **Génération des assets**  
   En build ou en amont, générer WebP/AVIF à partir des PNG/JPEG (outils : `sharp`, `squoosh`, ou pipeline CI).

4. **Déjà en place**  
   - `loading="lazy"` sur les images below-the-fold  
   - `decoding="async"` et dimensions explicites (évitent le CLS)  
   - Lazy-load du composant About et de la langue EN

## Fichiers de traduction

Les JSON (`fr.json`, `en.json`) sont minifiés automatiquement en production par Vite. La langue non par défaut (EN) est chargée à la demande pour réduire le bundle initial.

## Build

- Chunks manuels : `react-vendor`, `framer`, `router`, `i18n`, `lang-en`.
- Pas de Bootstrap ni de CSS tiers inutiles en bloc ; le rendu critique reste léger pour le LCP.
