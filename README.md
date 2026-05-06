# Portfolio — Jeff Tchinda Darryck

Portfolio personnel de **Jeff Tchinda Darryck**, développeur Full Stack JS · Data · IA.  
Disponible pour un stage académique dès **février 2027**.

---

## 🚀 Stack technique

| Couche | Technologie |
|---|---|
| Framework | React 18 + Vite |
| Styles | CSS Variables (design tokens) + modules CSS par composant |
| Icons | Unicons Line (self-hosted) |
| Carousel | Swiper.js |
| Email | EmailJS |
| Fonts | Syne (headings) · DM Sans (body) — Google Fonts |

---

## 📁 Structure du projet

```
src/
├── assets/                  # Images & PDF (CV)
├── components/
│   ├── about/               # Section "À propos"
│   │   ├── About.jsx
│   │   └── About.css
│   ├── blog/                # Section Blog avec modal
│   │   ├── Blog.jsx
│   │   └── Blog.css
│   ├── contact/             # Formulaire de contact (EmailJS)
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   ├── cursor/              # Curseur personnalisé
│   │   ├── Cursor.jsx
│   │   └── Cursor.css
│   ├── footer/              # Footer
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── header/              # Navigation fixe (desktop) / bottom sheet (mobile)
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── home/                # Section Hero
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Data.jsx         # Contenu texte + pills tech
│   │   ├── Social.jsx       # Icônes sociales + ThemeToggle
│   │   ├── ScrollDown.jsx   # Indicateur de défilement
│   │   ├── ThemeToggle.jsx  # Bouton light/dark
│   │   └── ThemeToggle.css
│   ├── qualifications/      # Timeline éducation / expérience
│   │   ├── Qualifications.jsx
│   │   └── Qualifications.css
│   ├── scrollup/            # Bouton retour en haut
│   │   ├── Scrollup.jsx
│   │   └── Scrollup.css
│   ├── services/            # Cards services avec modal détail
│   │   ├── Services.jsx
│   │   └── Services.css
│   ├── skills/              # Barres de compétences
│   │   ├── Skills.jsx
│   │   ├── Skills.css
│   │   ├── Frontend.jsx
│   │   ├── Backend.jsx
│   │   └── Design.jsx
│   ├── testimonials/        # Carrousel témoignages + formulaire
│   │   ├── Testimonial.jsx
│   │   ├── Testimonial.css
│   │   ├── Data.jsx
│   │   └── testimonials.json
│   └── work/                # Portfolio projets avec filtres et modal
│       ├── Work.jsx
│       ├── Work.css
│       ├── Works.jsx        # Filtres + grille
│       ├── Workitems.jsx    # Card individuelle + modal
│       └── Data.jsx         # Données projets
├── hooks/
│   └── useScrollReveal.js   # IntersectionObserver pour animations au scroll
├── App.jsx                  # Composant racine
├── App.css                  # Design tokens CSS, styles globaux, aurora bg
├── line.css                 # Police Unicons (icônes)
└── main.jsx                 # Point d'entrée React
```

---

## ⚙️ Installation & démarrage

```bash
# 1. Cloner le repo
git clone https://github.com/jeff-darryck007/portfolio.git
cd portfolio

# 2. Installer les dépendances
npm install

# 3. Démarrer en développement
npm run dev

# 4. Build de production
npm run build

# 5. Prévisualiser le build
npm run preview
```

---

## 🎨 Système de design (CSS Variables)

Tous les tokens sont définis dans `src/App.css` sous `:root` :

```css
/* Couleur accent principale */
--accent:      #7B61FF;
--accent-dark: #5E46E0;
--accent-rgb:  123, 97, 255;   /* pour rgba() */

/* Couleurs thème clair */
--title-color:     #0F0E17;
--text-color:      #4a4a5a;
--body-color:      #F7F7FB;
--container-color: #FFFFFF;

/* Typographie */
--heading-font: "Syne", sans-serif;
--body-font:    "DM Sans", sans-serif;

/* Rayons */
--radius-sm:   0.5rem;
--radius-md:   1rem;
--radius-lg:   1.5rem;
--radius-xl:   2rem;
--radius-full: 99px;

/* Z-index hiérarchie */
--z-backdrop: 50;
--z-tooltip:  60;
--z-fixed:    100;   /* Header */
--z-navmenu:  110;   /* Menu mobile (au-dessus du header) */
--z-modal:    9000;  /* Modals (via React Portal) */
--z-cursor:   9999;  /* Curseur custom */
```

**Thème sombre** : ajout de `body.dark-theme` qui redéfinit toutes les variables.

---

## 🌙 Thème clair / sombre

Le basculement se fait via `ThemeToggle.jsx` :
- État persisté dans `localStorage` (clé : `theme`)
- Animation "wave" circulaire depuis le point de clic (CSS `clip-path` via `--wave-x` / `--wave-y`)
- Pas de flash au chargement grâce à l'initialisation lazy du state

```jsx
const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
```

---

## 🪟 Architecture des Modals (fix z-index)

**Problème initial :** `.main` avait `position: relative; z-index: 1` dans App.css, créant un **stacking context** isolé. Les modals à l'intérieur (z-index: 9000) étaient piégés dans ce contexte et ne pouvaient pas dépasser le header (z-index: 100) situé dans le stacking context racine.

**Solution :** Les trois modals utilisent désormais `ReactDOM.createPortal` pour se rendre directement dans `document.body`, à l'extérieur de tout stacking context intermédiaire.

```jsx
import { createPortal } from 'react-dom';

// Dans le composant modal :
return createPortal(
  <div className="modal-overlay" onClick={onClose}>
    { /* contenu */ }
  </div>,
  document.body   // ← rendu hors de <main>, dans le root stacking context
);
```

Modals concernées :
- `BlogModal` dans `Blog.jsx`
- `ServiceModal` dans `Services.jsx`
- `ProjectModal` dans `Workitems.jsx`

Chaque modal :
1. Bloque le scroll du body (`document.body.style.overflow = 'hidden'`) et le restaure au démontage
2. Écoute la touche `Escape` pour se fermer
3. Se ferme au clic sur l'overlay (mais pas au clic sur son contenu interne)

---

## 📜 Scroll Reveal

Géré par le hook `useScrollReveal.js` via `IntersectionObserver` :

| Classe CSS | Effet d'entrée |
|---|---|
| `.reveal` | Fondu + glissement vers le haut |
| `.reveal-left` | Glissement depuis la gauche |
| `.reveal-right` | Glissement depuis la droite |
| `.reveal-scale` | Zoom in |

Les délais de transition se contrôlent avec les classes `.d1` à `.d6` (de 0.1s à 0.6s).

---

## ✉️ Formulaire de contact

Utilise **EmailJS** (SDK `@emailjs/browser`) :

```jsx
emailjs.sendForm(
  'service_gjhs94d',    // Service ID
  'template_i8queid',   // Template ID
  form.current,
  { publicKey: 'ID02cnIwxSCL9HOqx' }
)
```

> ⚠️ Ne pas exposer les clés EmailJS dans un repo public. Déplacer vers des variables d'environnement Vite :
> ```
> VITE_EMAILJS_SERVICE_ID=service_gjhs94d
> VITE_EMAILJS_TEMPLATE_ID=template_i8queid
> VITE_EMAILJS_PUBLIC_KEY=ID02cnIwxSCL9HOqx
> ```

---

## 📱 Responsive

| Breakpoint | Comportement |
|---|---|
| `> 992px` | Desktop — navigation horizontale en haut |
| `768px – 992px` | Tablet — grilles 2 colonnes |
| `< 768px` | Mobile — header en bas (bottom tab bar), layout 1 colonne |
| `< 480px` | Petits téléphones — ajustements typographiques |
| `< 350px` | Très petits écrans — padding réduit |

---

## 📦 Dépendances principales

```json
{
  "react": "^18",
  "react-dom": "^18",
  "@emailjs/browser": "^4",
  "swiper": "^11"
}
```

---

## 🔗 Liens

- **LinkedIn :** [Jeff Tchinda Darryck](https://www.linkedin.com/in/jeff-tchinda-223088404)
- **GitHub :** [github.com/jeff-darryck007](https://github.com/jeff-darryck007)
- **Contact :** jeffdarryck@gmail.com

---

© 2026 Jeff Tchinda Darryck · Tous droits réservés
#   P o r t f o l i o - j e f f  
 #   P o r t f o l i o - j e f f  
 #   P o r t f o l i o - j e f f  
 