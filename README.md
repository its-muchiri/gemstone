# gemstone
E commerce website
# GemStore Demo

A functional front-end e-commerce demo for a natural loose-gemstone retailer, inspired by the structural patterns of large gemstone marketplaces. Built as a client-side React app with working cart, wishlist, search, and filtering — no backend required to run.

> **Note:** This is an original, independently-built demo project. It does not reuse any copyrighted text, images, or code from any existing gemstone retail site.

## Features

- 🛒 **Cart** — add/remove items, adjust quantities, live subtotal/total, persists across navigation
- ❤️ **Wishlist** — save items, move to cart, remove
- 🔍 **Live search** — real-time suggestions as you type, dedicated results page
- 🧭 **Category browsing & filters** — filter by color, shape, price, carat weight, and treatment; sortable
- 📱 **Responsive design** — distinct desktop and mobile navigation layouts
- 🖼️ **Product detail pages** — image gallery, specs, related products
- 💌 **Newsletter signup** — mock client-side confirmation flow

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + Vite |
| Routing | React Router |
| Styling | Tailwind CSS |
| State | React Context (Cart, Wishlist) |
| Icons | lucide-react |
| Data | Local mock catalog (JSON/TS), no external API |

## Getting Started

```bash
# clone the repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# install dependencies
npm install

# run the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
/src
  /components   # Header, Footer, ProductCard, FilterSidebar, SearchBar, CartItem, etc.
  /pages        # Home, Category, AllGemstones, Product, Cart, Wishlist, Search, Help, NotFound
  /context      # CartContext, WishlistContext
  /data         # products.ts, testimonials.ts, categories.ts
  /App.tsx      # route definitions
  /main.tsx     # app entry point
```

## Routes

| Path | Description |
|---|---|
| `/` | Homepage — hero, best sellers, reviews, CTA |
| `/all-gemstones` | Full category index |
| `/gemstones/:slug` | Category listing with filters & sort |
| `/product/:id` | Product detail page |
| `/cart` | Shopping cart |
| `/wishlist` | Saved items |
| `/search?q=...` | Search results |
| `/help`, `/help/shipping`, `/help/returns`, etc. | Static policy/info pages |

## Roadmap

This repo currently ships as a **client-side-only demo**. Planned next-phase work to take it full scale:

- [ ] Migrate to Next.js for API routes / server-side logic
- [ ] Add persistent database (Supabase/Postgres) for products, users, and orders
- [ ] Real authentication (Supabase Auth or Clerk) for sign in / sign up
- [ ] Stripe Checkout integration for real payments, with webhook-based order confirmation
- [ ] Persist cart/wishlist per logged-in user instead of in-memory/local state
- [ ] Admin dashboard for inventory management

## Deployment

This app is a static build and deploys cleanly to any static host:

- **Vercel** (recommended) — zero-config Vite detection, auto-deploys from GitHub
- **Netlify** — same auto-deploy flow, add a `_redirects` file for SPA routing
- **Cloudflare Pages** — similar setup, fast global edge network

If using React Router, make sure your host rewrites all paths to `index.html` so deep links (e.g. `/cart`) don't 404 on refresh.

## Disclaimer

Product data, images, and copy in this repo are placeholder/mock content generated for demonstration purposes only. This project is not affiliated with, endorsed by, or connected to any real gemstone retailer.

## License

MIT
