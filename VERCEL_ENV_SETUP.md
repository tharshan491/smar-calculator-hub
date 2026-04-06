# ⚡ QUICK SETUP - Add to Vercel Production

Your Supabase credentials are ready! Now add them to Vercel's environment:

## 🔧 Add to Vercel Dashboard (5 steps)

1. Go to → **vercel.com** → **smart-calc-frontend** project
2. Click **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Enter exactly:

### Variable 1: Supabase URL
```
Name:  NEXT_PUBLIC_SUPABASE_URL
Value: https://otkoiynzzbawkgnqpmgd.supabase.co
```
Click **Save** ✓

### Variable 2: Supabase Key
```
Name:  NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: sb_publishable_9kdIdZJCAEhVzH5yNLhs9Q_6YhsjrKd
```
Click **Save** ✓

5. Go back, click **Deployments** → redeploy by clicking **...** → **Redeploy**

---

## ✅ Result

Once redeployed:
- 👥 **Live user counter** appears in top-right nav
- 🟢 Shows real-time visitors (updates every 5 sec)
- 📱 Works on all calculator pages

---

## 🎯 Verify It Works

```bash
# Open in browser:
https://smart-calc-frontend.vercel.app

# See: "X online" in top-right corner
```

**Example:** When you visit, Supabase tracks you + old users, then displays live count!

---

## 📊 Monitor Users in Supabase

```
Supabase Dashboard 
  → Table Editor 
  → online_users
  → See all live visitor IDs!
```

---

**Done! 🚀 Your live user tracking is now FULLY ACTIVE!**
