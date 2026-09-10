# NeuroFit Labs - Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER / CLIENT                     │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Homepage   │  │  Shop Page   │  │  Dashboard   │         │
│  │  (/url)     │  │  (/shop)     │  │  (/dashboard)│         │
│  └─────────────┘  └──────────────┘  └──────────────┘         │
│         ▲                  ▲                 ▲                 │
│         │                  │                 │                 │
└─────────┼──────────────────┼─────────────────┼─────────────────┘
          │                  │                 │
          │ Next.js Routing  │                 │ Protected Route
          │                  │                 │ (Auth Check)
          │                  │                 │
┌─────────▼──────────────────▼─────────────────▼─────────────────┐
│                 NEXT.JS APPLICATION LAYER                      │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              PAGES (app/ directory)                    │   │
│  │  • page.tsx (home)                                    │   │
│  │  • shop/page.tsx                                      │   │
│  │  • dashboard/page.tsx                                 │   │
│  │  • vr-demo/page.tsx                                   │   │
│  └────────────────────────────────────────────────────────┘   │
│                          ▼                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │           COMPONENTS (components/ directory)           │   │
│  │  ├─ Layout Components                                 │   │
│  │  │  ├─ Header (navigation)                            │   │
│  │  │  └─ Footer                                         │   │
│  │  ├─ Interactive Components                            │   │
│  │  │  ├─ BrainQuiz                                      │   │
│  │  │  ├─ Testimonials (carousel)                        │   │
│  │  │  └─ BrainLogo (animated)                           │   │
│  │  ├─ Data Visualization                                │   │
│  │  │  ├─ ProgressGraph (Recharts)                       │   │
│  │  │  ├─ LeaderboardTable                               │   │
│  │  │  └─ AchievementBadges                              │   │
│  │  ├─ Commerce Components                               │   │
│  │  │  └─ ProductCard                                    │   │
│  │  └─ UI Components (shadcn/ui - 40+ components)        │   │
│  │     ├─ Button, Card, Badge, Table, Tabs              │   │
│  │     └─ Input, Label, Dialog, etc.                    │   │
│  └────────────────────────────────────────────────────────┘   │
│                          ▼                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │            UTILITIES & LIBRARIES (lib/)                │   │
│  │  ├─ supabase.ts (client & queries)                    │   │
│  │  ├─ products.ts (product catalog)                     │   │
│  │  └─ utils.ts (helpers)                                │   │
│  └────────────────────────────────────────────────────────┘   │
│                          ▼                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │            STYLING & CONFIGURATION                     │   │
│  │  ├─ globals.css (design tokens)                       │   │
│  │  ├─ tailwind.config.ts (theme)                        │   │
│  │  └─ layout.tsx (root layout)                          │   │
│  └────────────────────────────────────────────────────────┘   │
│                          ▼                                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              API ROUTES (app/api/)                     │   │
│  │  ├─ POST /api/checkout (Stripe sessions)              │   │
│  │  └─ GET /api/leaderboard (rankings)                   │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────┬──────────────────────────────────────┘
                          │
                          │ HTTP/REST API Calls
                          │
┌─────────────────────────▼──────────────────────────────────────┐
│                 EXTERNAL SERVICES LAYER                         │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐   │
│  │    SUPABASE      │  │    STRIPE API    │  │  VERCEL    │   │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │ Deployment │   │
│  │  │ PostgreSQL │  │  │  │ Payments   │  │  │ & Hosting  │   │
│  │  │ Database   │  │  │  │ Checkout   │  │  │            │   │
│  │  ├────────────┤  │  │  ├────────────┤  │  ├────────────┤   │
│  │  │ Auth       │  │  │  │ Webhooks   │  │  │ Edge       │   │
│  │  │ Management │  │  │  └────────────┘  │  │ Functions  │   │
│  │  ├────────────┤  │  │                  │  ├────────────┤   │
│  │  │ RLS        │  │  │                  │  │ Analytics  │   │
│  │  │ Policies   │  │  │                  │  │            │   │
│  │  └────────────┘  │  │                  │  └────────────┘   │
│  └──────────────────┘  └──────────────────┘  └────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Architecture

### User Journey 1: Homepage → Quiz → Checkout

```
User Opens Homepage
        │
        ▼
Sees Hero + Features
        │
        ▼
Clicks "Get Your Brain Plan"
        │
        ▼
┌─────────────────────────────┐
│   BrainQuiz Component       │
│ ┌─────────────────────────┐ │
│ │ Question 1 (3 options)  │ │
│ │ Question 2 (3 options)  │ │
│ │ Question 3 (3 options)  │ │
│ └─────────────────────────┘ │
└─────────────┬───────────────┘
              │
              ▼
    ┌─────────────────┐
    │  Quiz Results   │
    │  • Score %      │
    │  • Performance  │
    │  • Tier         │
    │  • Suggestions  │
    └────────┬────────┘
             │
             ▼
    "Get Your Brain Plan"
    Button → Stripe Modal
```

### User Journey 2: Shop → Product Selection → Payment

```
User Visits /shop
        │
        ▼
┌───────────────────────────────────────────┐
│       Product Grid (3 columns)            │
│                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │EEG Device│ │   Sub    │ │ Bundle   │ │
│  │   $199   │ │ $19.99/mo│ │  $249    │ │
│  │  Features│ │ Features │ │ Features │ │
│  │ [Buy Now]│ │[Subscribe│ │[Buy Now] │ │
│  └──────────┘ └──────────┘ └──────────┘ │
└─────────────────┬───────────────────────┘
                  │
            User Clicks "Buy"
                  │
                  ▼
        POST /api/checkout
                  │
                  ▼
        ┌─────────────────────┐
        │ Stripe Session      │
        │ (session_id)        │
        └─────────┬───────────┘
                  │
                  ▼
    Redirect to Stripe Checkout
    (in production)
```

### User Journey 3: Dashboard Access

```
User Not Logged In
        │
        ▼
  Visits /dashboard
        │
        ▼
┌──────────────────────────┐
│ Middleware Check         │
│ Is session valid?        │
└───┬────────────────┬─────┘
    │ YES            │ NO
    │                │
    ▼                ▼
Dashboard      Redirect to
Content        Login/Signup
    │               │
    ▼               ▼
  Fetch         Supabase Auth
  User Data     Form
    │               │
    ▼               ▼
┌─────────────────────────┐
│ Dashboard Page          │
│ ┌──────────────────┐    │
│ │ Stats Cards      │    │
│ │ Tabs:            │    │
│ │ • Overview       │    │
│ │ • Leaderboard    │    │
│ │ • Achievements   │    │
│ └──────────────────┘    │
└─────────────────────────┘
```

---

## Component Hierarchy

### Homepage (`app/page.tsx`)

```
HomePage
├── Header
│   ├── BrainLogo
│   └── Navigation + CTA Button
├── Hero Section
│   ├── Headline + Subheading
│   ├── Stats (3 columns)
│   └── Visual
├── Features Grid
│   └── Card × 3
├── Quiz Section
│   └── BrainQuiz (interactive)
├── Testimonials
│   └── Carousel × 3
├── CTA Section
└── Footer
    ├── Links (4 columns)
    ├── Social
    └── Copyright
```

### Shop (`app/shop/page.tsx`)

```
ShopPage
├── Header
├── Page Title + Subtitle
├── Product Grid
│   └── ProductCard × 3
│       ├── Image
│       ├── Name + Description
│       ├── Price
│       ├── Features (CheckList)
│       ├── Badge (if applicable)
│       └── Button
├── Info Sections (2 columns)
│   ├── "What's Included"
│   └── "Support & Guarantee"
├── FAQ Section
│   └── FAQ Item × 4
└── Footer
```

### Dashboard (`app/dashboard/page.tsx`)

```
DashboardPage
├── Header (+ Logout Button)
├── Stats Cards (4 columns)
│   ├── Current Score
│   ├── Avg Memory
│   ├── Avg Focus
│   └── Streak
├── Tabs
│   ├── Overview Tab
│   │   ├── ProgressGraph (Recharts)
│   │   └── Training Summary Card
│   ├── Leaderboard Tab
│   │   └── LeaderboardTable
│   └── Achievements Tab
│       └── AchievementBadges (6 grid)
├── Upgrade Section
└── Footer
```

---

## Database Schema Relationships

```
┌──────────────────┐
│   USERS          │
├──────────────────┤
│ id (PK)          │◄─────┐
│ email (UNIQUE)   │      │ Foreign Key
│ full_name        │      │
│ created_at       │      │
│ updated_at       │      │
└──────────────────┘      │
                          │
        ┌─────────────────┴──────┬──────────────┐
        │                        │              │
        ▼                        ▼              ▼
┌──────────────────┐  ┌──────────────────┐ ┌──────────────────┐
│ USER_SCORES      │  │ USER_ACHIEVEMENTS│ │  PURCHASES       │
├──────────────────┤  ├──────────────────┤ ├──────────────────┤
│ id (PK)          │  │ id (PK)          │ │ id (PK)          │
│ user_id (FK)     │  │ user_id (FK)     │ │ user_id (FK)     │
│ score            │  │ badge_name       │ │ product_id       │
│ test_type        │  │ unlocked_at      │ │ stripe_session_id│
│ created_at       │  │ UNIQUE (user,    │ │ status           │
│                  │  │  badge_name)     │ │ created_at       │
│ Indexes:         │  │                  │ │                  │
│ - user_id        │  │ Indexes:         │ │ Indexes:         │
│ - created_at     │  │ - user_id        │ │ - user_id        │
└──────────────────┘  └──────────────────┘ │ - stripe_session │
                                            └──────────────────┘
```

---

## State Management Strategy

### Client-Side State

```
Page Component (useState)
│
├─ Quiz State
│  ├─ currentQuestion
│  ├─ answers[]
│  └─ completed
│
├─ Dashboard State
│  ├─ activeTab
│  ├─ isLoading
│  └─ userData
│
└─ Checkout State
   ├─ selectedProduct
   ├─ isProcessing
   └─ error
```

### Server-Side State

```
Database (Supabase PostgreSQL)
│
├─ User Sessions (Auth)
│  └─ JWT Token (via Supabase)
│
├─ User Data (Profile)
│  └─ users table
│
├─ Performance Data
│  └─ user_scores table
│
├─ Achievement Data
│  └─ user_achievements table
│
└─ Transaction Data
   └─ purchases table
```

---

## Authentication Flow

```
User Submits Login Form
        │
        ▼
Supabase Auth
        │
        ├─ Email + Password Validation
        │
        ├─ Generate JWT Token
        │
        ▼
Session Created
        │
        ├─ Store in httpOnly cookie
        ├─ Store in localStorage
        │
        ▼
Middleware Verification
        │
        ├─ Check token validity
        ├─ Validate expiration
        │
        ▼
Protected Pages Accessible
        │
        └─ Dashboard, User Profile, etc.
```

---

## API Request/Response Flow

### Example: Product Checkout

```
Client Side
─────────────
ProductCard Component
    │
    ├─ User clicks "Buy Now"
    │
    └─ onClick: handleCheckout(productId)
           │
           ▼
        fetch('/api/checkout', {
          method: 'POST',
          body: { productId }
        })
           │
           ▼
Server Side
─────────────
POST /api/checkout
    │
    ├─ Validate productId
    ├─ Get product details
    ├─ Create Stripe session
    │
    ▼
Return Response
    {
      sessionUrl: 'https://checkout.stripe.com/...',
      productId: 'eeg_device'
    }
    │
    └─ Client redirects to Stripe
```

---

## Deployment Architecture

```
┌──────────────────────────────────────┐
│         GitHub Repository            │
│  • Source code                       │
│  • Configuration                     │
└────────────────┬─────────────────────┘
                 │
                 │ git push
                 ▼
┌──────────────────────────────────────┐
│       Vercel Platform                │
│  ┌────────────────────────────────┐  │
│  │ Turbopack Build                │  │
│  │ • TypeScript compilation       │  │
│  │ • CSS processing               │  │
│  │ • Code optimization            │  │
│  └─────────────┬──────────────────┘  │
│                │                      │
│  ┌─────────────▼──────────────────┐  │
│  │ Static & Dynamic Routes        │  │
│  │ • Prerendered pages            │  │
│  │ • Serverless functions         │  │
│  │ • Edge middleware              │  │
│  └─────────────┬──────────────────┘  │
│                │                      │
│  ┌─────────────▼──────────────────┐  │
│  │ CDN Distribution               │  │
│  │ • Global edge network          │  │
│  │ • Cache optimization           │  │
│  │ • Image optimization           │  │
│  └────────────────────────────────┘  │
└──────────────┬───────────────────────┘
               │
               ▼
    ┌─────────────────────┐
    │ Domain (CNAME)      │
    │ example.com         │
    └─────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────┐
│      HTTPS/TLS Encryption           │
│  (Auto via Vercel)                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    Middleware Auth Check            │
│  • Verify JWT token                 │
│  • Check session validity           │
│  • Rate limiting ready              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Row Level Security (RLS)           │
│  • Supabase enforces policies       │
│  • Users can only see their data    │
│  • Admin-only operations protected  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Environment Variables             │
│  • API keys secured                 │
│  • Not committed to repo            │
│  • Stored in Vercel dashboard       │
└─────────────────────────────────────┘
```

---

## Performance Architecture

```
┌─────────────────────────────────────┐
│    Optimization Strategies          │
└────────────┬────────────────────────┘
             │
    ┌────────┼────────┬─────────┐
    │        │        │         │
    ▼        ▼        ▼         ▼
  Code    Image   Static   Caching
  Split   Opt.    Gen.
    │        │        │         │
    └────────┼────────┼─────────┘
             │
    ┌────────▼──────────────────┐
    │   Turbopack Bundler       │
    │ (2x faster than Webpack)  │
    └────────┬──────────────────┘
             │
    ┌────────▼──────────────────┐
    │  Vercel Edge Network      │
    │ (Global CDN)              │
    └───────────────────────────┘
```

---

## Technology Stack Layers

```
┌─────────────────────────────────┐
│  Frontend (Browser)             │
│  React 19 + TypeScript          │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│  Styling                        │
│  Tailwind CSS 4.2               │
│  + Design Tokens                │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│  Components                     │
│  shadcn/ui (40+ components)     │
│  + Custom Components (11)       │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│  Framework                      │
│  Next.js 16 App Router          │
│  + TypeScript                   │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│  Backend Services               │
│  API Routes (Node.js)           │
│  Middleware                     │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│  External Services              │
│  Supabase (Auth + Database)     │
│  Stripe (Payments)              │
│  Vercel (Hosting)               │
└─────────────────────────────────┘
```

---

This architecture is designed to be:
- **Scalable** - Ready to grow with your user base
- **Secure** - Multiple layers of security
- **Fast** - Optimized for performance
- **Maintainable** - Clean separation of concerns
- **Production-Ready** - Everything needed for launch
