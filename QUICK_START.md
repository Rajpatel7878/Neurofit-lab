# NeuroFit Labs - Quick Start Guide

## 🚀 Start in 3 Steps

### Step 1: Install & Configure (5 min)
```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Get Supabase credentials:
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Copy URL and API keys into .env.local
```

### Step 2: Set Up Database (5 min)
```bash
# Option A: Use Supabase SQL Editor
# - Copy scripts/01-create-tables.sql content
# - Paste into Supabase SQL Editor
# - Click Execute

# Option B: Use CLI
# npm install -g @supabase/cli
# supabase db push
```

### Step 3: Run Development Server (2 min)
```bash
pnpm dev
# Open http://localhost:3000 in your browser
```

---

## 📖 What You Get

| Component | File | Status |
|-----------|------|--------|
| **Homepage** | `app/page.tsx` | ✅ Complete |
| **Shop Page** | `app/shop/page.tsx` | ✅ Complete |
| **VR Demo** | `app/vr-demo/page.tsx` | ✅ Complete |
| **Dashboard** | `app/dashboard/page.tsx` | ✅ Complete |
| **Header/Footer** | `components/header.tsx` | ✅ Complete |
| **Quiz** | `components/brain-quiz.tsx` | ✅ Complete |
| **Product Card** | `components/product-card.tsx` | ✅ Complete |
| **Leaderboard** | `components/leaderboard-table.tsx` | ✅ Complete |
| **Progress Graph** | `components/progress-graph.tsx` | ✅ Complete |
| **Achievements** | `components/achievement-badges.tsx` | ✅ Complete |

---

## 📋 File Structure Quick Guide

```
Key Files You'll Edit:
├── app/page.tsx              👈 Homepage content
├── app/shop/page.tsx         👈 Product catalog
├── components/              👈 Reusable components
├── lib/supabase.ts          👈 Database queries
├── .env.local               👈 Your credentials (CREATE THIS)
└── tailwind.config.ts       👈 Style customization
```

---

## 🎯 Testing Pages

Visit these URLs to test:

```
Homepage        → http://localhost:3000
Shop            → http://localhost:3000/shop
VR Demo         → http://localhost:3000/vr-demo
Dashboard       → http://localhost:3000/dashboard
API - Checkout  → GET http://localhost:3000/api/checkout
API - Leaderboard → GET http://localhost:3000/api/leaderboard
```

---

## 🔑 Environment Variables

Create `.env.local` with these (get from Supabase):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_JWT_SECRET=your-jwt-secret-here
POSTGRES_URL=postgresql://...
POSTGRES_HOST=db.your-project.supabase.co
POSTGRES_DATABASE=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password-here
```

---

## 🎨 Customization Quick Tips

### Change Brand Colors
Edit `app/globals.css`:
```css
:root {
  --primary: #00AEEF;        /* Your primary color */
  --secondary: #1A1F36;      /* Your secondary color */
  --accent: #00D4AA;         /* Your accent color */
}
```

### Change Product Data
Edit `lib/products.ts`:
```typescript
export const products: Product[] = [
  {
    id: 'product-1',
    name: 'Your Product Name',
    price: 99.99,
    // ... etc
  }
]
```

### Change Copy/Text
Edit the `app/page.tsx`, `app/shop/page.tsx`, etc.

### Add New Pages
Create `app/your-page/page.tsx`:
```typescript
export default function YourPage() {
  return <div>Your content here</div>
}
```

---

## 🛠️ Common Tasks

### Add a New Component
```typescript
// components/my-component.tsx
export function MyComponent() {
  return <div>Hello</div>
}

// Use in any page:
import { MyComponent } from '@/components/my-component'
export default function Page() {
  return <MyComponent />
}
```

### Query Database
```typescript
// In lib/supabase.ts, add:
export async function getMyData() {
  const { data, error } = await supabase
    .from('your_table')
    .select('*')
  return data
}

// Use in page.tsx:
import { getMyData } from '@/lib/supabase'
const data = await getMyData()
```

### Add Stripe Payment
```typescript
// In app/api/checkout/route.ts
// Update with your Stripe logic
// Redirect user to Stripe Checkout
```

### Deploy to Production
```bash
# Push to GitHub
git add .
git commit -m "Ready for production"
git push origin main

# Vercel auto-deploys!
# Set env vars in Vercel Dashboard
```

---

## 🐛 Troubleshooting

### Dev server won't start
```bash
# Clear cache and reinstall
rm -rf .next
pnpm install
pnpm dev
```

### Supabase connection error
```bash
# Check credentials in .env.local
# Verify project is active in Supabase dashboard
# Try restarting dev server
```

### Styles not applying
```bash
# Rebuild Tailwind CSS
pnpm dev --reload
```

### TypeScript errors
```bash
# Check tsconfig.json
# Ensure all imports use @/prefix
# e.g., import { Button } from '@/components/ui/button'
```

---

## 📱 Mobile Testing

```bash
# Run on localhost
pnpm dev

# Then visit from phone:
# http://[YOUR_COMPUTER_IP]:3000
# e.g., http://192.168.1.100:3000
```

---

## 🚀 Deploy Commands

### Development
```bash
pnpm dev          # Run dev server
pnpm build        # Create production build
pnpm start        # Run production build locally
```

### Deployment
```bash
# Deploy to Vercel (requires Vercel CLI)
vercel --prod

# Or just push to GitHub for auto-deploy
git push origin main
```

---

## 📚 Documentation Files

- **README.md** - Full setup guide
- **DEPLOYMENT.md** - Production deployment
- **FEATURES.md** - Feature details
- **PROJECT_SUMMARY.md** - Complete overview
- **QUICK_START.md** - This file

---

## 🎓 Learn More

- Next.js: https://nextjs.org
- Tailwind: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com
- Supabase: https://supabase.com
- Stripe: https://stripe.com

---

## 💡 Tips

✅ **Do This:**
- Use `@/` for imports
- Check console for errors
- Test on mobile early
- Commit frequently
- Use TypeScript

❌ **Avoid This:**
- Hardcoding API keys
- CSS `!important`
- Large component files
- Skipping type safety
- Forgetting mobile tests

---

## ✨ You're Ready!

Everything is set up and ready to go. Start by:

1. ✅ Running `pnpm dev`
2. ✅ Visiting http://localhost:3000
3. ✅ Testing all pages
4. ✅ Customizing colors/content
5. ✅ Deploying to Vercel

**Questions?** Check the README.md or FEATURES.md files.

Happy building! 🚀
