@echo off
REM Git Push Script for Smart Calculator Hub
REM This script commits and pushes all automation files to GitHub

cd /d "c:\Users\Ashwin\Downloads\new prj"

echo.
echo ========================================
echo  GitHub Push Script
echo ========================================
echo.
echo Checking Git...
git --version

if errorlevel 1 (
    echo.
    echo ERROR: Git is not found!
    echo.
    echo Solutions:
    echo 1. Install Git: https://git-scm.com/download/win
    echo 2. Or use Git Bash (included with Git installation)
    echo 3. After installation, restart PowerShell
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Checking Git Status...
echo ========================================
git status

echo.
echo ========================================
echo Staging files...
echo ========================================
git add -A

echo.
echo ========================================
echo Committing changes...
echo ========================================
git commit -m "Add complete automation system: auto-publish, CI/CD, Next.js integration, Vercel deployment"

echo.
echo ========================================
echo Pushing to GitHub...
echo ========================================
git push origin main

if errorlevel 1 (
    echo.
    echo ERROR: Push failed!
    echo Make sure your GitHub credentials are configured
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Files pushed to GitHub
echo ========================================
echo.
echo Next steps:
echo 1. Go to GitHub: https://github.com/tharshan491/Smart-Calculator-Hub
echo 2. Go to Actions tab
echo 3. Click "Run workflow" to test
echo.
pause
