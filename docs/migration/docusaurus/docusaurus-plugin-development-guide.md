# Docusaurus Plugin Development Guide

## Table of Contents

- [Introduction](#introduction)
- [Plugin Architecture Overview](#plugin-architecture-overview)
- [Types of Docusaurus Plugins](#types-of-docusaurus-plugins)
- [Creating Your First Plugin](#creating-your-first-plugin)
- [Advanced Plugin Development](#advanced-plugin-development)
- [Integrating with Existing Plugins](#integrating-with-existing-plugins)
- [Testing and Debugging Plugins](#testing-and-debugging-plugins)
- [Best Practices and Optimization](#best-practices-and-optimization)
- [Publishing and Maintaining Plugins](#publishing-and-maintaining-plugins)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
- [Resources and References](#resources-and-references)

## Introduction

Docusaurus plugins allow you to extend and customize your documentation site with additional functionality. This guide will walk you through the process of creating custom plugins for Docusaurus v2, from understanding the architecture to publishing your plugin for others to use.

### What You'll Learn

- Understanding Docusaurus plugin architecture
- Creating different types of plugins
- Extending core functionality
- Testing and debugging your plugins
- Publishing and maintaining your plugins

### Prerequisites

- Familiarity with JavaScript/TypeScript
- Basic understanding of React
- Experience with Docusaurus as a user
- Node.js development environment

## Plugin Architecture Overview

Docusaurus has a flexible plugin system that allows you to extend its functionality in various ways. Before diving into development, it's important to understand how the plugin architecture works.

### Plugin Lifecycle

Plugins in Docusaurus follow a lifecycle with specific hooks that are called at different stages:

\`\`\`mermaid
graph TD
    A["loadContent"] --> B["contentLoaded"]
    B --> C["postBuild"]
    D["getPathsToWatch"] --> A
    E["configureWebpack"] --> F["postProcess"]
\`\`\`

### Core Concepts

1. **Plugin Instance**: A JavaScript object with lifecycle methods
2. **Plugin Options**: Configuration passed to your plugin
3. **Plugin Context**: Information about the Docusaurus environment
4. **Lifecycle Methods**: Functions called at specific points in the build process

### Plugin Structure

A basic Docusaurus plugin has the following structure:

\`\`\`javascript
module.exports = function(context, options) {
  return {
    name: 'my-plugin',
    
    // Lifecycle methods
    async loadContent() {
      // Load or generate content
      return content;
    },
    
    async contentLoaded({content, actions}) {
      // Use the loaded content to generate routes, etc.
    },
    
    // Other lifecycle methods...
  };
};
\`\`\`

## Types of Docusaurus Plugins

Docusaurus supports several types of plugins, each serving different purposes:

### 1. Content Plugins

Content plugins generate pages from data sources. Examples include:
- Blog plugins
- Documentation plugins
- Custom content type plugins

### 2. Theme Plugins

Theme plugins provide UI components and styling. They can:
- Add new components
- Override existing components
- Provide CSS styling

### 3. Functionality Plugins

Functionality plugins add features without necessarily affecting content or UI:
- SEO plugins
- Analytics plugins
- Sitemap generators
- Search functionality

### 4. Integration Plugins

Integration plugins connect Docusaurus with external services:
- CMS integrations
- API connectors
- Authentication services

## Creating Your First Plugin

Let's start by creating a simple plugin that adds custom metadata to your documentation pages.

### Step 1: Set Up the Plugin Structure

Create a new directory for your plugin:

\`\`\`bash
mkdir docusaurus-plugin-metadata
cd docusaurus-plugin-metadata
npm init -y
\`\`\`

Install necessary dependencies:

\`\`\`bash
npm install --save @docusaurus/types @docusaurus/utils
\`\`\`

### Step 2: Create the Plugin File

Create a file named `index.js` with the basic plugin structure:

\`\`\`javascript
module.exports = function(context, options) {
  return {
    name: 'docusaurus-plugin-metadata',
    
    // Plugin implementation will go here
  };
};
\`\`\`

### Step 3: Implement Plugin Functionality

Let's add functionality to inject custom metadata into the site:

\`\`\`javascript
module.exports = function(context, options) {
  const {generatedFilesDir} = context;
  const {metadata = {}} = options;
  
  return {
    name: 'docusaurus-plugin-metadata',
    
    async loadContent() {
      // Return the metadata from options
      return metadata;
    },
    
    async contentLoaded({content, actions}) {
      const {createData, addRoute} = actions;
      
      // Create a JS file with the metadata
      const metadataPath = await createData(
        'metadata.json',
        JSON.stringify(content)
      );
      
      // Add a route to access the metadata
      addRoute({
        path: '/metadata',
        component: '@theme/MetadataPage',
        modules: {
          metadata: metadataPath,
        },
        exact: true,
      });
    },
    
    // Add global data that can be accessed from any component
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `window.siteMetadata = ${JSON.stringify(metadata)};`,
          },
        ],
      };
    },
  };
};
\`\`\`

### Step 4: Create a Theme Component

Create a directory for your theme components:

\`\`\`bash
mkdir -p src/theme
\`\`\`

Create a file `src/theme/MetadataPage/index.js`:

\`\`\`jsx
import React from 'react';
import Layout from '@theme/Layout';

export default function MetadataPage(props) {
  const {metadata} = props;
  
  return (
    <Layout title="Site Metadata">
      <div className="container margin-vert--lg">
        <h1>Site Metadata</h1>
        <pre>{JSON.stringify(metadata, null, 2)}</pre>
      </div>
    </Layout>
  );
}
\`\`\`

### Step 5: Configure the Plugin in Docusaurus

In your Docusaurus project's `docusaurus.config.js`, add your plugin:

\`\`\`javascript
module.exports = {
  // ... other config
  plugins: [
    [
      'docusaurus-plugin-metadata',
      {
        metadata: {
          version: '1.0.0',
          lastUpdated: new Date().toISOString(),
          author: 'Your Name',
          repository: 'https://github.com/yourusername/your-repo',
        },
      },
    ],
  ],
  // ... other config
};
\`\`\`

## Advanced Plugin Development

Now let's explore more advanced plugin development techniques.

### Creating a TypeScript Plugin

For better type safety and developer experience, you can create your plugin using TypeScript.

First, set up a TypeScript project:

\`\`\`bash
npm install --save-dev typescript @types/react @types/node
\`\`\`

Create a `tsconfig.json` file:

\`\`\`json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "jsx": "react",
    "declaration": true,
    "outDir": "lib"
  },
  "include": ["src"],
  "exclude": ["node_modules", "lib"]
}
\`\`\`

Create your plugin in TypeScript:

\`\`\`typescript
// src/index.ts
import type {LoadContext, Plugin} from '@docusaurus/types';

export interface PluginOptions {
  metadata: Record<string, any>;
}

export default function pluginMetadata(
  context: LoadContext,
  options: PluginOptions
): Plugin<any> {
  const {generatedFilesDir} = context;
  const {metadata = {}} = options;
  
  return {
    name: 'docusaurus-plugin-metadata',
    
    async loadContent() {
      return metadata;
    },
    
    async contentLoaded({content, actions}) {
      const {createData, addRoute} = actions;
      
      const metadataPath = await createData(
        'metadata.json',
        JSON.stringify(content)
      );
      
      addRoute({
        path: '/metadata',
        component: '@theme/MetadataPage',
        modules: {
          metadata: metadataPath,
        },
        exact: true,
      });
    },
    
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `window.siteMetadata = ${JSON.stringify(metadata)};`,
          },
        ],
      };
    },
  };
}
\`\`\`

### Creating a Content Plugin

Let's create a plugin that generates pages from external data:

\`\`\`typescript
// src/index.ts
import type {LoadContext, Plugin} from '@docusaurus/types';
import {normalizeUrl} from '@docusaurus/utils';
import fs from 'fs-extra';
import path from 'path';

export interface PluginOptions {
  dataSource: string;
  routeBasePath: string;
}

export default function externalContentPlugin(
  context: LoadContext,
  options: PluginOptions
): Plugin<any> {
  const {siteDir, generatedFilesDir} = context;
  const {dataSource, routeBasePath = 'external'} = options;
  
  return {
    name: 'docusaurus-plugin-external-content',
    
    async loadContent() {
      const dataPath = path.resolve(siteDir, dataSource);
      const data = await fs.readJSON(dataPath);
      return data;
    },
    
    async contentLoaded({content, actions}) {
      const {createData, addRoute} = actions;
      
      // For each item in the data, create a page
      await Promise.all(
        content.map(async (item, index) => {
          const itemData = await createData(
            `external-content-${index}.json`,
            JSON.stringify(item)
          );
          
          addRoute({
            path: normalizeUrl([routeBasePath, item.slug]),
            component: '@theme/ExternalContentPage',
            modules: {
              content: itemData,
            },
            exact: true,
          });
        })
      );
      
      // Create an index page
      const indexData = await createData(
        'external-content-index.json',
        JSON.stringify(content.map(item => ({
          title: item.title,
          slug: item.slug,
          description: item.description,
        })))
      );
      
      addRoute({
        path: routeBasePath,
        component: '@theme/ExternalContentIndex',
        modules: {
          items: indexData,
        },
        exact: true,
      });
    },
    
    getPathsToWatch() {
      // Watch the data source file for changes
      return [path.resolve(context.siteDir, dataSource)];
    },
  };
}
\`\`\`

### Creating a Theme Plugin

Theme plugins allow you to provide custom React components:

\`\`\`typescript
// src/index.ts
import type {LoadContext, Plugin} from '@docusaurus/types';
import path from 'path';

export default function themePlugin(context: LoadContext): Plugin<void> {
  const {siteDir} = context;
  
  return {
    name: 'docusaurus-theme-custom',
    
    getThemePath() {
      // Path to your theme components
      return path.resolve(__dirname, '../src/theme');
    },
    
    getTypeScriptThemePath() {
      // Path to your theme TypeScript definitions
      return path.resolve(__dirname, '../src/theme-types');
    },
    
    getClientModules() {
      // CSS files that should be loaded by the client
      return [path.resolve(__dirname, '../src/css/custom.css')];
    },
  };
}
\`\`\`

## Integrating with Existing Plugins

Your custom plugins can integrate with existing Docusaurus plugins to extend their functionality.

### Extending the Docs Plugin

Here's how to extend the docs plugin to add custom processing:

\`\`\`javascript
module.exports = function(context, options) {
  return {
    name: 'docs-enhancer-plugin',
    
    // This runs after the docs plugin has loaded content
    extendCli(cli) {
      cli
        .command('enhance-docs')
        .description('Enhance documentation with additional metadata')
        .action(async () => {
          // Implementation of the command
          console.log('Enhancing docs...');
          // Your enhancement logic here
        });
    },
    
    // Hook into the docs plugin lifecycle
    async contentLoaded({content, actions}) {
      // Only run if docs plugin has loaded content
      if (content && content.loadedVersions) {
        const {docLayoutComponent, addRoute} = actions;
        
        // Process each doc
        content.loadedVersions.forEach(version => {
          version.docs.forEach(doc => {
            // Add custom processing for each doc
            console.log(`Processing doc: ${doc.id}`);
          });
        });
      }
    },
  };
};
\`\`\`

### Creating a Plugin Wrapper

You can create a plugin that wraps and extends another plugin:

\`\`\`javascript
module.exports = function(context, options) {
  // Get the original plugin
  const originalPlugin = require('@docusaurus/plugin-content-docs')(
    context,
    options
  );
  
  return {
    ...originalPlugin, // Spread the original plugin properties
    name: 'enhanced-docs-plugin',
    
    // Override or extend methods as needed
    async loadContent() {
      // Call the original method
      const content = await originalPlugin.loadContent();
      
      // Enhance the content
      return {
        ...content,
        enhanced: true,
        extraData: 'Some extra data',
      };
    },
  };
};
\`\`\`

## Testing and Debugging Plugins

Proper testing and debugging are essential for plugin development.

### Setting Up a Test Environment

Create a test Docusaurus site to develop and test your plugin:

\`\`\`bash
npx @docusaurus/init@latest init test-site classic
cd test-site
\`\`\`

Link your plugin for development:

\`\`\`bash
# In your plugin directory
npm link

# In your test site directory
npm link your-plugin-name
\`\`\`

### Writing Tests for Your Plugin

Create a `__tests__` directory in your plugin project:

\`\`\`bash
mkdir __tests__
\`\`\`

Create a basic test file:

\`\`\`javascript
// __tests__/index.test.js
const plugin = require('../src/index');

describe('My Plugin', () => {
  test('has correct name', () => {
    const instance = plugin({}, {});
    expect(instance.name).toBe('my-plugin');
  });
  
  test('loadContent returns expected data', async () => {
    const instance = plugin({}, { someOption: 'value' });
    const content = await instance.loadContent();
    expect(content).toEqual(expect.objectContaining({
      // Your expected content structure
    }));
  });
});
\`\`\`

Add Jest to your project:

\`\`\`bash
npm install --save-dev jest
\`\`\`

Update `package.json`:

\`\`\`json
{
  "scripts": {
    "test": "jest"
  }
}
\`\`\`

### Debugging Techniques

1. **Use Verbose Logging**:

\`\`\`javascript
module.exports = function(context, options) {
  const {siteConfig} = context;
  console.log('Plugin options:', options);
  console.log('Site config:', siteConfig);
  
  return {
    // Plugin implementation
  };
};
\`\`\`

2. **Create Debug Endpoints**:

\`\`\`javascript
async contentLoaded({content, actions}) {
  const {createData, addRoute} = actions;
  
  // Create a debug endpoint
  const debugData = await createData(
    'debug-data.json',
    JSON.stringify({
      content,
      options: this.options,
      context: this.context,
    })
  );
  
  addRoute({
    path: '/debug',
    component: '@theme/DebugPage',
    modules: {
      data: debugData,
    },
    exact: true,
  });
}
\`\`\`

3. **Use Node.js Inspector**:

Run Docusaurus with the inspector:

\`\`\`bash
node --inspect node_modules/@docusaurus/core/bin/docusaurus.js start
\`\`\`

Then connect to the inspector using Chrome DevTools.

## Best Practices and Optimization

Follow these best practices to create high-quality, performant plugins:

### Performance Considerations

1. **Minimize Build Time Impact**:
   - Cache expensive operations
   - Only process what's necessary
   - Use incremental builds when possible

2. **Optimize Asset Loading**:
   - Bundle CSS and JS efficiently
   - Lazy-load components when appropriate
   - Minimize client-side JavaScript

3. **Example: Implementing Caching**:

\`\`\`javascript
module.exports = function(context, options) {
  let cache = null;
  
  return {
    name: 'cached-data-plugin',
    
    async loadContent() {
      // Use cached data if available
      if (cache) {
        return cache;
      }
      
      // Expensive operation
      const data = await fetchLargeDataset();
      
      // Cache the result
      cache = data;
      return data;
    },
  };
};
\`\`\`

### Code Quality and Maintainability

1. **Use TypeScript** for better type safety and developer experience
2. **Document Your Plugin** thoroughly with JSDoc comments
3. **Follow Semantic Versioning** for releases
4. **Create Examples** showing how to use your plugin

### Plugin Configuration Best Practices

1. **Provide Sensible Defaults**:

\`\`\`javascript
module.exports = function(context, options) {
  const {
    directory = 'data',
    extensions = ['.json', '.yml'],
    processorFunction = defaultProcessor,
  } = options;
  
  // Plugin implementation
};
\`\`\`

2. **Validate Options**:

\`\`\`javascript
module.exports = function(context, options) {
  const {validate} = require('@docusaurus/utils');
  
  const schema = Joi.object({
    directory: Joi.string().default('data'),
    extensions: Joi.array().items(Joi.string()).default(['.json', '.yml']),
    processorFunction: Joi.function().default(() => defaultProcessor),
  });
  
  const validatedOptions = validate(schema, options);
  
  // Plugin implementation using validatedOptions
};
\`\`\`

## Publishing and Maintaining Plugins

Once your plugin is ready, you can publish it for others to use.

### Preparing for Publication

1. **Update package.json**:

\`\`\`json
{
  "name": "docusaurus-plugin-your-plugin",
  "version": "1.0.0",
  "description": "A Docusaurus plugin that...",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "files": [
    "lib",
    "src"
  ],
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/docusaurus-plugin-your-plugin"
  },
  "keywords": [
    "docusaurus",
    "docusaurus-plugin",
    "documentation",
    "react"
  ],
  "peerDependencies": {
    "@docusaurus/core": "^2.0.0"
  }
}
\`\`\`

2. **Create a README.md**:

\`\`\`markdown
# docusaurus-plugin-your-plugin

A Docusaurus plugin that...

## Installation

\`\`\`bash
npm install --save docusaurus-plugin-your-plugin
\`\`\`

## Usage

\`\`\`javascript
// docusaurus.config.js
module.exports = {
  plugins: [
    ['docusaurus-plugin-your-plugin', {
      // options
    }],
  ],
};
\`\`\`

## Options

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `option1` | `string` | `'default'` | Description of option1 |
| `option2` | `boolean` | `false` | Description of option2 |

## Examples

### Basic Usage

\`\`\`javascript
// docusaurus.config.js
module.exports = {
  plugins: [
    ['docusaurus-plugin-your-plugin', {
      option1: 'value',
      option2: true,
    }],
  ],
};
\`\`\`
\`\`\`

3. **Create a LICENSE file** (e.g., MIT License)

### Publishing to npm

Build your plugin:

\`\`\`bash
npm run build
\`\`\`

Publish to npm:

\`\`\`bash
npm publish
\`\`\`

### Maintaining Your Plugin

1. **Versioning**: Follow semantic versioning (MAJOR.MINOR.PATCH)
2. **Changelog**: Maintain a CHANGELOG.md file
3. **Issue Templates**: Create GitHub issue templates
4. **CI/CD**: Set up continuous integration for testing

Example GitHub workflow for CI:

\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm ci
      - run: npm test
      - run: npm run build
\`\`\`

## Troubleshooting Common Issues

### Plugin Not Loading

**Issue**: Your plugin isn't being loaded by Docusaurus.

**Solutions**:
- Check that your plugin is correctly listed in `docusaurus.config.js`
- Verify that your plugin's `name` property is unique
- Check for errors in the console during startup

### Content Not Generated

**Issue**: Your plugin isn't generating the expected content.

**Solutions**:
- Check that your `loadContent` method is returning the expected data
- Verify that your `contentLoaded` method is correctly using the actions
- Add debug logging to trace the execution flow

### Component Not Found

**Issue**: Docusaurus can't find your theme components.

**Solutions**:
- Ensure your `getThemePath` method returns the correct path
- Check that your component file structure matches Docusaurus expectations
- Verify that your component is correctly exported

### Integration Issues

**Issue**: Your plugin conflicts with other plugins.

**Solutions**:
- Check the plugin execution order in `docusaurus.config.js`
- Ensure your plugin doesn't override critical functionality
- Use the plugin lifecycle methods correctly

## Resources and References

### Official Documentation

- [Docusaurus Plugin Documentation](https://docusaurus.io/docs/api/plugins)
- [Docusaurus Theme API](https://docusaurus.io/docs/api/themes)
- [Docusaurus Lifecycle APIs](https://docusaurus.io/docs/lifecycle-apis)

### Example Plugins

- [docusaurus-plugin-lunr](https://github.com/daldridge/docusaurus-plugin-lunr)
- [docusaurus-plugin-sass](https://github.com/rlamana/docusaurus-plugin-sass)
- [docusaurus-plugin-remote-content](https://github.com/rdilweb/docusaurus-plugin-remote-content)

### Community Resources

- [Docusaurus Discord Channel](https://discord.gg/docusaurus)
- [Docusaurus GitHub Discussions](https://github.com/facebook/docusaurus/discussions)
- [Stack Overflow: Docusaurus Tag](https://stackoverflow.com/questions/tagged/docusaurus)

## Conclusion

Creating custom plugins for Docusaurus allows you to extend its functionality in powerful ways. By understanding the plugin architecture, following best practices, and leveraging the available APIs, you can create plugins that enhance your documentation site and potentially benefit the wider Docusaurus community.

Remember to start simple, test thoroughly, and document your plugin well. As you gain experience, you can create more complex plugins that integrate deeply with Docusaurus and other plugins.

Happy plugin development!
