# Phase 2 — Structure des fichiers (Outil de Conversion Senior)

Proposition de structure avant implémentation des 3 sections stratégiques.

---

## 1. Section « Méthodologie & Expertise Deep Dive » — L’Approche Systémique

**Objectif** : Expliquer visuellement la refonte Blachère (DDD, Aggregates, Bounded Contexts). Montrer que tu construis des systèmes, pas juste du code.

### Fichiers

| Fichier | Rôle |
|--------|------|
| `src/components/ApprocheSystemique/ApprocheSystemique.jsx` | Composant principal : schéma ou liste visuelle DDD (Bounded Contexts → Aggregates → flux). Texte issu des traductions. |
| `src/components/ApprocheSystemique/ApprocheSystemiqueSection.jsx` | Optionnel : wrapper avec titre de section et ancrage (ex. `id="approche-systemique"`) pour le scroll depuis la Navbar. |
| `src/translations/fr.json` | Nouvelle clé `common.approche_systemique` (titre, sous-titre, blocs : Bounded Contexts, Aggregates, valeur métier). |
| `src/translations/en.json` | Même structure en anglais. |

**Intégration** :  
- Soit une **nouvelle section** sur la page d’accueil (après À propos / avant ou après Projets), rendue dans `About.jsx` ou dans `App.jsx` entre About et le bloc Projets.  
- Soit une **route dédiée** `/approche` avec `src/pages/ApprocheSystemiquePage.jsx` qui n’affiche que ce composant (et Navbar/Footer).  

**Recommandation** : Section sur la page d’accueil (pas de route supplémentaire) pour garder un parcours linéaire et un seul écran à charger. Ajout d’un lien « L’approche systémique » dans la Navbar (anchor `#approche-systemique`).

---

## 2. Section « Remote-Ready Dashboard » — Current Status

**Objectif** : Afficher dynamiquement heure locale, disponibilité, stack asynchrone (Loom, Slack, GitLab CI, Linear). Message clé : « L’avantage du décalage horaire : mon fuseau permet d’assurer des cycles de livraison 24h/24. Je prépare vos environnements pendant que vous dormez. »

### Fichiers

| Fichier | Rôle |
|--------|------|
| `src/components/CurrentStatus/CurrentStatus.jsx` | Composant interactif : heure locale (via `Intl.DateTimeFormat` + `useState`/`useEffect` avec `setInterval`), fuseau configurable (ex. `Asia/Bangkok` ou `Asia/Singapore`), indicateur de disponibilité (ex. « Disponible » / « En focus »), liste d’outils (Loom, Slack, GitLab CI, Linear) avec icônes. |
| `src/components/CurrentStatus/CurrentStatus.css` | Optionnel : styles locaux si besoin (cartes, horloge). Sinon tout en Tailwind dans le JSX. |
| `src/translations/fr.json` | Clés `common.current_status.*` : titre, heure locale label, disponibilité, liste outils, phrase « L’avantage du décalage horaire » (et variante courte si besoin). |
| `src/translations/en.json` | Même structure. |

**Intégration** :  
- Nouvelle section sur la page d’accueil (ex. après Projets ou après Approche systémique), avec `id="current-status"`.  
- Lien Navbar « Status » ou « Où je suis » → `#current-status`.

**Données** :  
- Fuseau : à mettre dans les traductions (ex. `common.current_status.timezone` = `"Asia/Bangkok"`) ou dans un petit `src/config/availability.js` (timezone, statut par défaut) pour ne pas dupliquer en FR/EN.

---

## 3. Section « Automatisation & Proof of Quality »

**Objectif** : Showcase CODEX + scripts d’automatisation ; zone pour vidéo/GIF de suite Cypress. Message : « Garantie 0 régression : automatisation systématique des parcours critiques. »

### Fichiers

| Fichier | Rôle |
|--------|------|
| `src/components/ProofOfQuality/ProofOfQuality.jsx` | Composant : titre, sous-titre, bloc « CODEX » (titre + courte description + lien ou liste de scripts si pertinent), bloc « Cypress » avec emplacement pour une vidéo ou un GIF (balise `<video>` ou `<img>` avec `src` vers asset ou URL), phrase « Garantie 0 régression ». |
| `src/components/ProofOfQuality/ProofOfQualitySection.jsx` | Optionnel : wrapper avec `id="proof-of-quality"` pour l’ancre. |
| `public/images/` ou `public/videos/` | Fichier(s) : `cypress-demo.gif` ou `cypress-demo.mp4` (à fournir par toi). |
| `src/translations/fr.json` | Clés `common.proof_of_quality.*` : titre section, CODEX titre/description, Cypress titre/description, phrase garantie 0 régression, aria-labels. |
| `src/translations/en.json` | Même structure. |

**Intégration** :  
- Section sur la page d’accueil (ex. après Current Status), `id="proof-of-quality"`.  
- Lien Navbar « Qualité » ou « Preuve de qualité » → `#proof-of-quality`.

---

## Récapitulatif des nouveaux fichiers

```
src/
  components/
    ApprocheSystemique/
      ApprocheSystemique.jsx
    CurrentStatus/
      CurrentStatus.jsx
    ProofOfQuality/
      ProofOfQuality.jsx
  config/
    availability.js          # optionnel : timezone, statut
  translations/
    fr.json                  # nouvelles clés (3 blocs)
    en.json                  # idem
public/
  images/
    cypress-demo.gif         # ou .webp / .mp4 (à ajouter par toi)
docs/
  STRUCTURE_PHASE2.md        # ce fichier
```

---

## Modifications des fichiers existants

| Fichier | Modification |
|--------|--------------|
| `src/App.jsx` ou `src/components/About.jsx` | Rendu des 3 sections (ApprocheSystemique, CurrentStatus, ProofOfQuality) dans l’ordre choisi. |
| `src/components/Navbar.jsx` | Ajout de 3 liens d’ancrage : « L’approche systémique », « Status » (ou équivalent), « Qualité ». |
| `src/translations/fr.json` | Nouvelles clés sous `common` (et éventuellement un namespace dédié si tu préfères). |
| `src/translations/en.json` | Idem. |

---

## Ordre suggéré des sections sur la page

1. Hero (existant)  
2. À propos (existant)  
3. **L’approche systémique** (nouveau)  
4. Compétences (existant)  
5. Projets (existant)  
6. **Current Status** (nouveau)  
7. **Proof of Quality** (nouveau)

Tu peux déplacer « Current Status » plus haut (ex. après À propos) pour le mettre en avant. Ton design reste épuré et professionnel ; tout le texte passe par les fichiers de traduction ; le ton reste « Force Tranquille ».

---

Quand tu valides cette structure, on peut passer à la génération du code (composants + clés i18n + intégration dans la page et la Navbar).
