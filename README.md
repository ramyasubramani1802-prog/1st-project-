# Studio Soulkadi — React + Vite

An artisanal e-commerce storefront and live customizer application for handcrafted fidget clickers, mini photo album keychains, and quirky accessories.

Built with **React 19** and **Vite**, featuring interactive customization tools, synthesized audio feedback, slide-out cart drawers, coupon discounts, and direct WhatsApp order generation.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🛠️ Features & Component Architecture

- **`Navbar.jsx`**: Floating sticky navigation, live search bar with query filtering, wishlist badge, cart counter, and mobile menu drawer.
- **`Hero.jsx`**: High-converting hero with PAN India shipping badge, interactive stats, floating product tags, and CTAs.
- **`ProductGrid.jsx` & `ProductCard.jsx`**: Filterable catalog by category (`All`, `Clickers`, `Mini Albums`, `Keepsakes`), wishlist toggling, color swatches, and quick add-to-cart.
- **`LiveCustomizer.jsx`**: Real-time interactive 3D-styled clicker preview builder:
  - Custom name/word input with automatic alphanumeric sanitization (max 12 characters).
  - Mechanical switch click sound synthesis via Web Audio API.
  - Multi-theme gradient palette selection & base color selection.
  - Dynamic price calculation based on letter count and clicker style.
- **`CartDrawer.jsx`**: Slide-out cart with real-time free shipping progress bar (₹500 threshold), coupon code verification (`SOULKADI10`, `FIRST10`, `INDIE15`), quantity steppers, and 1-click WhatsApp order checkout.
- **`WishlistDrawer.jsx`**: Saved items drawer for quick viewing and moving items to cart.
- **`ReviewsSection.jsx`**: Verified customer testimonials and Instagram social proof gallery.
- **`Newsletter.jsx`**: First-time discount subscriber capture with celebratory confetti animation.

---

## ⚖️ Next.js vs. React + Vite for E-Commerce: Architectural Comparison

| Dimension | Next.js (SSR / SSG / ISR) | React + Vite (SPA) |
| :--- | :--- | :--- |
| **Rendering Strategy** | Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR) | Client-Side Rendering (CSR) |
| **SEO & Social Sharing** | **Superior**: Google crawls pre-rendered HTML; dynamic Open Graph tags per product link for rich previews on WhatsApp / Twitter. | **Basic out-of-the-box**: Search bots must execute JS; Open Graph tags require edge workers or pre-rendering plugins. |
| **Initial Page Load (LCP/FCP)** | Extremely fast first paint because HTML and critical CSS arrive pre-built from edge CDN or server. | Requires downloading the JS bundle before initial render; sub-second on subsequent navigation. |
| **Backend & Security** | Built-in Server Actions & API Routes to securely call Stripe / Razorpay, hide API keys, and query databases. | Pure frontend static files; requires an external backend (e.g. Firebase, Supabase, or Express API) for secret operations. |
| **Hosting & Maintenance** | Needs a Node.js runtime or Vercel / AWS Amplify / Cloudflare Workers environment. | **Zero maintenance**: 100% static files deployable for free anywhere (GitHub Pages, Cloudflare Pages, S3, Netlify). |
| **Best Used For** | Large catalogs, multi-page stores, SEO-dependent brand stores, complex payment gateways. | Boutique indie stores, WhatsApp-checkout storefronts, highly interactive product customizers, merchant portals. |
