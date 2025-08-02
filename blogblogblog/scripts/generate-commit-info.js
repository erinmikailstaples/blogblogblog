#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get the latest commit date in ISO 8601 format
  const commitDate = execSync('git log -1 --format=%cI', { 
    encoding: 'utf8',
    cwd: __dirname 
  }).trim();
  
  // Create the commit info object
  const commitInfo = {
    lastCommit: commitDate
  };
  
  // Ensure the assets directory exists
  const assetsDir = path.join(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  // Write the commit info to assets/commit-info.json
  const outputPath = path.join(assetsDir, 'commit-info.json');
  fs.writeFileSync(outputPath, JSON.stringify(commitInfo, null, 2));
  
  console.log(`✓ Generated commit info: ${commitInfo.lastCommit}`);
  console.log(`✓ Written to: ${outputPath}`);
  
} catch (error) {
  console.error('Error generating commit info:', error.message);
  process.exit(1);
}
