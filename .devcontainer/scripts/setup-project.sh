#!/bin/bash

# Setup script for VeritasVault Docs project
set -e

echo "Setting up VeritasVault Docs project..."

# Check if package.json exists, if not initialize Docusaurus
if [ ! -f "package.json" ]; then
  echo "Initializing Docusaurus project..."
  npx @docusaurus/init@latest init . classic
fi

# Install dependencies
echo "Installing main project dependencies..."
yarn install

# Set up demo-app if it doesn't exist
if [ ! -f "demo-app/package.json" ]; then
  echo "Setting up demo app..."
  cd demo-app
  
  # Initialize a basic React app
  cat > package.json << EOF
{
  "name": "veritasvault-demo-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF

  # Create basic React app structure
  mkdir -p public src
  
  # Create index.html
  cat > public/index.html << EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>VeritasVault Demo App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOF

  # Create index.js
  cat > src/index.js << EOF
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

  # Create App.js
  cat > src/App.js << EOF
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>VeritasVault Demo App</h1>
        <p>Interactive documentation examples will be displayed here.</p>
      </header>
    </div>
  );
}

export default App;
EOF

  # Install dependencies
  yarn install
  cd ..
fi

# Update package.json scripts in the main project
echo "Updating package.json scripts..."
node -e "
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add custom scripts
packageJson.scripts = {
  ...packageJson.scripts,
  'start:demo': 'cd demo-app && yarn start',
  'build:demo': 'cd demo-app && yarn build',
  'sync-docs': 'bash ./.devcontainer/scripts/sync-docs.sh',
  'start:all': 'npx concurrently \"yarn start\" \"yarn start:demo\"'
};

// Add dev dependencies
packageJson.devDependencies = {
  ...packageJson.devDependencies,
  'concurrently': '^7.6.0',
  'markdownlint-cli': '^0.33.0'
};

// Add license if missing
if (!packageJson.license) {
  packageJson.license = 'CC BY-SA 4.0';
}

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
"

# Install the updated dependencies
yarn install

# Create the sync-docs script
mkdir -p .devcontainer/scripts
cat > .devcontainer/scripts/sync-docs.sh << EOF
#!/bin/bash

# Script to manually sync documentation from component repositories
# Usage: ./sync-docs.sh [repository-name]

REPOS=("vv-chain-services" "vv-infra" "vv-gamification" "vv-frontend")
BASE_DIR="\$(pwd)"
TEMP_DIR="/tmp/vv-docs-sync"

if [ ! -d "\$BASE_DIR/docs" ]; then
  mkdir -p "\$BASE_DIR/docs"
  echo "Created docs directory"
fi

# If a specific repository is provided, only sync that one
if [ ! -z "\$1" ]; then
  if [[ " \${REPOS[@]} " =~ " \$1 " ]]; then
    REPOS=("\$1")
  else
    echo "Error: Unknown repository \$1"
    echo "Available repositories: \${REPOS[@]}"
    exit 1
  fi
fi

mkdir -p "\$TEMP_DIR"

for REPO in "\${REPOS[@]}"; do
  echo "Syncing documentation from \$REPO..."
  
  # Clone the repository if it doesn't exist
  if [ ! -d "\$TEMP_DIR/\$REPO" ]; then
    git clone "https://github.com/veritasvault/\$REPO.git" "\$TEMP_DIR/\$REPO" || {
      echo "Warning: Could not clone \$REPO. Creating placeholder directory."
      mkdir -p "\$TEMP_DIR/\$REPO/docs"
      echo "# \${REPO} Documentation" > "\$TEMP_DIR/\$REPO/docs/README.md"
      echo "This is a placeholder for \${REPO} documentation." >> "\$TEMP_DIR/\$REPO/docs/README.md"
    }
  else
    # Update the repository
    cd "\$TEMP_DIR/\$REPO"
    git pull || echo "Warning: Could not update \$REPO"
    cd "\$BASE_DIR"
  fi
  
  # Copy documentation to the appropriate directory
  TARGET_DIR="\$BASE_DIR/docs/\$(echo \$REPO | sed 's/vv-//')"
  
  if [ -d "\$TEMP_DIR/\$REPO/docs" ]; then
    mkdir -p "\$TARGET_DIR"
    cp -r "\$TEMP_DIR/\$REPO/docs/"* "\$TARGET_DIR/" || echo "Warning: Could not copy docs from \$REPO"
    echo "Documentation copied to \$TARGET_DIR"
  else
    echo "No docs directory found in \$REPO. Creating placeholder."
    mkdir -p "\$TARGET_DIR"
    echo "# \${REPO} Documentation" > "\$TARGET_DIR/README.md"
    echo "This is a placeholder for \${REPO} documentation." >> "\$TARGET_DIR/README.md"
  fi
done

echo "Documentation sync complete!"
EOF

# Make the script executable
chmod +x .devcontainer/scripts/sync-docs.sh

# Create a basic docs structure if it doesn't exist
if [ ! -f "docs/intro.md" ]; then
  mkdir -p docs/getting-started
  mkdir -p docs/architecture
  mkdir -p docs/tutorials
  
  # Create intro.md
  cat > docs/intro.md << EOF
---
sidebar_position: 1
---

# Introduction

Welcome to the VeritasVault documentation!

This documentation hub provides comprehensive information about the VeritasVault platform, its components, and how to use them.

## What is VeritasVault?

VeritasVault is a secure, blockchain-based platform for verifying and storing important documents and information.

## Getting Started

To get started with VeritasVault, check out the [Getting Started](getting-started/quickstart.md) guide.
EOF

  # Create a basic getting started guide
  cat > docs/getting-started/quickstart.md << EOF
---
sidebar_position: 1
---

# Quickstart Guide

This guide will help you get started with VeritasVault quickly.

## Installation

To install VeritasVault, follow these steps...

## Configuration

To configure VeritasVault, follow these steps...

## Usage

To use VeritasVault, follow these steps...
EOF
fi

echo "Setup complete! You can now run 'yarn start' to start the documentation site."
