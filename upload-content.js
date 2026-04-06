#!/usr/bin/env node

/**
 * GitHub Upload Script - Upload Content Files
 * Uploads sample content files to GitHub
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_OWNER = 'tharshan491';
const REPO_NAME = 'Smart-Calculator-Hub';
const BRANCH = 'main';
const PROJECT_ROOT = process.cwd();

// Files to upload
const CONTENT_FILES = [
  { src: 'seo-content/api/content/FIN-001.json', dest: 'seo-content/api/content/FIN-001.json' },
  { src: 'seo-content/api/content/FIN-002.json', dest: 'seo-content/api/content/FIN-002.json' },
  { src: 'seo-content/api/content/HEALTH-001.json', dest: 'seo-content/api/content/HEALTH-001.json' },
  { src: 'seo-content/api/content/MATH-001.json', dest: 'seo-content/api/content/MATH-001.json' },
];

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

function getFileContent(filePath) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return Buffer.from(content).toString('base64');
}

async function getFileSha(token, filePath) {
  try {
    const apiPath = `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;
    const headers = { 'Authorization': `token ${token}` };
    const response = await makeRequest('GET', apiPath, headers);
    return response.data.sha;
  } catch (err) {
    return null;
  }
}

async function uploadFile(token, filePath, destPath) {
  try {
    console.log(`📤 Uploading: ${destPath}`);

    const content = getFileContent(filePath);
    const sha = await getFileSha(token, destPath);

    const apiPath = `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${destPath}`;
    const headers = { 'Authorization': `token ${token}` };

    const payload = {
      message: `Add sample content: ${path.basename(destPath)}`,
      content: content,
      branch: BRANCH,
    };

    if (sha) {
      payload.sha = sha;
    }

    const response = await makeRequest('PUT', apiPath, headers, JSON.stringify(payload));
    console.log(`   ✅ Success: Content file uploaded`);
    return true;
  } catch (err) {
    console.error(`   ❌ Failed: ${err.message}`);
    return false;
  }
}

async function uploadAllFiles(token) {
  console.log('\n📄 Uploading Sample Content Files\n');

  let successful = 0;
  let failed = 0;

  try {
    console.log('🔐 Verifying GitHub token...');
    const headers = { 'Authorization': `token ${token}` };
    await makeRequest('GET', '/user', headers);
    console.log('✅ Token verified\n');
  } catch (err) {
    console.error('❌ Invalid GitHub token:', err.message);
    process.exit(1);
  }

  for (const file of CONTENT_FILES) {
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

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`❌ Error uploading ${file.src}:`, err.message);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('='.repeat(50));

  if (failed === 0) {
    console.log('\n🎉 All content files uploaded!');
  }
}

async function main() {
  const token = process.argv[2];

  if (!token) {
    console.log('Usage: node upload-content.js <github-token>');
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
