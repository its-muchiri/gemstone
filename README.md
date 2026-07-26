# Gemstone

A full-stack e-commerce platform for browsing, searching, and purchasing gemstones. Features a React SPA frontend with a Next.js/Prisma backend, M-Pesa payment integration, and an admin panel.

**Live site:** [gemstone-zeta.vercel.app](https://gemstone-zeta.vercel.app)

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, React Router
- **Backend:** Next.js 14, Prisma ORM, PostgreSQL, NextAuth.js
- **Payments:** M-Pesa integration via NowPayments
- **Styling:** Tailwind CSS, Framer Motion, Lucide icons

## Features

- Browse gemstones by category with advanced filtering (shape, color, clarity, treatment, origin)
- Product detail pages with image gallery and specifications
- Shopping cart and wishlist (persisted to database)
- User authentication (registration + login via NextAuth)
- Checkout with M-Pesa payment
- Currency switching
- Admin panel for product management
- Search functionality
- Help center

## Getting Started

### Frontend

`ash
npm install
npm run dev
`

### Backend

`ash
cd server
npm install
cp .env.example .env   # Configure DATABASE_URL, NEXTAUTH_SECRET, etc.
npx prisma migrate dev
npx prisma db seed
npm run dev
`

## Project Structure

`
gemstone/
  src/                  # React frontend
    components/         # UI components
    pages/              # Route pages
    contexts/           # React contexts (Cart, Wishlist, Currency)
  server/               # Next.js backend
    app/api/            # API routes
    prisma/             # Database schema and migrations
  public/               # Static assets
`

## Scripts

| Command | Description |
|---------|-------------|
| 
pm run dev | Start Vite dev server |
| 
pm run build | TypeScript check + production build |
| 
pm run lint | Run Oxlint |
| 
pm run preview | Preview production build |

## License

This project is private.