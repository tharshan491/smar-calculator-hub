#!/usr/bin/env node

/**
 * GitHub Upload Script - Automated File Upload via GitHub API
 * Uploads all project files to GitHub repository without requiring Git
 * 
 * Usage: node upload-to-github.js <github-token>
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const REPO_OWNER = 'tharshan491';
const REPO_NAME = 'Smart-Calculator-Hub';
const BRANCH = 'main';
const PROJECT_ROOT = process.cwd();

// Files to upload with their paths
const FILES_TO_UPLOAD = [
  { src: 'seo-content/automation.config.js', dest: 'seo-content/automation.config.js' },
  { src: 'seo-content/prompts-db/auto-publish.js', dest: 'seo-content/prompts-db/auto-publish.js' },
  { src: 'app/lib/content-service.ts', dest: 'app/lib/content-service.ts' },
  { src: 'app/api/content/route.ts', dest: 'app/api/content/route.ts' },
  { src: 'app/calculators/[slug]/page.tsx', dest: 'app/calculators/[slug]/page.tsx' },
  { src: 'package.json', dest: 'package.json' },
];

// Helper function to make HTTPS requests
function makeRequest(method, path, headers, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'User-Agent': 'Node.js Upload Script',
        'Accept': 'application/vnd.github.v3+json',
        ...headers,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        } else {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(body);
    }
    req.end();
  });
}

// Get file content as base64
function getFileContent(filePath) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return Buffer.from(content).toString('base64');
}

// Get file SHA (for updates)
async function getFileSha(token, filePath) {
  try {
    const apiPath = `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;
    const headers = { 'Authorization': `token ${token}` };
    const response = await makeRequest('GET', apiPath, headers);
    return response.data.sha;
  } catch (err) {
    return null; // File doesn't exist yet
  }
}

// Upload or update a file
async function uploadFile(token, filePath, destPath) {
  try {
    console.log(`📤 Uploading: ${destPath}`);

    const content = getFileContent(filePath);
    const sha = await getFileSha(token, destPath);

    const apiPath = `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${destPath}`;
    const headers = { 'Authorization': `token ${token}` };

    const payload = {
      message: `Add/update ${path.basename(destPath)}`,
      content: content,
      branch: BRANCH,
    };

    if (sha) {
      payload.sha = sha; // Update existing file
    }

    const response = await makeRequest(
      'PUT',
      apiPath,
      headers,
      JSON.stringify(payload)
    );

    console.log(`   ✅ Success: ${response.data.commit.message}`);
    return true;
  } catch (err) {
    console.error(`   ❌ Failed: ${err.message}`);
    return false;
  }
}

// Main upload function
async function uploadAllFiles(token) {
  console.log('\n🚀 Starting GitHub Upload\n');
  console.log(`Repository: ${REPO_OWNER}/${REPO_NAME}`);
  console.log(`Branch: ${BRANCH}`);
  console.log(`Files to upload: ${FILES_TO_UPLOAD.length}\n`);

  let successful = 0;
  let failed = 0;

  // Verify token first
  try {
    console.log('🔐 Verifying GitHub token...');
    const headers = { 'Authorization': `token ${token}` };
    await makeRequest('GET', '/user', headers);
    console.log('✅ Token verified\n');
  } catch (err) {
    console.error('❌ Invalid GitHub token:', err.message);
    process.exit(1);
  }

  // Upload each file
  for (const file of FILES_TO_UPLOAD) {
    try {
      const localPath = path.join(PROJECT_ROOT, file.src);
      if (!fs.existsSync(localPath)) {
        console.error(`❌ Local file not found: ${file.src}`);
        failed++;
        continue;
      }

      const success = await uploadFile(token, file.src, file.dest);
      if (success) {
        successful++;
      } else {
        failed++;
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`❌ Error uploading ${file.src}:`, err.message);
      failed++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('='.repeat(50));

  if (failed === 0) {
    console.log('\n🎉 All files uploaded successfully!');
    console.log('\n📍 Next steps:');
    console.log('1. Go to: https://github.com/tharshan491/Smart-Calculator-Hub');
    console.log('2. Verify files are in correct folders');
    console.log('3. Go to Actions tab');
    console.log('4. Run workflow manually or wait for next schedule');
    console.log('5. Check Vercel deployment at: https://vercel.com/dashboard\n');
  }
}

// Entry point
async function main() {
  const token = process.argv[2];

  if (!token) {
    console.log('\n❌ GitHub Personal Access Token required!\n');
    console.log('Usage: node upload-to-github.js <github-token>\n');
    console.log('To get a token:');
    console.log('1. Go to: https://github.com/settings/tokens');
    console.log('2. Click "Generate new token" (classic)');
    console.log('3. Select scopes: repo (full control)');
    console.log('4. Generate and copy token');
    console.log('5. Run: node upload-to-github.js <token>\n');
    process.exit(1);
  }

  try {
    await uploadAllFiles(token);
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

main();
