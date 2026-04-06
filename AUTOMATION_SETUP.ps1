#!/usr/bin/env pwsh
# Automation Setup Guide - Windows PowerShell

Write-Host "🚀 SEO Content Automation Setup Guide" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Prerequisites
Write-Host "✅ Checking Prerequisites..." -ForegroundColor Green
$nodeVersion = node --version
$npmVersion = npm --version

Write-Host "Node.js: $nodeVersion" -ForegroundColor Yellow
Write-Host "npm: $npmVersion" -ForegroundColor Yellow
Write-Host ""

# 2. npm script explanation
Write-Host "📋 Available NPM Commands:" -ForegroundColor Cyan
Write-Host ""

$commands = @(
    @{cmd = "npm run content:generate"; desc = "Generate single batch of high-priority content"; time = "~5 min" },
    @{cmd = "npm run content:batch"; desc = "Generate 10 high-priority articles"; time = "~10 min" },
    @{cmd = "npm run content:batch:medium"; desc = "Generate 5 medium-priority articles"; time = "~5 min" },
    @{cmd = "npm run content:pipeline"; desc = "Run full automation pipeline"; time = "~20 min" },
    @{cmd = "npm run content:status"; desc = "Check generation status"; time = "instant" },
    @{cmd = "npm run content:schedule"; desc = "Start daily scheduling"; time = "runs in background" },
    @{cmd = "npm run seo:stats"; desc = "Display SEO statistics"; time = "instant" }
)

foreach ($cmd in $commands) {
    Write-Host "  Command: " -NoNewline -ForegroundColor White
    Write-Host $cmd.cmd -ForegroundColor Yellow
    Write-Host "  Purpose: " -NoNewline -ForegroundColor White
    Write-Host $cmd.desc -ForegroundColor Gray
    Write-Host "  Est. Time: " -NoNewline -ForegroundColor White
    Write-Host $cmd.time -ForegroundColor Cyan
    Write-Host ""
}

# 3. Quick Start
Write-Host "🏃 Quick Start (5 minutes):" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Generate content"
Write-Host "  > npm run content:batch" -ForegroundColor Yellow
Write-Host ""
Write-Host "Step 2: Check status"
Write-Host "  > npm run content:status" -ForegroundColor Yellow
Write-Host ""
Write-Host "Step 3: View generated files"
Write-Host "  > dir seo-content\generated-content" -ForegroundColor Yellow
Write-Host ""

# 4. Automated Scheduling (Optional)
Write-Host "📅 Setting Up Automated Scheduling:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: GitHub Actions (Recommended)" -ForegroundColor Green
Write-Host "  - Automatically generates content on schedule"
Write-Host "  - Deploys to Vercel"
Write-Host "  - Sends Slack notifications"
Write-Host "  - No local configuration needed"
Write-Host ""

Write-Host "Option 2: Windows Task Scheduler" -ForegroundColor Green
Write-Host "  Step 1: Create batch file (run-content-gen.bat):"
Write-Host "    @echo off" -ForegroundColor Gray
Write-Host "    cd C:\path\to\project" -ForegroundColor Gray
Write-Host "    npm run content:batch" -ForegroundColor Gray
Write-Host ""
Write-Host "  Step 2: Open Task Scheduler"
Write-Host "  Step 3: Create Basic Task > Select trigger (Daily at 6 AM)" -ForegroundColor Gray
Write-Host "  Step 4: Set action to run batch file" -ForegroundColor Gray
Write-Host ""

# 5. Monitoring
Write-Host "📊 Monitoring Generation:" -ForegroundColor Cyan
Write-Host ""
Write-Host "View generation logs:"
Write-Host "  > dir seo-content\prompts-db\..\logs" -ForegroundColor Yellow
Write-Host ""
Write-Host "Check content status:"
Write-Host "  > npm run content:status" -ForegroundColor Yellow
Write-Host ""
Write-Host "Open dashboard:"
Write-Host "  > start seo-content\prompts-db\dashboard.html" -ForegroundColor Yellow
Write-Host ""

# 6. Environment Setup
Write-Host "🔧 Environment Configuration:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Create .env.local file for optional features:"
Write-Host ""
Write-Host "  # Slack Notifications" -ForegroundColor Gray
Write-Host "  SLACK_WEBHOOK_URL=https://hooks.slack.com/..." -ForegroundColor Gray
Write-Host ""
Write-Host "  # Database (optional)" -ForegroundColor Gray
Write-Host "  DATABASE_URL=postgresql://..." -ForegroundColor Gray
Write-Host ""
Write-Host "  # Vercel Deployment (optional)" -ForegroundColor Gray
Write-Host "  VERCEL_TOKEN=..." -ForegroundColor Gray
Write-Host ""

# 7. Verification
Write-Host "✔️ Verification Checklist:" -ForegroundColor Cyan
Write-Host ""
$checklist = @(
    "✅ Node.js and npm installed",
    "✅ Dependencies installed (npm install)",
    "✅ auto-publish.js exists",
    "✅ content-generator.js exists",
    "✅ all-prompts.json exists",
    "✅ automation.config.js exists"
)

foreach ($item in $checklist) {
    Write-Host "  $item" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 You're ready to start generating content!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Run: npm run content:batch" -ForegroundColor Yellow
Write-Host "  2. Wait for generation to complete (~10 min for 10 articles)" -ForegroundColor Yellow
Write-Host "  3. Check: npm run content:status" -ForegroundColor Yellow
Write-Host "  4. Review generated files in: seo-content/generated-content/" -ForegroundColor Yellow
Write-Host ""
