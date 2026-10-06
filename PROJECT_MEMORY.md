# Project Memory & Architecture Context: Al-Tawafah Technical Services

## 1. Project Overview
- **Business**: Al Tawafah Technical Services Co. (Est. 2021, UAE)
- **Domain**: Premium Maintenance, Technical Services, and Skilled/Unskilled Manpower Supply across the UAE.
- **Tech Stack**:
  - Vanilla HTML5
  - Vanilla CSS3 (Single consolidated stylesheet: `css/style.css` using custom design tokens, CSS variables, dark/light theme classes)
  - Vanilla JavaScript (`js/main.js` with Lucide icons, dynamic DOM animations, FAQ toggles, filtering, form validation)
  - No build tooling / bundlers required (pure static web architecture).

---

## 2. Directory Layout & File Structure
```
Al-Tawafah/
├── .git/
├── assets/
│   ├── images/       # Project, team, hero, and section images
│   ├── logo.svg      # Primary branding SVG
│   └── icons/
├── css/
│   └── style.css     # Master stylesheet with theme variables, components, animations, responsive design
├── js/
│   └── main.js       # Global scripts (Icons, Sticky header, Theme toggle, Mobile drawer, Scroll animations, Sliders/Filters)
├── index.html        # Home page (Hero, corporate stats, standard offerings, highlights, CTA)
├── about.html        # Company overview, mission/vision, team, timeline
├── services.html     # Service categories & detailed capability listings
├── industries.html   # Industry verticals served
├── projects.html     # Portfolio / project showcases with filtering
├── testimonials.html # Client reviews & success stories
├── contact.html      # Inquiry form, contact details, maps/locations
├── privacy.html      # Privacy policy
└── terms.html        # Terms and conditions
```

---

## 3. Design System & Theming Conventions
- **Fonts**:
  - Headings: `'Outfit', sans-serif`
  - Body: `'Inter', sans-serif`
- **Color Tokens**:
  - `--primary`: `#0F52BA` (Corporate Blue)
  - `--primary-dark`: `#0A3C8B`
  - `--primary-light`: `#EBF3FF`
  - `--secondary`: `#FF6B00` (Safety/Accent Orange)
  - `--dark`: `#111827`
  - `--light`: `#F9FAFB`
  - Support for `body.dark-theme` (variables mapped to `--bg-body`, `--bg-surface`, `--text-main`, etc.)
- **Spacing / Radii**:
  - Border radius: `--border-radius: 12px`
  - Container max-width: `--container-max: 1200px`
  - Header height: `--header-height: 80px`

---

## 4. Key JavaScript Mechanisms (`main.js`)
- **Lucide Icons**: SVG replacement fallback for brand icons (`facebook`, `twitter`, `linkedin`, `instagram`) and Lucide icon rendering.
- **Sticky Header & Back-to-Top**: Scroll listener toggling `.scrolled` and `.active` classes.
- **Theme Toggler**: Stores theme in `localStorage.getItem('theme')` and toggles `.dark-theme` on `document.body`.
- **Mobile Drawer**: Toggles `.active` on hamburger, drawer, and overlay with body scroll prevention.
- **Scroll Animations**: `IntersectionObserver` observing `.animate-on-scroll` elements and applying `.animated`.
- **Filtering & Interactions**: Project filtering, FAQ accordions, and interactive tabs.

---

## 5. Guidelines for Future Edits (Rule of Minimal Change)
1. **Targeted Diffs Only**:
   - Never replace or rewrite entire files when modifying content, styles, or logic.
   - Use surgical edits (`replace_file_content` / targeted replacements) pinpointing only the relevant tags or CSS declarations.
2. **Preserve Shared HTML Components**:
   - Headers, navigation links, mobile drawers, and footers are consistent across pages. If altering navigation or branding, change only the specific anchor or class without breaking the remaining structure.
3. **Preserve CSS Tokens & Conventions**:
   - Reuse existing CSS variables (`var(--primary)`, `var(--text-muted)`, etc.) instead of introducing ad-hoc hex values or conflicting frameworks.
4. **Preserve Vanilla Purity**:
   - Do not inject third-party external dependencies, frameworks, or bundlers unless explicitly requested by the user.

---

## 6. Recent Changelog
- **Timeline & Design Alignment**: Aligned timeline circles above connecting lines, updated secondary pages to corporate blue theme, removed Career page.
- **Header & Navigation Fixes**: Re-enabled mobile drawer hamburger button on `index.html` and removed redundant breadcrumbs across all inner pages.
- **WhatsApp Widget & Badges**: Standardized `#waWidget` across all 9 pages; embedded `.wa-notification-badge` inside `.wa-fab` button for perfect top-right positioning.
- **Local Image Asset Replacements**: Added custom images to `assets/images/` for Electrical Works (`electrical_works.jpg`), Educational Institutions (`educational_institutions.jpg`), and Main DB Panel Dressing (`main_db_panel_dressing.jpg`).
- **Pointer Events & Hover Fixes**: Added `pointer-events: none` on `.wa-widget` container, overlays (`.drawer-overlay`, `.industry-overlay`), and card `::before` pseudo-elements. Repositioned `.back-to-top` to `bottom: 100px` so fixed bottom controls never block hover or click interactions. Added outside click listener for WhatsApp chat popup.
- **Brand Logo & Favicon Standardization**: Processed `Newlogo.png` into clean, high-resolution transparent assets (`assets/images/logo.png` and `favicon.png`/`.ico`). Linked across all 9 pages for both header and footer. Preserved the exact original logo across all modes (Dark Mode & Light Mode) without color swapping or image alteration.
- **WhatsApp Direct Links Standardized**: Formatted all WhatsApp click-to-chat links to the official international digit-only format `https://wa.me/971569698910` (removing space and `+` prefix that broke direct redirection) with URL-encoded greeting parameters across all 9 pages.
