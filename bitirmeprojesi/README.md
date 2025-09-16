# Sport Center – Static Website

A responsive, accessible, single‑page fitness/gym landing site built with vanilla **HTML**, **CSS**, and **JavaScript**. It includes a sticky navbar with a mobile hamburger menu, class tabs, trainer hover effects, a live BMI calculator, product cards, testimonials, a contact form, and an embedded Google Map.

---

## ✨ Features

* **Responsive navbar** with hamburger toggle (hidden >576px, interactive ≤576px) and JOIN US CTA
* **Hero section** with headline, copy, and primary/secondary buttons
* **Stats cards** section
* **Our Classes** with tabbed buttons (`Yoga`, `Group`, `Solo`, `Stretching`) that swap content & image
* **Polygon background** shape for visual depth
* **Trainers** cards with image‑on‑hover preview and text reveal
* **BMI Calculator** with **auto calculation on input** + moving indicator over the BMI scale image
* **Purchase grid** with hover elevation
* **Client reviews** with mirrored speech‑bubble tails
* **Contact** section with side‑by‑side form and Google Maps embed (stacks on mobile)
* **Footer** with two link columns and project blurb
* **Accessibility**: ARIA attributes on hamburger, Esc to close mobile menu, keyboard‑friendly buttons/links

---

## 🗂 Project Structure

```
project-root/
├─ index.html           # Main page (provided)
├─ style.css            # Global styles (provided)
├─ script.js            # Interactivity (provided)
├─ resimler/            # Images (logo, hero, classes, trainers, purchase, clients)
│  ├─ logo.png
│  ├─ hero-man.jpg
│  ├─ yoga.jpg
│  ├─ group.webp
│  ├─ solo.jpg
│  ├─ stret.webp
│  ├─ trainer1.jpg
│  ├─ trainer2.jpg
│  ├─ trainer3.jpg
│  ├─ purchase1.jpg ...
│  ├─ client1.jpg
│  └─ client2.jpg
└─ README.md            # This file
```

> **Note:** Ensure image filenames in `/resimler` match the references in `index.html`.

---

## 🚀 Getting Started

### 1) Open locally

Just open `index.html` in a browser.

### 2) Use a local dev server (recommended)

This avoids CORS issues and enables faster reloads.

* **VS Code + Live Server**: Right‑click `index.html` → **Open with Live Server**
* **Python (3.x)**:

  ```bash
  python -m http.server 5500
  # then visit http://localhost:5500/
  ```
* **Node (serve)**:

  ```bash
  npx serve . -p 5500
  ```

---

## ⚙️ Configuration & Customization

### Colors & Theme

* Primary brand: `#355592` (nav, headings, buttons)
* Accent: `orange` (active states, separators)
* Update palette in `style.css` (search for `#355592` and `orange`).

### Breakpoints

* Mobile layout rules primarily target **`max-width: 576px`**.
* Hamburger appears only at ≤576px; the desktop nav is always visible >576px.

### Navbar Behavior

* The hamburger `<button id="hamburger">` toggles `ul#navMenu` via the `active` class and adds `is-open` for the "X" animation.
* `Esc` key closes the menu when open.

### Classes Tabs

* Buttons in `.classes-buttons a` have `data-class` attributes matching section IDs: `#yoga`, `#group`, `#solo`, `#stretching`.
* Script hides all `.content-section` then shows the chosen one; the clicked button receives `.active`.

### BMI Calculator

* Values are read from `#height` (cm) and `#weight` (kg).
* `calculateBMI()` is triggered on **`input`** (no button required) and slides `#bmi-indicator` over `#bmi-image`.
* Adjust thresholds/positions in `script.js` if you use a different BMI image scale.

### Trainers Hover

* Each `<article>` contains a base image and a hidden `.trainer-hover` image which fades in on hover.
* Name/role text (`.trainer-info`) animates upward on hover.

### Contact

* `.map-form-container` displays the form and the map side‑by‑side (50% max width container) and stacks on narrow screens.
* Replace the Google Maps embed `src` with your location.

---

## ✅ Requirements Checklist

* [x] Hamburger hidden above 576px
* [x] Hamburger clickable and opens/closes menu at ≤576px
* [x] Active state (orange) for the selected class tab
* [x] Default open tab on load (Yoga)
* [x] BMI calculates automatically while typing (no submit button)
* [x] Trainers: image swap + text reveal on hover
* [x] Contact form and map sit **side by side** on desktop, stack on mobile
* [x] Polygon background behind **Our Classes**

---

## ♿ Accessibility Notes

* Hamburger `<button>` includes `aria-controls`, `aria-expanded`, and a clear `aria-label`.
* Keyboard support: `Enter/Space` on the hamburger toggles; `Esc` closes the menu.
* Link/buttons have adequate hit areas and visible focus states (inherit browser defaults; customize if desired).
* Images include `alt` text (verify content‑accurate descriptions for each image).

---

## 🧪 Browser Support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). For older browsers, consider adding autoprefixing or polyfills if you extend features.

---

## 🔧 Scripts Overview (from `script.js`)

* **Navbar**: toggles mobile menu and `is-open` class for animation
* **Class Switcher**: sets `.active` on the clicked tab, shows the matching `.content-section`
* **BMI**: listens for input changes and updates indicator position + tooltip (`title`)

---

## 📸 Assets & Licensing

* Ensure you have rights to use all images in `/resimler`. Replace stock photos and brand assets as needed.
* If using third‑party icon sets (e.g., Font Awesome), include their CDN or local files and follow their licenses.

---

## 🔮 Roadmap / Ideas

* Smooth scroll offset for anchored sections so content doesn't hide under the fixed navbar
* Lazy‑load off‑screen images
* Add form validation and success/error UI
* Replace hardcoded numbers (stats) with animated counters
* Introduce a light/dark theme toggle

---

## 📝 License

This project is provided as‑is for educational/demo purposes. Add your preferred license (e.g., MIT) if you intend to distribute.

---

## 🙋 Support

If you hit an issue, check that image paths are correct and that a local server is running. Then review console errors in your browser DevTools.
