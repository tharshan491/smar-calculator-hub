# 🚀 GitHub + Vercel Deployment Setup

**Repository:** tharshan491/Smart-Calculator-Hub  
**Vercel Project:** Smart-Calculator-Hub  
**Status:** Ready for Configuration  
**Date:** April 5, 2026

---

## ✅ Step 1: Verify Git Configuration

### Check Git Status
```bash
cd c:\Users\Ashwin\Downloads\new prj
git status
```

**Expected Output:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

---

## ✅ Step 2: Commit & Push Latest Changes

### Add Automation Files
```bash
git add -A
git commit -m "Add complete automation system: auto-publish, CI/CD pipeline, Next.js integration"
git push origin main
```

**Files Being Pushed:**
- seo-content/prompts-db/auto-publish.js
- seo-content/automation.config.js
- app/lib/content-service.ts
- app/api/content/route.ts
- app/calculators/[slug]/page.tsx
- .github/workflows/auto-publish.yml
- AUTOMATION_GUIDE.md
- AUTOMATION_SETUP.ps1
- AUTOMATION_COMPLETE.md
- package.json (updated)

---

## ✅ Step 3: Get Vercel Credentials

### From Vercel Dashboard:

1. **Go to:** https://vercel.com/dashboard
2. **Get VERCEL_ORG_ID:**
   - Go to Settings → Teams
   - Copy your Team ID (or Personal org ID)

3. **Get VERCEL_PROJECT_ID:**
   - Go to "Smart-Calculator-Hub" project
   - Go to Settings → General
   - Copy "Project ID"

4. **Get VERCEL_TOKEN:**
   - Go to Settings → Tokens
   - Click "Create" → Enter name "GitHub-Automation"
   - Copy the token (save it, won't show again!)

### Save These Values:
```
VERCEL_ORG_ID=      [paste from Vercel]
VERCEL_PROJECT_ID=  [paste from Vercel]
VERCEL_TOKEN=       [paste from Vercel]
```

---

## ✅ Step 4: Add GitHub Secrets

### Instructions:

1. **Go to GitHub:** https://github.com/tharshan491/Smart-Calculator-Hub
2. **Settings → Secrets and variables → Actions**
3. **Click "New repository secret"**
4. **Add Each Secret:**

| Secret Name | Value | Source |
|---|---|---|
| `VERCEL_ORG_ID` | [from Step 3] | Vercel Settings |
| `VERCEL_PROJECT_ID` | [from Step 3] | Vercel Settings |
| `VERCEL_TOKEN` | [from Step 3] | Vercel Settings |

### Visual Guide:
```
GitHub Repo → Settings → Secrets and variables → Actions
                          ↓
                    New repository secret
                          ↓
    Name: VERCEL_ORG_ID
    Value: [paste token]
    Click: Add secret
```

**Repeat for all 3 secrets**

---

## ✅ Step 5: Enable GitHub Actions

### Check Status:

1. Go to GitHub → Your repo → **Actions** tab
2. You should see `auto-publish.yml` workflow
3. If disabled, click **"Enable Actions"**

---

## ✅ Step 6: Configure Environment Variables

### In Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add these variables:

```
NODE_ENV = production
NEXT_PUBLIC_API_URL = https://smart-calculator-hub.vercel.app
```

---

## 🔄 Step 7: Test the Workflow

### Option A: Manual Trigger
```bash
# In GitHub UI:
# Actions → auto-publish.yml → Run workflow → Run workflow
```

### Option B: Wait for Schedule
```
Daily Trigger: 6:00 AM UTC (automatically)
Weekly Trigger: Monday 2:00 AM UTC (automatically)
```

---

## 📊 Deployment Flow

```
┌─────────────────────────────────────────────────────────┐
│                  GitHub Actions Workflow                │
└─────────────────────────────────────────────────────────┘

Step 1: TRIGGER
        ├─ Manual (GitHub UI)
        ├─ Scheduled (6 AM UTC daily)
        └─ Scheduled (Monday 2 AM UTC weekly)

Step 2: GENERATE
        └─ Run auto-publish.js batch generation
           ├─ Generate 10 high-priority articles
           ├─ Save to seo-content/generated-content/
           └─ Create index file

Step 3: PUBLISH
        └─ Create Pull Request
           ├─ Add generated files
           ├─ Title: "[AUTO] New SEO Content - X Articles"
           └─ Push to GitHub

Step 4: DEPLOY
        └─ Vercel Deployment
           ├─ Build Next.js app
           ├─ Deploy to vercel.com
           ├─ Set live on smart-calculator-hub.vercel.app
           └─ Attach to custom domain (if configured)

Step 5: VERIFY
        └─ ✅ Live! Content accessible at:
           https://smart-calculator-hub.vercel.app/calculators/loan-calculator
```

---

## 🎯 What Happens When Triggered

### Timeline:
```
T+0:00    GitHub Actions starts
T+0:30    Content generation begins (10 articles)
T+3:00    Generation completes
T+3:30    Pull Request created
T+4:00    Vercel begins build
T+5:00    Vercel deploys to production
T+5:30    ✅ New content LIVE
         (Total: ~5 minutes end-to-end)
```

### You Will See:
1. **GitHub Actions:** Green checkmark ✅
2. **Pull Request:** Auto-created with new files
3. **Vercel:** Deployment marked as "Production"
4. **Live Site:** New pages accessible immediately

---

## 🔗 Useful Links

| Link | Purpose |
|------|---------|
| [GitHub Repo](https://github.com/tharshan491/Smart-Calculator-Hub) | Source code |
| [GitHub Actions](https://github.com/tharshan491/Smart-Calculator-Hub/actions) | Monitor runs |
| [Vercel Project](https://vercel.com/dashboard/projects) | Deployment dashboard |
| [Live Site](https://smart-calculator-hub.vercel.app) | Production URL |

---

## ✨ After Setup Complete

### Your System Will:
- ✅ Generate 10 articles daily automatically
- ✅ Create pull requests on GitHub
- ✅ Deploy to Vercel automatically
- ✅ Make content live instantly
- ✅ Scale infinitely

### Monitor Progress:
```bash
# Check GitHub Actions
https://github.com/tharshan491/Smart-Calculator-Hub/actions

# Check Vercel Deployments
https://vercel.com/dashboard/projects

# Check Generated Content
npm run content:status
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| GitHub Actions fails with "Secret not found" | Re-add secrets in correct format (no spaces) |
| Vercel deployment fails | Check environment variables in Vercel Settings |
| Articles not generating | Run `npm run content:batch` manually to test |
| CI/CD doesn't trigger | Check GitHub Actions are enabled in repo settings |
| Build fails in Vercel | Run `npm run build` locally to test |

---

## 📋 Checklist

### Complete These Steps:

- [ ] **Step 1:** Verify git status locally
- [ ] **Step 2:** Push all changes to GitHub
- [ ] **Step 3:** Get 3 credentials from Vercel (ORG_ID, PROJECT_ID, TOKEN)
- [ ] **Step 4:** Add 3 secrets to GitHub (VERCEL_ORG_ID, VERCEL_PROJECT_ID, VERCEL_TOKEN)
- [ ] **Step 5:** Enable GitHub Actions
- [ ] **Step 6:** Add environment variables to Vercel
- [ ] **Step 7:** Test workflow manually or wait for schedule

**Once Completed:**
✅ System is production-ready
✅ Automation runs daily
✅ Content deploys automatically
✅ No manual work needed

---

## 🎬 Quick Setup Summary

```powershell
# 1. Commit & push
git add -A
git commit -m "Add automation system"
git push origin main

# 2. Get Vercel credentials (from Vercel dashboard)
# ORG_ID, PROJECT_ID, TOKEN

# 3. Add to GitHub secrets
# https://github.com/tharshan491/Smart-Calculator-Hub/settings/secrets/actions

# 4. Verify Actions enabled
# https://github.com/tharshan491/Smart-Calculator-Hub/actions

# 5. Test
# Manual trigger or wait for daily schedule (6 AM UTC)
```

**Status: ✅ READY TO DEPLOY**

