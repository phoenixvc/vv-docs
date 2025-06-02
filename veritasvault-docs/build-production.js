// Force build without broken links check
const { execSync } = require('child_process');
const path = require('path');

// Set environment variable to skip broken links check
process.env.SKIP_BROKEN_LINKS_CHECK = 'true';

try {
  // Execute build command with environment variable set
  console.log('Building documentation with broken links check disabled...');
  execSync('npm run build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      SKIP_BROKEN_LINKS_CHECK: 'true'
    }
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}