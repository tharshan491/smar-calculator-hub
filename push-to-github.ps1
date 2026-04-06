# Git Push Script for Smart Calculator Hub (PowerShell)
# This script commits and pushes all automation files to GitHub

$projectPath = "c:\Users\Ashwin\Downloads\new prj"
cd $projectPath

Write-Host ""
Write-Host "========================================"
Write-Host " GitHub Push Script - PowerShell"
Write-Host "========================================"
Write-Host ""

# Check if git is available
try {
    $gitVersion = & git --version 2>&1
    Write-Host "Git Version: $gitVersion" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Git not found in PATH!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Solutions:" -ForegroundColor Yellow
    Write-Host "1. Install Git from: https://git-scm.com/download/win"
    Write-Host "2. Use Git Bash (comes with Git installation)"
    Write-Host "3. Restart PowerShell after installation"
    Write-Host "4. Or run the .bat script instead: push-to-github.bat"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check git status
Write-Host ""
Write-Host "========================================"
Write-Host "Checking Git Status..."
Write-Host "========================================"
Write-Host ""
& git status

# Stage files
Write-Host ""
Write-Host "========================================"
Write-Host "Staging files..."
Write-Host "========================================"
Write-Host ""
& git add -A

# Commit
Write-Host ""
Write-Host "========================================"
Write-Host "Committing changes..."
Write-Host "========================================"
Write-Host ""
$commitMsg = "Add complete automation system: auto-publish, CI/CD, Next.js integration, Vercel deployment"
& git commit -m $commitMsg

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "WARNING: Commit may have failed or nothing to commit" -ForegroundColor Yellow
}

# Push
Write-Host ""
Write-Host "========================================"
Write-Host "Pushing to GitHub (main branch)..."
Write-Host "========================================"
Write-Host ""
& git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "SUCCESS! Files pushed to GitHub" -ForegroundColor Green
    Write-Host "========================================"
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to GitHub Actions:"
    Write-Host "   https://github.com/tharshan491/Smart-Calculator-Hub/actions"
    Write-Host ""
    Write-Host "2. Click 'Run workflow' to test"
    Write-Host ""
    Write-Host "3. Check Vercel Deployments:"
    Write-Host "   https://vercel.com/dashboard/projects"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "ERROR: Push failed!" -ForegroundColor Red
    Write-Host "Make sure your GitHub credentials are configured"
}

Read-Host "Press Enter to exit"
