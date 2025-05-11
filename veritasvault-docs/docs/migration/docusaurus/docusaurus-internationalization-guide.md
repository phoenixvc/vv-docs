# Docusaurus Internationalization Implementation Guide

## Table of Contents

- [Introduction](#introduction)
- [Setting Up Multi-Language Support](#setting-up-multi-language-support)
- [Translation Workflows](#translation-workflows)
- [RTL Language Support](#rtl-language-support)
- [Managing Translated Content](#managing-translated-content)
- [Best Practices](#best-practices)
- [Testing and Validation](#testing-and-validation)
- [Advanced Techniques](#advanced-techniques)
- [Troubleshooting](#troubleshooting)
- [Resources and References](#resources-and-references)

## Introduction

Internationalization (i18n) allows your Docusaurus site to reach a global audience by providing content in multiple languages. This guide will walk you through the process of implementing and managing multi-language support in your Docusaurus documentation.

### Benefits of Internationalization

- **Broader Audience**: Reach users who prefer or require content in their native language
- **Improved Accessibility**: Make your documentation accessible to non-English speakers
- **Global Adoption**: Increase adoption of your product in international markets
- **Community Engagement**: Enable community contributions for translations

### How Docusaurus Handles Internationalization

Docusaurus has built-in support for internationalization through:

1. **Locale-based routing**: URLs prefixed with the locale code (e.g., `/fr/docs/intro`)
2. **Translation files**: JSON files for UI elements and Markdown/MDX files for content
3. **RTL support**: Built-in support for right-to-left languages
4. **Language switcher**: Component to switch between available languages

## Setting Up Multi-Language Support

### Step 1: Configure i18n in docusaurus.config.js

First, add the i18n configuration to your `docusaurus.config.js` file:

\`\`\`javascript
module.exports = {
  // ... other config
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'ja'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
      },
      fr: {
        label: 'Français',
        direction: 'ltr',
        htmlLang: 'fr-FR',
        calendar: 'gregory',
      },
      es: {
        label: 'Español',
        direction: 'ltr',
        htmlLang: 'es-ES',
        calendar: 'gregory',
      },
      ja: {
        label: '日本語',
        direction: 'ltr',
        htmlLang: 'ja-JP',
        calendar: 'japanese',
      },
      ar: {
        label: 'العربية',
        direction: 'rtl',
        htmlLang: 'ar-SA',
        calendar: 'islamic',
      },
    },
  },
  // ... other config
};
\`\`\`

### Step 2: Create Translation Directories

For each locale, create a `i18n/[locale]` directory structure:

\`\`\`bash
mkdir -p i18n/fr/docusaurus-theme-classic
mkdir -p i18n/es/docusaurus-theme-classic
mkdir -p i18n/ja/docusaurus-theme-classic
mkdir -p i18n/ar/docusaurus-theme-classic
\`\`\`

### Step 3: Generate Translation Files

Use the Docusaurus CLI to generate translation files:

\`\`\`bash
# Generate translation files for the French locale
npm run write-translations -- --locale fr

# Generate translation files for other locales
npm run write-translations -- --locale es
npm run write-translations -- --locale ja
npm run write-translations -- --locale ar
\`\`\`

This will create JSON files in the `i18n/[locale]/docusaurus-theme-classic` directories with all the translatable strings from the UI.

### Step 4: Translate UI Strings

Edit the generated JSON files to provide translations for UI elements. For example, in `i18n/fr/docusaurus-theme-classic/navbar.json`:

\`\`\`json
{
  "title": {
    "message": "Mon Site",
    "description": "The title in the navbar"
  },
  "item.label.Docs": {
    "message": "Documentation",
    "description": "Navbar item with label Docs"
  },
  "item.label.Blog": {
    "message": "Blog",
    "description": "Navbar item with label Blog"
  },
  "item.label.GitHub": {
    "message": "GitHub",
    "description": "Navbar item with label GitHub"
  }
}
\`\`\`

### Step 5: Create Translated Content

For documentation content, create translated versions of your Markdown/MDX files:

\`\`\`bash
# Create a directory for translated docs
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current
mkdir -p i18n/es/docusaurus-plugin-content-docs/current
mkdir -p i18n/ja/docusaurus-plugin-content-docs/current
mkdir -p i18n/ar/docusaurus-plugin-content-docs/current

# Copy original docs for translation
cp -r docs/** i18n/fr/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/es/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/ja/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/ar/docusaurus-plugin-content-docs/current
\`\`\`

Then translate the content in these files.

### Step 6: Start the Development Server with Locale

Run the development server with a specific locale:

\`\`\`bash
# Start with French locale
npm run start -- --locale fr

# Or start with all locales
npm run start -- --locale all
\`\`\`

### Step 7: Build for Production

Build your site with all locales:

\`\`\`bash
npm run build
\`\`\`

Or build for specific locales:

\`\`\`bash
npm run build -- --locale fr
npm run build -- --locale fr,es
\`\`\`

## Translation Workflows

Establishing an efficient translation workflow is crucial for maintaining multi-language documentation.

### Manual Translation Workflow

For smaller projects or teams:

1. **Extract translatable content**: Use `write-translations` command
2. **Translate content**: Manually translate JSON and Markdown files
3. **Review translations**: Have native speakers review the translations
4. **Update translations**: Regularly update translations when source content changes

### Collaborative Translation Workflow

For larger projects with multiple contributors:

1. **Set up a translation management system** (TMS) like Crowdin, Transifex, or Lokalise
2. **Integrate with your repository**: Configure the TMS to sync with your repository
3. **Assign translators**: Assign languages to specific translators or teams
4. **Review process**: Implement a review process for quality assurance
5. **Automated sync**: Set up automated synchronization between the TMS and your repository

### Example: Crowdin Integration

1. **Set up a Crowdin project**:
   - Create a project in Crowdin
   - Configure source and target languages

2. **Configure Crowdin integration**:
   - Create a `crowdin.yml` file in your project root:

\`\`\`yaml
project_id: "your-project-id"
api_token_env: CROWDIN_PERSONAL_TOKEN
preserve_hierarchy: true
files:
  # JSON translation files
  - source: /i18n/en/**/*
    translation: /i18n/%two_letters_code%/**/%original_file_name%
    
  # Docs Markdown files
  - source: /docs/**/*
    translation: /i18n/%two_letters_code%/docusaurus-plugin-content-docs/current/**/%original_file_name%
    
  # Blog Markdown files
  - source: /blog/**/*
    translation: /i18n/%two_letters_code%/docusaurus-plugin-content-blog/**/%original_file_name%
\`\`\`

3. **Set up GitHub Actions for automation**:

\`\`\`yaml
name: Crowdin Action

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

jobs:
  synchronize-with-crowdin:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        
      - name: Crowdin Action
        uses: crowdin/github-action@1.4.9
        with:
          upload_sources: true
          upload_translations: true
          download_translations: true
          create_pull_request: true
        env:
          CROWDIN_PROJECT_ID: ${{ secrets.CROWDIN_PROJECT_ID }}
          CROWDIN_PERSONAL_TOKEN: ${{ secrets.CROWDIN_PERSONAL_TOKEN }}
\`\`\`

### Machine Translation Integration

For initial translations or large volumes:

1. **Use translation APIs**: Integrate with Google Translate, DeepL, or other machine translation services
2. **Create a translation script**:

\`\`\`javascript
// scripts/machine-translate.js
const fs = require('fs');
const path = require('path');
const { Translate } = require('@google-cloud/translate').v2;

// Initialize the translator
const translate = new Translate({
  projectId: 'your-project-id',
  keyFilename: './google-translate-key.json',
});

async function translateFile(filePath, targetLanguage) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // For JSON files
  if (filePath.endsWith('.json')) {
    const data = JSON.parse(content);
    const translatedData = await translateJsonFile(data, targetLanguage);
    return JSON.stringify(translatedData, null, 2);
  }
  
  // For Markdown files
  if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
    return await translateMarkdownFile(content, targetLanguage);
  }
  
  return content;
}

// Implementation of translateJsonFile and translateMarkdownFile functions...

// Main function to translate all files
async function translateAllFiles(sourcePath, targetPath, targetLanguage) {
  // Implementation...
}

// Run the translation
translateAllFiles(
  './docs',
  './i18n/fr/docusaurus-plugin-content-docs/current',
  'fr'
);
\`\`\`

3. **Post-edit machine translations**: Always have human reviewers check and correct machine translations

## RTL Language Support

Docusaurus has built-in support for right-to-left (RTL) languages like Arabic, Hebrew, and Persian.

### Step 1: Configure RTL in docusaurus.config.js

Specify the direction in your locale configuration:

\`\`\`javascript
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'he'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      ar: {
        label: 'العربية',
        direction: 'rtl',
      },
      he: {
        label: 'עברית',
        direction: 'rtl',
      },
    },
  },
};
\`\`\`

### Step 2: RTL-Specific Styling

Create RTL-specific styles in your custom CSS:

\`\`\`css
/* src/css/custom.css */

/* Base styles for all directions */
.myComponent {
  margin-left: 1rem;
}

/* RTL-specific styles */
html[dir='rtl'] .myComponent {
  margin-left: 0;
  margin-right: 1rem;
}
\`\`\`

### Step 3: RTL-Aware Components

When creating custom components, make them RTL-aware:

\`\`\`jsx
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function MyComponent() {
  const {i18n: {currentLocale, localeConfigs}} = useDocusaurusContext();
  const isRTL = localeConfigs[currentLocale]?.direction === 'rtl';
  
  return (
    <div style={{
      textAlign: isRTL ? 'right' : 'left',
      paddingLeft: isRTL ? '0' : '1rem',
      paddingRight: isRTL ? '1rem' : '0',
    }}>
      {/* Component content */}
    </div>
  );
}
\`\`\`

### Step 4: RTL-Specific Images and Diagrams

For diagrams or screenshots that need to be mirrored in RTL:

\`\`\`jsx
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function DirectionalImage({ltrSrc, rtlSrc, alt}) {
  const {i18n: {currentLocale, localeConfigs}} = useDocusaurusContext();
  const isRTL = localeConfigs[currentLocale]?.direction === 'rtl';
  
  return (
    <img 
      src={isRTL ? rtlSrc : ltrSrc} 
      alt={alt} 
    />
  );
}
\`\`\`

Usage:

\`\`\`jsx
<DirectionalImage 
  ltrSrc="/img/diagram-ltr.png" 
  rtlSrc="/img/diagram-rtl.png" 
  alt="Workflow diagram" 
/>
\`\`\`

### Step 5: Testing RTL Layout

Always test your RTL layout to ensure proper display:

1. Start your development server with an RTL locale:
   \`\`\`bash
   npm run start -- --locale ar
   \`\`\`

2. Check for common RTL issues:
   - Text alignment
   - Padding and margins
   - Icon and image directions
   - Navigation flow
   - Form elements

## Managing Translated Content

Efficiently managing translated content is crucial for maintaining a multi-language site.

### Content Organization

Organize your translated content following Docusaurus conventions:

\`\`\`
project-root/
├── docs/                   # Original docs (English)
│   ├── intro.md
│   └── advanced/
│       └── feature.md
├── i18n/
│   ├── fr/
│   │   ├── docusaurus-theme-classic/    # UI translations
│   │   │   ├── navbar.json
│   │   │   └── footer.json
│   │   └── docusaurus-plugin-content-docs/
│   │       └── current/                 # Translated docs
│   │           ├── intro.md
│   │           └── advanced/
│   │               └── feature.md
│   └── es/
│       ├── docusaurus-theme-classic/
│       │   ├── navbar.json
│       │   └── footer.json
│       └── docusaurus-plugin-content-docs/
│           └── current/
│               ├── intro.md
│               └── advanced/
│                   └── feature.md
\`\`\`

### Version Management

When versioning your documentation, manage translations for each version:

\`\`\`
i18n/
├── fr/
│   └── docusaurus-plugin-content-docs/
│       ├── current/           # Latest version in French
│       ├── version-1.0.0/     # Version 1.0.0 in French
│       └── version-2.0.0/     # Version 2.0.0 in French
\`\`\`

To create a new versioned translation:

\`\`\`bash
# First, create a new version of the original docs
npm run docusaurus docs:version 2.0.0

# Then, copy the versioned docs for translation
mkdir -p i18n/fr/docusaurus-plugin-content-docs/version-2.0.0
cp -r versioned_docs/version-2.0.0/* i18n/fr/docusaurus-plugin-content-docs/version-2.0.0
\`\`\`

### Translation Status Tracking

Track the status of translations to identify what needs to be updated:

1. **Create a translation status file**:

\`\`\`json
// translation-status.json
{
  "fr": {
    "docs": {
      "intro.md": {
        "lastUpdated": "2023-05-15",
        "status": "complete"
      },
      "advanced/feature.md": {
        "lastUpdated": "2023-04-10",
        "status": "needs-update"
      }
    }
  },
  "es": {
    "docs": {
      "intro.md": {
        "lastUpdated": "2023-05-20",
        "status": "complete"
      },
      "advanced/feature.md": {
        "lastUpdated": "2023-05-01",
        "status": "complete"
      }
    }
  }
}
\`\`\`

2. **Create a script to update the status**:

\`\`\`javascript
// scripts/update-translation-status.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Function to calculate file hash
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('md5').update(content).digest('hex');
}

// Function to update translation status
function updateTranslationStatus() {
  // Implementation...
}

updateTranslationStatus();
\`\`\`

3. **Create a dashboard to visualize translation status**:

\`\`\`jsx
// src/components/TranslationStatus.js
import React from 'react';
import translationStatus from '../../translation-status.json';

export default function TranslationStatus() {
  return (
    <div className="translation-status">
      <h2>Translation Status</h2>
      {Object.entries(translationStatus).map(([locale, data]) => (
        <div key={locale}>
          <h3>{locale}</h3>
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Last Updated</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.docs).map(([doc, info]) => (
                <tr key={doc}>
                  <td>{doc}</td>
                  <td>{info.lastUpdated}</td>
                  <td>{info.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### Partial Translation Strategy

For large documentation sites, consider a partial translation strategy:

1. **Identify core content** that must be translated for all languages
2. **Prioritize languages** based on your user demographics
3. **Create a translation roadmap** with milestones for each language
4. **Implement fallbacks** for untranslated content

Example fallback implementation:

\`\`\`jsx
// src/theme/DocItem.js
import React from 'react';
import {useDoc} from '@docusaurus/theme-common/internal';
import DocItemOriginal from '@theme-original/DocItem';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';

export default function DocItemWrapper(props) {
  const {metadata} = useDoc();
  const {i18n: {currentLocale, defaultLocale}} = useDocusaurusContext();
  
  // Check if we're viewing a non-default locale and the document has a "translation-status" frontmatter
  const isPartiallyTranslated = 
    currentLocale !== defaultLocale && 
    metadata.frontMatter?.['translation-status'] === 'partial';
  
  return (
    <>
      {isPartiallyTranslated && (
        <div className="admonition admonition-warning">
          <div className="admonition-heading">
            <h5>Partial Translation</h5>
          </div>
          <div className="admonition-content">
            <p>
              This document is partially translated. Some sections may still be in English.
              {' '}
              <Link to={metadata.permalink.replace(`/${currentLocale}/`, `/${defaultLocale}/`)}>
                View the original English version
              </Link>.
            </p>
          </div>
        </div>
      )}
      <DocItemOriginal {...props} />
    </>
  );
}
\`\`\`

## Best Practices

Follow these best practices to ensure a successful internationalization implementation:

### Content Writing for Internationalization

1. **Use simple, clear language** in the source content
2. **Avoid idioms and cultural references** that may not translate well
3. **Use consistent terminology** throughout your documentation
4. **Provide context for translators** in comments or descriptions
5. **Use variables for reusable text** instead of hardcoding strings

Example with context for translators:

\`\`\`json
{
  "homepage.tagline": {
    "message": "A powerful documentation framework",
    "description": "The main tagline displayed on the homepage. Keep it short and focused on the product's main benefit."
  }
}
\`\`\`

### Translation Memory and Glossaries

1. **Create a terminology glossary** for consistent translations:

\`\`\`json
// glossary.json
{
  "terms": [
    {
      "term": "plugin",
      "translations": {
        "fr": "extension",
        "es": "complemento",
        "ja": "プラグイン",
        "zh": "插件"
      },
      "definition": "A module that extends Docusaurus functionality"
    },
    {
      "term": "theme",
      "translations": {
        "fr": "thème",
        "es": "tema",
        "ja": "テーマ",
        "zh": "主题"
      },
      "definition": "A set of components that determine the visual appearance"
    }
  ]
}
\`\`\`

2. **Use translation memory** to reuse previous translations
3. **Provide screenshots or context** for UI elements

### Performance Optimization

1. **Lazy-load translations** to improve initial load time:

\`\`\`javascript
// docusaurus.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'ja', 'zh'],
  },
  themeConfig: {
    navbar: {
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
  },
};
\`\`\`

2. **Only build necessary locales** for development:

\`\`\`bash
npm run start -- --locale en,fr
\`\`\`

3. **Use code splitting** for locale-specific components

### Continuous Integration for Translations

1. **Automate translation updates** in your CI pipeline
2. **Run validation checks** on translated content
3. **Generate translation status reports**

Example GitHub Actions workflow:

\`\`\`yaml
name: Translation CI

on:
  push:
    branches: [ main ]
    paths:
      - 'docs/**'
      - 'i18n/**'

jobs:
  validate-translations:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Check for missing translations
        run: node scripts/check-translations.js
        
      - name: Update translation status
        run: node scripts/update-translation-status.js
        
      - name: Commit updated status
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "chore: update translation status"
          file_pattern: translation-status.json
\`\`\`

## Testing and Validation

Thorough testing is essential to ensure your internationalized site works correctly.

### Automated Testing

1. **Create tests for each locale**:

\`\`\`javascript
// tests/i18n.test.js
const puppeteer = require('puppeteer');

describe('Internationalization Tests', () => {
  let browser;
  let page;
  
  beforeAll(async () => {
    browser = await puppeteer.launch();
  });
  
  afterAll(async () => {
    await browser.close();
  });
  
  beforeEach(async () => {
    page = await browser.newPage();
  });
  
  afterEach(async () => {
    await page.close();
  });
  
  const locales = ['en', 'fr', 'es', 'ja'];
  
  locales.forEach(locale => {
    test(`Homepage loads correctly for ${locale}`, async () => {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      await page.goto(`http://localhost:3000${prefix}`);
      
      // Check that the page loaded
      await page.waitForSelector('.navbar');
      
      // Take a screenshot for visual comparison
      await page.screenshot({path: `screenshots/homepage-${locale}.png`});
      
      // Check for specific translated elements
      const title = await page.$eval('title', el => el.textContent);
      expect(title).not.toBe('');
    });
  });
});
\`\`\`

2. **Check for missing translations**:

\`\`\`javascript
// scripts/check-translations.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

function checkMissingTranslations() {
  const locales = ['fr', 'es', 'ja', 'zh'];
  const sourceFiles = glob.sync('docs/**/*.md');
  
  const results = {};
  
  locales.forEach(locale => {
    results[locale] = {
      missing: [],
      total: sourceFiles.length,
    };
    
    sourceFiles.forEach(sourceFile => {
      const relativePath = path.relative('docs', sourceFile);
      const translatedPath = path.join('i18n', locale, 'docusaurus-plugin-content-docs/current', relativePath);
      
      if (!fs.existsSync(translatedPath)) {
        results[locale].missing.push(relativePath);
      }
    });
  });
  
  return results;
}

const results = checkMissingTranslations();
console.log(JSON.stringify(results, null, 2));

// Exit with error if any translations are missing
const hasMissing = Object.values(results).some(result => result.missing.length > 0);
process.exit(hasMissing ? 1 : 0);
\`\`\`

### Manual Testing Checklist

Create a checklist for manual testing:

1. **Navigation**:
   - [ ] Language switcher works correctly
   - [ ] URLs include the correct locale prefix
   - [ ] Navigation between pages preserves the selected language

2. **Content**:
   - [ ] All UI elements are translated
   - [ ] No missing translations in content
   - [ ] Special characters display correctly
   - [ ] Date and number formats are appropriate for the locale

3. **RTL Support** (for RTL languages):
   - [ ] Layout is correctly mirrored
   - [ ] Text alignment is correct
   - [ ] Navigation flows from right to left
   - [ ] Icons and images are properly oriented

4. **Functionality**:
   - [ ] Search works in all languages
   - [ ] Forms and interactive elements work correctly
   - [ ] Error messages are translated

## Advanced Techniques

### Dynamic Language Detection

Automatically detect and redirect users to their preferred language:

\`\`\`jsx
// src/theme/Root.js
import React, {useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation, useHistory} from '@docusaurus/router';

export default function Root({children}) {
  const {i18n: {defaultLocale, locales, currentLocale}} = useDocusaurusContext();
  const location = useLocation();
  const history = useHistory();
  
  useEffect(() => {
    // Only redirect on the homepage to avoid disrupting navigation
    if (location.pathname !== '/' || currentLocale !== defaultLocale) {
      return;
    }
    
    // Get browser language
    const browserLanguage = navigator.language.split('-')[0];
    
    // Check if we support this language
    if (locales.includes(browserLanguage) && browserLanguage !== defaultLocale) {
      // Redirect to the detected language
      history.replace(`/${browserLanguage}${location.pathname}`);
    }
  }, [location, currentLocale, defaultLocale, locales, history]);
  
  return <>{children}</>;
}
\`\`\`

### Custom Language Switcher

Create a more advanced language switcher with region flags:

\`\`\`jsx
// src/theme/NavbarItem/LocaleDropdownNavbarItem.js
import React from 'react';
import {useHistory} from '@docusaurus/router';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import {Dropdown} from '@site/src/components/Dropdown';

const flagEmojis = {
  en: '🇺🇸',
  fr: '🇫🇷',
  es: '🇪🇸',
  ja: '🇯🇵',
  zh: '🇨🇳',
  ar: '🇸🇦',
};

export default function LocaleDropdownNavbarItem() {
  const {
    i18n: {currentLocale, locales, localeConfigs},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const {search, hash} = useLocation();
  const history = useHistory();
  const activeDocContext = useActiveDocContext();
  
  function getLocaleLabel(locale) {
    return localeConfigs[locale].label;
  }
  
  function getLocaleFlagEmoji(locale) {
    return flagEmojis[locale] || '';
  }
  
  const localeItems = locales.map(locale => {
    const to = `pathname://${alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    })}${search}${hash}`;
    
    return {
      value: locale,
      label: (
        <>
          {getLocaleFlagEmoji(locale)} {getLocaleLabel(locale)}
        </>
      ),
      to,
    };
  });
  
  return (
    <Dropdown
      className="locale-dropdown"
      label={
        <>
          {getLocaleFlagEmoji(currentLocale)} {getLocaleLabel(currentLocale)}
        </>
      }
      items={localeItems}
      onChange={newLocale => {
        const newDocId = activeDocContext.activeDoc?.id;
        if (newDocId) {
          // If we're on a doc page, try to find the same doc in the new locale
          try {
            const newDocPath = alternatePageUtils.getDocById(newDocId, newLocale)?.path;
            if (newDocPath) {
              history.push(newDocPath);
              return;
            }
          } catch (e) {
            console.error('Failed to find document in new locale', e);
          }
        }
        
        // Default behavior: navigate to the corresponding page in the new locale
        const newPath = alternatePageUtils.createUrl({
          locale: newLocale,
          fullyQualified: false,
        });
        history.push(newPath);
      }}
    />
  );
}
\`\`\`

### Language-Specific SEO

Optimize SEO for each language:

\`\`\`jsx
// src/theme/DocItem.js
import React from 'react';
import DocItemOriginal from '@theme-original/DocItem';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function DocItemWrapper(props) {
  const {metadata, frontMatter} = useDoc();
  const {
    i18n: {currentLocale, defaultLocale, locales},
  } = useDocusaurusContext();
  
  // Generate alternate links for all locales
  const alternateLinks = locales.map(locale => {
    const url = metadata.permalink.replace(`/${currentLocale}/`, `/${locale}/`);
    return {
      href: url,
      hrefLang: locale,
    };
  });
  
  return (
    <>
      <Head>
        {/* Add hreflang tags for all available translations */}
        {alternateLinks.map(({href, hrefLang}) => (
          <link key={hrefLang} rel="alternate" href={href} hrefLang={hrefLang} />
        ))}
        
        {/* Add canonical link to the default locale version */}
        <link 
          rel="canonical" 
          href={metadata.permalink.replace(`/${currentLocale}/`, `/${defaultLocale}/`)} 
        />
        
        {/* Add language-specific meta tags */}
        <meta property="og:locale" content={currentLocale.replace('-', '_')} />
        {locales
          .filter(locale => locale !== currentLocale)
          .map(locale => (
            <meta 
              key={locale} 
              property="og:locale:alternate" 
              content={locale.replace('-', '_')} 
            />
          ))}
      </Head>
      <DocItemOriginal {...props} />
    </>
  );
}
\`\`\`

### Locale-Specific Content

Display different content based on the current locale:

\`\`\`jsx
// src/components/LocalizedContent.js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function LocalizedContent({
  children,
  locales,
  defaultContent,
}) {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  // If no locale is specified, or current locale is in the list, show the content
  if (!locales || locales.includes(currentLocale)) {
    return <>{children}</>;
  }
  
  // Otherwise, show the default content if provided
  if (defaultContent) {
    return <>{defaultContent}</>;
  }
  
  // If no default content is provided, render nothing
  return null;
}
\`\`\`

Usage:

\`\`\`jsx
<LocalizedContent locales={['en', 'fr']}>
  <p>This content is only visible in English and French.</p>
</LocalizedContent>

<LocalizedContent locales={['ja']} defaultContent={<p>Non-Japanese version</p>}>
  <p>日本語のコンテンツ</p>
</LocalizedContent>
\`\`\`

## Troubleshooting

### Common Issues and Solutions

#### Missing Translations

**Issue**: Some UI elements are not translated.

**Solution**:
1. Run `npm run write-translations -- --locale [locale]` to ensure all translatable strings are extracted
2. Check that the JSON translation files contain entries for all UI elements
3. Verify that the translation files are in the correct location

#### Broken Layouts in RTL

**Issue**: Layout is broken in RTL languages.

**Solution**:
1. Use logical properties instead of directional ones:
   - Use `margin-inline-start` instead of `margin-left`
   - Use `padding-inline-end` instead of `padding-right`
2. Test with RTL languages during development
3. Use the `dir` attribute to create direction-specific styles

#### Version Mismatch

**Issue**: Translated content doesn't match the versioned docs.

**Solution**:
1. Ensure the directory structure in `i18n/[locale]/docusaurus-plugin-content-docs/` matches your versioning
2. After creating a new version, copy the content to the translation directories
3. Update the version dropdown to include all translated versions

#### Search Not Working for Non-English Content

**Issue**: Search doesn't return results for non-English content.

**Solution**:
1. Configure your search plugin to support multiple languages:

\`\`\`javascript
// docusaurus.config.js
module.exports = {
  themeConfig: {
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
      contextualSearch: true,
      searchParameters: {
        facetFilters: ['language:${locale}'],
      },
    },
  },
};
\`\`\`

2. For Algolia DocSearch, ensure your crawler is configured to index all languages

#### Build Errors

**Issue**: Build fails with translation-related errors.

**Solution**:
1. Check for syntax errors in translation files
2. Verify that all required files exist in the translation directories
3. Try building with a specific locale to isolate the issue:
   \`\`\`bash
   npm run build -- --locale fr
   \`\`\`

## Resources and References

### Official Documentation

- [Docusaurus i18n Documentation](https://docusaurus.io/docs/i18n/introduction)
- [Docusaurus i18n Tutorial](https://docusaurus.io/docs/i18n/tutorial)
- [Crowdin Integration Guide](https://docusaurus.io/docs/i18n/crowdin)

### Tools and Services

- [Crowdin](https://crowdin.com/) - Translation management platform
- [Lokalise](https://lokalise.com/) - Translation management system
- [Transifex](https://www.transifex.com/) - Localization platform
- [POEditor](https://poeditor.com/) - Translation management tool
- [DeepL](https://www.deepl.com/) - Machine translation service

### Community Resources

- [Docusaurus Discord Channel](https://discord.gg/docusaurus)
- [Docusaurus GitHub Discussions](https://github.com/facebook/docusaurus/discussions)
- [Stack Overflow: Docusaurus Tag](https://stackoverflow.com/questions/tagged/docusaurus)

### Example Projects

- [Docusaurus i18n Example](https://github.com/facebook/docusaurus/tree/main/examples/i18n)
- [React Native Documentation](https://github.com/facebook/react-native-website)
- [Jest Documentation](https://github.com/facebook/jest/tree/main/website)

## Conclusion

Implementing internationalization in Docusaurus allows you to reach a global audience with your documentation. By following the steps and best practices outlined in this guide, you can create a multilingual documentation site that provides an excellent experience for users around the world.

Remember that internationalization is an ongoing process. As your documentation evolves, you'll need to maintain translations and potentially add support for more languages. With the right workflows and tools in place, you can manage this process efficiently and ensure that your documentation remains accessible to all users, regardless of their preferred language.
