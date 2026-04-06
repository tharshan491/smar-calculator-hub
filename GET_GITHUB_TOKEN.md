# 🔑 Get GitHub Personal Access Token

**Required to upload files automatically**

---

## 📝 Step 1: Create GitHub Token (2 minutes)

### Go to GitHub Settings:
**URL:** https://github.com/settings/tokens

OR manually:
1. GitHub.com → Click your profile (top right)
2. Click "Settings"
3. Scroll down → "Developer settings"
4. Click "Personal access tokens"
5. Click "Tokens (classic)"

---

## 🔐 Step 2: Generate New Token

### Click "Generate new token" (classic)

### Fill in the form:
- **Token name:** `github-upload-automation`
- **Expiration:** 30 days (or longer)
- **Scopes:** Check the box for `repo` (full control of repositories)

### Click "Generate token"

---

## 💾 Step 3: Copy Token

⚠️ **IMPORTANT:** GitHub shows token ONLY ONCE!

1. You'll see a green box with your token
2. Click the copy icon OR manually select & copy
3. **Save it somewhere safe** (you'll need it once)

Token looks like:
```
ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q
```

---

## 🚀 Step 4: Run Upload Script

### Open PowerShell:

```powershell
cd "c:\Users\Ashwin\Downloads\new prj"
node upload-to-github.js <paste-your-token-here>
```

### Example:
```powershell
node upload-to-github.js ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q
```

---

## ⏱️ What Happens

Script will:
1. ✅ Verify token is valid
2. ✅ Connect to GitHub
3. ✅ Upload 6 files (one at a time)
4. ✅ Show success/fail for each
5. ✅ Complete in ~1 minute

Output will look like:
```
🚀 Starting GitHub Upload

Repository: tharshan491/Smart-Calculator-Hub
Branch: main
Files to upload: 6

🔐 Verifying GitHub token...
✅ Token verified

📤 Uploading: seo-content/automation.config.js
   ✅ Success

📤 Uploading: seo-content/prompts-db/auto-publish.js
   ✅ Success

... (more files)

🎉 All files uploaded successfully!
```

---

## ✅ After Upload Completes

1. **Check GitHub:**
   - URL: https://github.com/tharshan491/Smart-Calculator-Hub/Code
   - All files should be there ✅

2. **Vercel auto-deploys:**
   - Wait 5-10 minutes
   - Check: https://vercel.com/dashboard
   - Should show new "Production" deployment

3. **Verify Live:**
   - URL: https://smart-calculator-hub.vercel.app
   - Should load without errors ✅

---

## 🎯 Quick Checklist

- [ ] Go to GitHub Settings
- [ ] Create Personal Access Token
- [ ] Copy token to clipboard
- [ ] Open PowerShell
- [ ] Run: `node upload-to-github.js <token>`
- [ ] Wait for completion ✅

---

## 🚨 If Something Goes Wrong

| Error | Solution |
|-------|----------|
| "Invalid token" | Token incorrect or expired. Create new one. |
| "File not found" | Script is in wrong directory. Verify `c:\Users\Ashwin\Downloads\new prj` |
| "Permission denied" | Token doesn't have `repo` scope. Create new token with full repo access. |

---

## 💡 Security Note

- Token shown only once - save it safely
- After script completes, token can be deleted
- Never commit token to git or share publicly
- Can revoke token anytime: GitHub Settings → Tokens

---

## ⚡ Ready?

1. Get token from: https://github.com/settings/tokens
2. Create with `repo` scope
3. Copy token
4. Run in PowerShell:

```powershell
cd "c:\Users\Ashwin\Downloads\new prj"
node upload-to-github.js <paste-token>
```

**That's it!** Everything else is automatic! 🚀
