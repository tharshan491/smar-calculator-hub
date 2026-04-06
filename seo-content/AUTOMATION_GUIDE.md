# 🤖 SEO Content Automation Setup Guide

## Overview

Complete automation system for generating, publishing, and deploying SEO content at scale.

**What it does:**
- ✅ Automatically generates SEO content from prompts
- ✅ Publishes to multiple destinations
- ✅ Integrates with Next.js app
- ✅ Deploys via GitHub Actions & Vercel
- ✅ Sends notifications
- ✅ Tracks metrics

## 🚀 Quick Start

### 1. Generate Content Now
```bash
npm run content:batch
```
This generates 10 high-priority articles (~10 minutes)

### 2. Check Status
```bash
npm run content:status
```
View generation progress and statistics

### 3. View Results
- **Markdown files**: `seo-content/generated-content/`
- **JSON files**: `seo-content/api/content/`
- **Dashboard**: `seo-content/prompts-db/dashboard.html`

---

## 📋 All Available Commands

### Content Generation
```bash
npm run content:generate        # Generate single batch
npm run content:batch           # 10 high-priority articles
npm run content:batch:medium    # 5 medium-priority articles
npm run content:pipeline        # Full automation pipeline
npm run content:schedule        # Start daily scheduling
npm run content:status          # Check current status
```

### SEO Operations
```bash
npm run seo:stats               # Show statistics
npm run seo:search              # Search prompts
npm run seo:export              # Export database
```

---

## 🔧 Configuration

### Auto-publish Configuration
Edit `seo-content/automation.config.js`:

```javascript
{
  generation: {
    batchSizes: { high: 10, medium: 5, low: 2 },
    rateLimit: 1000,  // ms between articles
    quality: {
      minWords: 2500,
      maxWords: 3500,
      targetKeywords: 12,
      sections: 8
    }
  },
  publishing: {
    autoPublish: true,
    slack: {
      enabled: true,
      webhook: process.env.SLACK_WEBHOOK_URL
    }
  }
}
```

---

## 🔄 Workflow Automation

### GitHub Actions (Recommended)

**Location:** `.github/workflows/auto-publish.yml`

**What it does:**
- Generates content on schedule
- Creates pull requests
- Deploys to Vercel
- Sends Slack notifications

**Setup:**
1. Push `.github/workflows/auto-publish.yml` to GitHub
2. Add secrets to GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_ORG_ID`
   - `SLACK_WEBHOOK_URL` (optional)

**Schedules:**
- Daily: 6 AM UTC (batch of 5-3 articles)
- Weekly (Monday): 2 AM UTC (batch of 10 articles)
- On-demand: Manual trigger via GitHub Actions UI

### Manual Scheduling (Windows Task Scheduler)

1. Create batch file `run-content-gen.bat`:
```batch
@echo off
cd C:\Users\Ashwin\Downloads\new prj
npm run content:batch
```

2. Open Task Scheduler
3. Create Basic Task:
   - Name: "SEO Content Generation"
   - Trigger: Daily at 6:00 AM
   - Action: Start program → `run-content-gen.bat`

---

## 🎯 Integration Points

### 1. Next.js Pages
**File:** `app/calculators/[slug]/page.tsx`

```typescript
// Automatically loads SEO content for each calculator
export async function generateStaticParams() {
  const highPriority = await contentService.getContentByPriority('high');
  return highPriority.map((content) => ({ slug: content.slug }));
}
```

### 2. API Routes
**File:** `app/api/content/route.ts`

```
GET /api/content                    # Get all content
GET /api/content?category=health    # Get by category
GET /api/content?priority=high      # Get by priority
GET /api/content?q=mortgage         # Search
GET /api/content/[id]               # Get by ID
```

### 3. Content Service
**File:** `app/lib/content-service.ts`

```typescript
import { contentService } from '@/lib/content-service';

// Get content
const content = await contentService.getContentBySlug('loan-calculator');

// Search
const results = await contentService.searchContent('mortgage');

// Stats
const stats = await contentService.getStats();
```

---

## 📊 Output Files

### Generated Content Structure
```
seo-content/
├── generated-content/          # Markdown for reading
│   ├── seo-loan-calculator.md
│   └── seo-bmi-calculator.md
│
├── api/content/                # JSON for API
│   ├── FIN-001.json
│   └── HEALTH-001.json
│
├── content-index.json          # Quick lookup
└── logs/                       # Generation logs
    └── generation-{timestamp}.json
```

### Content Index Format
```json
{
  "calculators": [{
    "id": "FIN-001",
    "title": "Loan Calculator",
    "slug": "loan-calculator",
    "category": "financial",
    "priority": "high",
    "keywords": ["loan", "EMI", ...],
    "url": "/calculators/loan-calculator",
    "publishedAt": "2024-04-05T..."
  }],
  "lastUpdated": "2024-04-05T...",
  "totalItems": 120
}
```

---

## 📈 Monitoring & Analytics

### Generation Status
```bash
npm run content:status
```

Shows:
- Total articles generated
- By category breakdown
- By priority breakdown
- Generation timeline
- Recent logs

### Dashboard
```bash
open seo-content/prompts-db/dashboard.html
```

Displays:
- Progress bars
- Category statistics
- Priority distribution
- Phase timeline
- Generated content list

### Logs
Location: `seo-content/logs/`

Each generation creates a JSON log with:
- Timestamp
- Success count
- Failed count
- Duration
- Detailed results

---

## 🔐 Environment Variables

### Required (for automation)
```
# None required - works out of the box!
```

### Optional (for enhanced features)
```
# Slack Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Database Integration
DATABASE_URL=postgresql://user:password@host:5432/db

# GitHub Actions
VERCEL_TOKEN=your_token_here
VERCEL_PROJECT_ID=prj_xxxxx
VERCEL_ORG_ID=team_xxxxx

# Logging
LOG_LEVEL=info  # debug, info, warn, error
```

---

## 🚨 Troubleshooting

### Issue: "Command not found" error
**Solution:** 
```bash
npm install
npm run content:batch
```

### Issue: Generation is slow
**Solution:** Adjust `rateLimit` in `automation.config.js` (reduce the value)

### Issue: Files not being created
**Solution:** Check directory permissions:
```bash
mkdir -p seo-content/generated-content
mkdir -p seo-content/api/content
```

### Issue: GitHub Actions not running
**Solution:** 
1. Verify secrets are set in GitHub
2. Check repository has `.github/workflows/auto-publish.yml`
3. Enable Actions in GitHub settings

---

## 📊 Metrics & Performance

### Expected Performance
- **High Priority (10 articles):** ~10-15 minutes
- **Medium Priority (5 articles):** ~5-8 minutes
- **Full Pipeline:** ~20-30 minutes

### Resource Usage
- CPU: ~20-40%
- Memory: ~200-300 MB
- Disk space: ~2-3 MB per article

### Scaling
- Single process: 10-15 articles/batch
- GitHub Actions: Unlimited batches
- With database: Can handle 200+ articles

---

## 🔄 Workflow Examples

### Example 1: Daily Generation
```bash
# Run daily at 6 AM
npm run content:batch

# Creates: 10 new articles
# Time: ~10 minutes
# Output: seo-content/generated-content/*.md
```

### Example 2: Weekly Full Pipeline
```bash
# Run weekly on Monday
npm run content:pipeline

# Creates: High + Medium priority articles
# Time: ~20-30 minutes
# Deploys: Automatically to Vercel
```

### Example 3: On-Demand Generation
```bash
# Generate specific batch
npm run content:batch high:20   # Generate 20 high-priority

# Or via npm script
npm run content:generate
```

---

## 🎯 Success Criteria

### Daily Generation
- ✅ 5-10 articles generated
- ✅ All files created
- ✅ Logs recorded
- ✅ Status shows progress

### Weekly Full Pipeline
- ✅ 15+ articles generated
- ✅ Pull request created
- ✅ Deployed to Vercel
- ✅ Slack notification sent

### Monthly Comprehensive
- ✅ 50+ articles generated
- ✅ 200+ total articles available
- ✅ Search rankings improving
- ✅ Traffic increasing

---

## 📚 File Reference

### Core Automation Files
| File | Purpose |
|------|---------|
| `auto-publish.js` | Main automation engine |
| `automation.config.js` | Configuration settings |
| `content-generator.js` | Content creation |
| `prompt-manager.js` | Prompt management |

### Next.js Integration
| File | Purpose |
|------|---------|
| `app/lib/content-service.ts` | Service for accessing content |
| `app/api/content/route.ts` | Content API endpoints |
| `app/calculators/[slug]/page.tsx` | Dynamic calculator pages |

### GitHub Actions
| File | Purpose |
|------|---------|
| `.github/workflows/auto-publish.yml` | CI/CD automation |

---

## 🚀 Next Steps

1. **Generated Content (Week 1)**
   ```bash
   npm run content:batch
   npm run content:batch:medium
   ```

2. **Verify Integration (Week 2)**
   ```bash
   npm run build
   npm run start
   # Test: http://localhost:3000/calculators/loan-calculator
   ```

3. **Setup Automation (Week 3)**
   - Push to GitHub
   - Add secrets
   - Enable GitHub Actions

4. **Monitor Performance (Week 4)**
   ```bash
   npm run content:status
   # Review dashboard
   # Check search rankings
   ```

---

## 📞 Support

### Quick Help
```bash
node seo-content/prompts-db/auto-publish.js help
```

### More Info
- **Quick Reference:** `QUICK_START.md`
- **Full Docs:** `README.md`
- **Implementation:** `IMPLEMENTATION_GUIDE.md`

---

**System Version:** 1.0  
**Last Updated:** April 5, 2024  
**Status:** Production Ready
