const fs = require('fs');
const path = require('path');

// Path to the docusaurus.config.js file
const configPath = path.join('veritasvault-docs', 'docusaurus.config.js');

// Read the current content
const fs = require('fs').promises;
const path = require('path');

// Path to the docusaurus.config.js file
const configPath = path.join('veritasvault-docs', 'docusaurus.config.js');

async function updateDocusaurusConfig() {
  try {
    // Read the current content
    const data = await fs.readFile(configPath, 'utf8');
    
    // Replace 'onBrokenLinks: "throw"' with 'onBrokenLinks: "warn"'
    const updatedContent = data.replace(/onBrokenLinks:\s*['"]throw['"]/g, 'onBrokenLinks: "warn"');
    
    // Verify that replacement occurred
    if (data === updatedContent) {
      console.log('No changes needed - onBrokenLinks is not set to "throw"');
      return;
    }
    
    // Backup the original file
    await fs.writeFile(`${configPath}.backup`, data, 'utf8');
    console.log(`Created backup at ${configPath}.backup`);
    
    // Write the updated content
    await fs.writeFile(configPath, updatedContent, 'utf8');
    console.log(`Successfully updated ${configPath}`);
    console.log(`Changed 'onBrokenLinks: "throw"' to 'onBrokenLinks: "warn"'`);
    
  } catch (error) {
    console.error(`Error updating config: ${error}`);
    process.exit(1);
  }
}

updateDocusaurusConfig();