const fs = require('fs');
const path = require('path');

// Path to the docusaurus.config.js file
const configPath = path.join('veritasvault-docs', 'docusaurus.config.js');

// Read the current content
fs.readFile(configPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  // Replace 'onBrokenLinks: "throw"' with 'onBrokenLinks: "warn"'
  const updatedContent = data.replace(/onBrokenLinks:\s*['"]throw['"]/g, 'onBrokenLinks: "warn"');
  
  // Backup the original file
  fs.writeFile(`${configPath}.backup`, data, 'utf8', (err) => {
    if (err) {
      console.error(`Error creating backup: ${err}`);
      return;
    }
    console.log(`Created backup at ${configPath}.backup`);
    
    // Write the updated content
    fs.writeFile(configPath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        return;
      }
      console.log(`Successfully updated ${configPath}`);
      console.log(`Changed 'onBrokenLinks: "throw"' to 'onBrokenLinks: "warn"'`);
    });
  });
});