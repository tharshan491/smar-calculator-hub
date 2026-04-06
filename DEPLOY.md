# 🚀 Smart Calculator Hub – Full Deploy Guide
# Stack: Vercel (frontend) + Cloudflare Workers (backend) + Supabase (database)
# Cost: 100% FREE — no credit card required

═══════════════════════════════════════════════════════
 STEP 1 — SUPABASE (Database)  https://supabase.com
═══════════════════════════════════════════════════════

1. Sign up free at https://supabase.com (use GitHub login)
2. Click "New Project" → name it "smart-calc" → set a DB password → choose region
3. Wait ~2 minutes for the project to provision
4. Go to: SQL Editor → New Query
   → Paste the entire contents of supabase/schema.sql
   → Click RUN ✓
5. Go to: Settings → API → copy:
   ┌─────────────────────────────────────────────────────┐
   │  Project URL:  https://xxxxxxxxxxxx.supabase.co     │
   │  anon key:     eyJhbGci....(long JWT string)        │
   └─────────────────────────────────────────────────────┘
   Save both — needed in Step 2


═══════════════════════════════════════════════════════
 STEP 2 — CLOUDFLARE WORKERS (Backend)
═══════════════════════════════════════════════════════

── Install Wrangler CLI ──
  npm install -g wrangler
  wrangler login          ← opens browser, sign in with Cloudflare account

── Get your Account ID ──
  wrangler whoami
  → Copy the Account ID shown

── Edit wrangler.toml ──
  Open worker/wrangler.toml
  Replace: REPLACE_WITH_YOUR_ACCOUNT_ID
  With your actual account ID

── Deploy ──
  cd worker
  npm install
  npm run deploy

  → You'll see: "Deployed to https://smart-calc-api.YOUR_NAME.workers.dev"
  → Copy this URL — needed in Step 3

── Add Supabase secrets ──
  wrangler secret put SUPABASE_URL
  (paste your Supabase Project URL when prompted)

  wrangler secret put SUPABASE_ANON_KEY
  (paste your anon key when prompted)

── Test the API ──
  curl https://smart-calc-api.YOUR_NAME.workers.dev/api/ping
  → {"status":"ok","time":"..."}

  curl -X POST https://smart-calc-api.YOUR_NAME.workers.dev/api/finance/compound \
    -H "Content-Type: application/json" \
    -d '{"principal":10000,"rate":7,"years":10,"n":12}'
  → {"amount":20097.15,"interest":10097.15,...}


═══════════════════════════════════════════════════════
 STEP 3 — VERCEL (Frontend)  https://vercel.com
═══════════════════════════════════════════════════════

1. Push your project to GitHub
   git init
   git add .
   git commit -m "Smart Calculator Hub"
   git remote add origin https://github.com/YOURUSERNAME/smart-calc.git
   git push -u origin main

2. Go to https://vercel.com → Sign up free → "Add New Project"
3. Import your GitHub repository
4. Set Root Directory to: frontend
5. Add Environment Variable:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │  Name:  REACT_APP_API_URL                                               │
   │  Value: https://smart-calc-api.YOUR_NAME.workers.dev/api               │
   └─────────────────────────────────────────────────────────────────────────┘
6. Click "Deploy"
7. Your site is live at: https://smart-calc-YOURNAME.vercel.app 🎉

── Connect your custom domain (required for AdSense) ──
  Vercel Dashboard → your project → Settings → Domains → Add Domain
  Enter your domain (e.g. smartcalculatorhub.com) → follow DNS instructions


═══════════════════════════════════════════════════════
 STEP 4 — GOOGLE ADSENSE
═══════════════════════════════════════════════════════

1. Go to https://adsense.google.com → sign up
2. Add your custom domain (NOT the .vercel.app URL)
3. Paste the verification <meta> tag into frontend/public/index.html:
   <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX">
4. Wait for approval (1–14 days)
5. After approval:
   Open frontend/src/App.jsx
   Find line: const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";
   Replace with your real publisher ID
   Replace slot IDs in AD_SLOTS object with real IDs from AdSense dashboard
6. Push to GitHub → Vercel auto-redeploys → ads go live ✓


═══════════════════════════════════════════════════════
 LOCAL DEVELOPMENT
═══════════════════════════════════════════════════════

Terminal 1 — Backend (Cloudflare Worker local):
  cd worker
  wrangler dev --local
  → Runs on http://localhost:8787

Terminal 2 — Frontend:
  cd frontend
  echo "REACT_APP_API_URL=http://localhost:8787/api" > .env.local
  npm install
  npm start
  → Runs on http://localhost:3000


═══════════════════════════════════════════════════════
 FREE TIER LIMITS SUMMARY
═══════════════════════════════════════════════════════

  Vercel           100 GB bandwidth/month        Never expires
  Cloudflare       100,000 requests/day           Resets daily
  Supabase         500 MB database                Never expires
  Supabase         Unlimited API calls            No limit
  MongoDB Atlas    Not used in this stack         —

  TOTAL COST: $0/month forever (until you get huge traffic)


═══════════════════════════════════════════════════════
 FILE STRUCTURE
═══════════════════════════════════════════════════════

  smart-calc/
  ├── frontend/
  │   ├── public/index.html          ← HTML shell + AdSense meta tag
  │   ├── src/
  │   │   ├── App.jsx                ← Full React app (all 25+ calculators)
  │   │   ├── index.js               ← React entry point
  │   │   ├── utils/api.js           ← All API calls → Cloudflare Worker
  │   │   └── hooks/useCalc.js       ← Reusable loading/error hook
  │   ├── package.json
  │   ├── vercel.json                ← Vercel deployment config
  │   └── .env.example
  ├── worker/
  │   ├── src/
  │   │   ├── index.js               ← Worker entry point + CORS + routing
  │   │   └── routes/
  │   │       ├── finance.js         ← 7 finance endpoints
  │   │       ├── health.js          ← 5 health endpoints
  │   │       ├── math.js            ← 7 math endpoints
  │   │       ├── tools.js           ← 6 tools endpoints
  │   │       └── history.js         ← History CRUD + Supabase
  │   ├── wrangler.toml              ← Cloudflare config
  │   └── package.json
  └── supabase/
      └── schema.sql                 ← Run once in Supabase SQL editor
