#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎨 Generating Theme-Specific Favicons from Your Existing Logos\n');

// Check if ImageMagick is available
let hasImageMagick = false;
try {
  execSync('convert --version', { stdio: 'ignore' });
  hasImageMagick = true;
  console.log('✅ ImageMagick found - will generate favicons automatically\n');
} catch (error) {
  console.log('❌ ImageMagick not found - will provide manual instructions\n');
}

// Check source files
const sourceFiles = {
  light: 'R-logo-blue.png',
  dark: 'R-Logo-White.svg'
};

console.log('📁 Checking source files...\n');

Object.entries(sourceFiles).forEach(([theme, filename]) => {
  const filePath = path.join(__dirname, 'public', filename);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${theme} theme source: ${filename}`);
  } else {
    console.log(`❌ ${theme} theme source: ${filename} - MISSING`);
  }
});

console.log('');

if (!hasImageMagick) {
  console.log('🛠️  Manual Generation Instructions:\n');
  
  console.log('Option 1: Install ImageMagick');
  console.log('macOS: brew install imagemagick');
  console.log('Windows: Download from https://imagemagick.org/');
  console.log('Linux: sudo apt-get install imagemagick\n');
  
  console.log('Option 2: Use Online Tools');
  console.log('1. Go to https://convertio.co/svg-png/');
  console.log('2. Convert R-Logo-White.svg to PNG');
  console.log('3. Use https://favicon.io/favicon-converter/');
  console.log('4. Generate both light and dark versions\n');
  
  console.log('Option 3: Use GIMP/Photoshop');
  console.log('1. Open your logo files');
  console.log('2. Resize to required sizes: 16x16, 32x32, 96x96, 192x192, 512x512');
  console.log('3. Export as PNG with appropriate names\n');
  
  process.exit(0);
}

// Generate favicons automatically
console.log('🚀 Generating theme-specific favicons automatically...\n');

const sizes = [16, 32, 96, 192, 512];
const publicDir = path.join(__dirname, 'public');

// First, convert SVG to PNG if needed
if (fs.existsSync(path.join(publicDir, 'R-Logo-White.svg'))) {
  console.log('Converting SVG to PNG...');
  try {
    execSync('convert public/R-Logo-White.svg public/R-logo-white.png', { stdio: 'inherit' });
    console.log('✅ Converted R-Logo-White.svg to R-logo-white.png\n');
  } catch (error) {
    console.log('❌ Failed to convert SVG. Please convert manually or use PNG version.\n');
    process.exit(1);
  }
}

// Generate light theme favicons
console.log('🌞 Generating light theme favicons...');
sizes.forEach(size => {
  const filename = `favicon-light-${size}x${size}.png`;
  const filepath = path.join(publicDir, filename);
  
  try {
    execSync(`convert public/R-logo-blue.png -resize ${size}x${size} ${filepath}`, { stdio: 'ignore' });
    console.log(`✅ Created ${filename}`);
  } catch (error) {
    console.log(`❌ Failed to create ${filename}`);
  }
});

console.log('');

// Generate dark theme favicons
console.log('🌙 Generating dark theme favicons...');
sizes.forEach(size => {
  const filename = `favicon-dark-${size}x${size}.png`;
  const filepath = path.join(publicDir, filename);
  
  try {
    execSync(`convert public/R-logo-white.png -resize ${size}x${size} ${filepath}`, { stdio: 'ignore' });
    console.log(`✅ Created ${filename}`);
  } catch (error) {
    console.log(`❌ Failed to create ${filename}`);
  }
});

console.log('\n🎉 Favicon generation complete!');
console.log('Now run: node update-html-for-themes.js');
console.log('This will update your HTML with theme-aware favicon declarations.');
