<div align="center">

# 🧠 NeuroFit Labs

### Advanced VR Brain Training Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)

**[Live Demo](#) · [View Dashboard](#) · [Shop](#)**

</div>

---

## 📖 Overview

NeuroFit Labs is a full-stack SaaS web application that simulates a VR-powered brain training platform. Built with the latest Next.js 16 App Router and React 19, it demonstrates a complete production-ready architecture — from an animated landing page and interactive quiz, to a real-time analytics dashboard, e-commerce shop, and WebXR VR demo.

> **Portfolio note:** The app runs fully in demo mode without any backend configuration. Supabase auth and Stripe checkout are production-ready — just add your environment variables.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🏠 **Landing Page** | Animated hero with pulsing neural rings, 4 feature cards, stats counter, testimonial carousel |
| 🧠 **Brain Quiz** | 3-question cognitive assessment with animated transitions and personalized result profile |
| 📊 **Analytics Dashboard** | Area charts with gradient fills, timeframe toggle (Week/Month/All), skeleton loading states |
| 🏆 **Leaderboard** | Real-time rankings with rank medals, streak counter, and current user highlighting |
| 🎖️ **Achievement Badges** | 6 gamified achievement badges with progress bar and unlock animations |
| 🛒 **Shop** | 3 product cards with Stripe Checkout scaffolding, FAQ section |
| 🥽 **VR Demo** | WebXR session detection, animated 3D brain visualization, live neural waveform |
| 📱 **Responsive** | Full mobile support with hamburger sheet menu and active page highlighting |
| 🎨 **Branded Design** | Custom `#00AEEF` blue + `#00D4AA` teal palette, Geist font, smooth scrolling |

---

## 🏗️ Architecture

```
app/
├── page.tsx              # Landing page (hero, features, quiz, testimonials, CTA)
├── shop/page.tsx         # E-commerce with Stripe Checkout API
├── vr-demo/page.tsx      # WebXR demo with CSS 3D brain visualization
├── dashboard/page.tsx    # Analytics dashboard (graphs, leaderboard, achievements)
├── api/
│   ├── checkout/route.ts # POST — Stripe session creation scaffold
│   └── leaderboard/route.ts # GET — leaderboard with timeframe filter
└── layout.tsx            # Root layout with Geist fonts + Sonner toasts

components/
├── header.tsx            # Sticky header with mobile sheet menu + active links
├── footer.tsx            # 4-column footer with brand
├── brain-quiz.tsx        # Multi-step quiz with animated transitions
├── progress-graph.tsx    # Recharts AreaChart with gradient fills
├── leaderboard-table.tsx # Ranked table with medal icons
├── achievement-badges.tsx # Badge grid with progress tracking
├── product-card.tsx      # Next/Image product card with Stripe hook
└── testimonials.tsx      # Auto-playing carousel with pause-on-interact

lib/
├── supabase.ts           # Supabase client + typed query helpers (null-safe demo mode)
└── products.ts           # Product catalog with Stripe IDs

scripts/
├── 01-create-tables.sql  # Full schema with RLS policies
└── 02-seed-data.sql      # Sample data
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment (optional — app runs in demo mode without this)

```bash
cp .env.example .env.local
```

Fill in your keys:

```env
# Supabase (optional — enables real auth and database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe (optional — enables real checkout)
NEXT_PUBLIC_STRIPE_PRODUCT_EEG=price_xxx
NEXT_PUBLIC_STRIPE_PRODUCT_SUB=price_xxx
NEXT_PUBLIC_STRIPE_PRODUCT_BUNDLE=price_xxx
STRIPE_SECRET_KEY=sk_test_xxx
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Set up database (optional)

Run these scripts in your Supabase SQL editor:

```bash
scripts/01-create-tables.sql   # Tables + RLS policies
scripts/02-seed-data.sql       # Sample data
```

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5.7 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Components** | shadcn/ui + Radix UI |
| **Charts** | Recharts 2 |
| **Backend** | Supabase (PostgreSQL + Auth + RLS) |
| **Payments** | Stripe Checkout (scaffolded) |
| **VR** | WebXR API |
| **Analytics** | Vercel Analytics |
| **Fonts** | Geist + Geist Mono (next/font) |
| **Notifications** | Sonner |
| **Deployment** | Vercel |

---

## 📦 Deployment

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

Add environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Build for production

```bash
npm run build
npm start
```

---

## 📄 License

MIT — see [LICENSE](LICENSE)

---

<div align="center">
Built with ❤️ using Next.js and Supabase
</div>
