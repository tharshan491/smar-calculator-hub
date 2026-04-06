# 🎯 Live User Tracking Setup Guide

## Status: ✅ DEPLOYED

Live user counter is now integrated! You'll see "X online" in the top-right navigation.

---

##  STEP 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Choose a name: `smart-calc` (or your preference)
4. Set a strong password
5. Click **"Create new project"** and wait 2-3 minutes

---

## 📋 STEP 2: Create Database Table

1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Copy & paste the code from [schema.sql](../schema.sql)
4. Click **"Run"**

✅ Table `online_users` is now created with RLS policies enabled!

---

## 🔑 STEP 3: Get Your Credentials

1. In Supabase, click **Settings → API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon/Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📝 STEP 4: Add Credentials to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Select your **smart-calc-frontend** project
3. Go to **Settings → Environment Variables**
4. Add two new variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
   ```
5. Click **Save**

---

## 🚀 STEP 5: Redeploy

```bash
cd "C:\Users\Ashwin\Downloads\new prj"
vercel deploy --prod --yes
```

---

##  How It Works

1. ✅ User visits app → generates unique ID → stored in `localStorage`
2. ✅ ID inserted into `online_users` table in Supabase
3. ✅ Navigation bar queries Supabase every 5 seconds
4. ✅ Displays live count: "**X online**" with pulsing indicator
5. ✅ Inactive users auto-removed after 5 minutes

---

## 📊 View Live Data

To see all current users in Supabase:
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select **online_users**
4. See all active visitor IDs!

---

## 🔧 Optional: Auto-cleanup (Keep DB Clean)

To automatically remove inactive users:

1. Supabase Dashboard → **SQL Editor** → **New Query**
2. Paste this:
```sql
SELECT cron.schedule(
  'cleanup-inactive-users',
  '*/1 * * * *',
  $$ DELETE FROM online_users WHERE last_seen < NOW() - INTERVAL '5 minutes' $$
);
```
3. Click **Run**

Now inactive users are auto-removed every 1 minute! ✅

---

## 🐛 Troubleshooting

**"N online" stays at 0?**
- Check `.env.local` has correct Supabase credentials
- Verify `online_users` table exists in Supabase
- Check browser console for errors (F12 → Console)

**Users not disappearing?**
- Auto-cleanup cron job not enabled (run optional step above)
- OR manually delete old records in Supabase table

**Supabase queries slow?**
- Add indexes (already done in schema.sql)
- Verify RLS policies are enabled

---

## 📱 Features

- ✅ Real-time user count in navigation
- ✅ Session persistence (localStorage)
- ✅ Automatic cleanup (5-min timeout)
- ✅ No login required (anonymous users)
- ✅ Privacy-focused (only stores ID + timestamp)
- ✅ Works on all calculator pages

---

**Questions? Check:**
- [Supabase Docs](https://supabase.com/docs)
- [app/lib/supabase.ts](../lib/supabase.ts) - Client code
- [schema.sql](../schema.sql) - Database schema
