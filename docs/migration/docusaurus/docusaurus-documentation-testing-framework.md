# Docusaurus Documentation Testing Framework

## Table of Contents

- [Introduction](#introduction)
- [Testing Framework Overview](#testing-framework-overview)
- [Link Validation](#link-validation)
- [Accessibility Testing](#accessibility-testing)
- [Content Quality Checks](#content-quality-checks)
- [Automated Testing Setup](#automated-testing-setup)
- [Visual Regression Testing](#visual-regression-testing)
- [Performance Testing](#performance-testing)
- [User Experience Testing](#user-experience-testing)
- [Continuous Integration](#continuous-integration)
- [Reporting and Monitoring](#reporting-and-monitoring)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Resources and References](#resources-and-references)

## Introduction

Documentation quality is critical for user experience and product adoption. This guide provides a comprehensive framework for testing and validating Docusaurus documentation to ensure it meets high standards of accuracy, accessibility, and usability.

### Why Test Documentation?

Documentation testing helps identify and fix issues such as:

- Broken links and references
- Accessibility barriers
- Outdated or inaccurate content
- Inconsistent formatting and style
- Poor performance
- Navigation problems
- Readability issues

### Testing Pyramid for Documentation

Similar to software testing, documentation testing can follow a pyramid approach:

\`\`\`
                    /\
                   /  \
                  /    \
                 / User \
                / Testing \
               /----------\
              /            \
             / Integration  \
            /   Testing     \
           /----------------\
          /                  \
         /    Unit Testing    \
        /                      \
       /--------------------------\
\`\`\`

- **Unit Testing**: Validating individual components like links, images, code blocks
- **Integration Testing**: Testing how documentation sections work together
- **User Testing**: Evaluating the overall user experience and effectiveness

## Testing Framework Overview

A comprehensive documentation testing framework includes:

1. **Automated Tests**:
   - Link validation
   - Markdown syntax checking
   - Frontmatter validation
   - Code block syntax verification
   - Accessibility checks
   - Performance metrics

2. **Manual Tests**:
   - Content accuracy review
   - Readability assessment
   - Navigation flow testing
   - Cross-browser compatibility
   - Mobile responsiveness

3. **User Feedback Mechanisms**:
   - Feedback widgets
   - User surveys
   - Analytics tracking
   - A/B testing

### Setting Up Your Testing Environment

To implement this framework, you'll need:

1. **Development Environment**:
   - Node.js and npm/yarn
   - Docusaurus installation
   - Testing libraries and tools

2. **Testing Configuration**:
   - Test scripts in package.json
   - Configuration files for testing tools
   - CI/CD pipeline configuration

3. **Monitoring Tools**:
   - Analytics integration
   - Error tracking
   - Performance monitoring

Let's explore each component of the framework in detail.

## Link Validation

Broken links create a poor user experience and reduce the credibility of your documentation.

### Manual Link Checking

For small documentation sets, you can manually check links:

1. Click on each link in your documentation
2. Verify that it leads to the correct destination
3. Check for 404 errors or redirects

### Automated Link Checking

For larger documentation sets, use automated tools:

#### Option 1: Using the built-in Docusaurus command

Docusaurus provides a built-in command to check links:

\`\`\`bash
npm run docusaurus check:links
\`\`\`

This checks internal links within your Docusaurus site.

#### Option 2: Using a dedicated link checker

For more comprehensive checking, use a dedicated tool like `broken-link-checker`:

\`\`\`bash
npm install -g broken-link-checker
blc http://localhost:3000 -ro
\`\`\`

#### Option 3: Creating a custom link checker script

For more control, create a custom script:

\`\`\`javascript
// scripts/check-links.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const markdownLinkExtractor = require('markdown-link-extractor');

// Find all markdown files
const markdownFiles = glob.sync('docs/**/*.{md,mdx}');

// Extract and check links
const brokenLinks = [];
let totalLinks = 0;

markdownFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const links = markdownLinkExtractor(content);
  
  totalLinks += links.length;
  
  links.forEach(link => {
    // Skip anchor links and external links for this example
    if (link.startsWith('#') || link.startsWith('http')) {
      return;
    }
    
    // Check if internal link target exists
    const targetPath = path.resolve(path.dirname(file), link);
    if (!fs.existsSync(targetPath)) {
      brokenLinks.push({
        file,
        link,
        targetPath
      });
    }
  });
});

// Report results
console.log(chalk.blue(`Checked ${totalLinks} links in ${markdownFiles.length} files`));

if (brokenLinks.length > 0) {
  console.log(chalk.red(`Found ${brokenLinks.length} broken links:`));
  brokenLinks.forEach(({ file, link, targetPath }) => {
    console.log(chalk.yellow(`  ${file}: ${link} -> ${targetPath}`));
  });
  process.exit(1);
} else {
  console.log(chalk.green('No broken links found!'));
}
\`\`\`

### Checking External Links

External links require special handling:

\`\`\`javascript
// scripts/check-external-links.js
const fetch = require('node-fetch');
const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');
const markdownLinkExtractor = require('markdown-link-extractor');

// Find all markdown files
const markdownFiles = glob.sync('docs/**/*.{md,mdx}');

// Extract external links
const externalLinks = new Set();

markdownFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const links = markdownLinkExtractor(content);
  
  links.forEach(link => {
    if (link.startsWith('http')) {
      externalLinks.add(link);
    }
  });
});

// Check each external link
async function checkLinks() {
  console.log(chalk.blue(`Checking ${externalLinks.size} external links...`));
  
  const brokenLinks = [];
  
  for (const link of externalLinks) {
    try {
      const response = await fetch(link, { method: 'HEAD' });
      if (!response.ok) {
        brokenLinks.push({ link, status: response.status });
      }
    } catch (error) {
      brokenLinks.push({ link, error: error.message });
    }
  }
  
  // Report results
  if (brokenLinks.length > 0) {
    console.log(chalk.red(`Found ${brokenLinks.length} broken external links:`));
    brokenLinks.forEach(({ link, status, error }) => {
      console.log(chalk.yellow(`  ${link}: ${status || error}`));
    });
    process.exit(1);
  } else {
    console.log(chalk.green('All external links are valid!'));
  }
}

checkLinks();
\`\`\`

## Accessibility Testing

Ensuring your documentation is accessible to all users, including those with disabilities, is essential.

### Manual Accessibility Testing

1. **Keyboard Navigation**:
   - Tab through your documentation
   - Ensure all interactive elements are reachable
   - Verify focus indicators are visible

2. **Screen Reader Testing**:
   - Use VoiceOver (macOS), NVDA (Windows), or Orca (Linux)
   - Navigate through your documentation
   - Ensure all content is properly announced

3. **Visual Inspection**:
   - Check color contrast
   - Verify text is resizable
   - Ensure content is readable at different zoom levels

### Automated Accessibility Testing

#### Option 1: Using axe-core

\`\`\`javascript
// scripts/check-a11y.js
const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

async function checkAccessibility() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // URLs to test
  const urls = [
    'http://localhost:3000',
    'http://localhost:3000/docs/intro',
    // Add more pages as needed
  ];
  
  for (const url of urls) {
    await page.goto(url);
    
    // Run axe
    const results = await new AxePuppeteer(page).analyze();
    
    // Output results
    console.log(`Accessibility results for ${url}:`);
    console.log(`  Violations: ${results.violations.length}`);
    console.log(`  Passes: ${results.passes.length}`);
    
    if (results.violations.length > 0) {
      console.log('Violations:');
      results.violations.forEach(violation => {
        console.log(`  ${violation.id}: ${violation.help}`);
        console.log(`  Impact: ${violation.impact}`);
        console.log(`  Nodes affected: ${violation.nodes.length}`);
        console.log('');
      });
    }
  }
  
  await browser.close();
}

checkAccessibility();
\`\`\`

#### Option 2: Using pa11y

\`\`\`bash
npm install -g pa11y
pa11y http://localhost:3000
\`\`\`

#### Option 3: Creating a pa11y-ci configuration

Create a `.pa11yci` file:

\`\`\`json
{
  "defaults": {
    "timeout": 1000,
    "wait": 500,
    "standard": "WCAG2AA"
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/docs/intro",
    "http://localhost:3000/docs/advanced"
  ]
}
\`\`\`

Then run:

\`\`\`bash
npm install -g pa11y-ci
pa11y-ci
\`\`\`

### Accessibility Checklist

Create a checklist for manual review:

\`\`\`markdown
## Accessibility Checklist

### Perceivable
- [ ] All images have alt text
- [ ] Videos have captions
- [ ] Color is not used as the only means of conveying information
- [ ] Text has sufficient contrast with its background
- [ ] Text can be resized up to 200% without loss of content

### Operable
- [ ] All functionality is available via keyboard
- [ ] No content flashes more than 3 times per second
- [ ] Users can navigate and find content easily
- [ ] Focus order is logical and intuitive

### Understandable
- [ ] Text is readable and understandable
- [ ] Content appears and operates in predictable ways
- [ ] Users are helped to avoid and correct mistakes

### Robust
- [ ] Content is compatible with current and future tools
- [ ] Custom components have appropriate ARIA roles
\`\`\`

## Content Quality Checks

Ensuring high-quality content involves checking for accuracy, clarity, and consistency.

### Markdown Linting

Use `markdownlint` to enforce consistent Markdown syntax:

\`\`\`bash
npm install -g markdownlint-cli
markdownlint docs/**/*.md
\`\`\`

Create a `.markdownlint.json` configuration file:

\`\`\`json
{
  "default": true,
  "MD013": false,
  "MD033": false,
  "MD041": false
}
\`\`\`

### Frontmatter Validation

Validate that all documents have the required frontmatter:

\`\`\`javascript
// scripts/validate-frontmatter.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');
const chalk = require('chalk');

// Required frontmatter fields
const requiredFields = ['id', 'title', 'description'];

// Find all markdown files
const markdownFiles = glob.sync('docs/**/*.{md,mdx}');

// Check frontmatter
const invalidFiles = [];

markdownFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const { data: frontmatter } = matter(content);
  
  const missingFields = requiredFields.filter(field => !frontmatter[field]);
  
  if (missingFields.length > 0) {
    invalidFiles.push({
      file,
      missingFields
    });
  }
});

// Report results
if (invalidFiles.length > 0) {
  console.log(chalk.red(`Found ${invalidFiles.length} files with invalid frontmatter:`));
  invalidFiles.forEach(({ file, missingFields }) => {
    console.log(chalk.yellow(`  ${file}: Missing fields: ${missingFields.join(', ')}`));
  });
  process.exit(1);
} else {
  console.log(chalk.green('All files have valid frontmatter!'));
}
\`\`\`

### Style Guide Compliance

Check for style guide compliance using tools like Vale:

1. Install Vale: https://vale.sh/
2. Create a `.vale.ini` configuration file:

\`\`\`ini
StylesPath = styles
MinAlertLevel = suggestion

[*.{md,mdx}]
BasedOnStyles = write-good, proselint
\`\`\`

3. Run Vale:

\`\`\`bash
vale docs/
\`\`\`

### Spelling and Grammar

Check spelling and grammar using tools like `textlint`:

\`\`\`bash
npm install -g textlint textlint-rule-spelling textlint-rule-common-misspellings
\`\`\`

Create a `.textlintrc` file:

\`\`\`json
{
  "rules": {
    "spelling": true,
    "common-misspellings": true
  }
}
\`\`\`

Run textlint:

\`\`\`bash
textlint docs/**/*.md
\`\`\`

### Code Block Validation

Validate code blocks in your documentation:

\`\`\`javascript
// scripts/validate-code-blocks.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

// Find all markdown files
const markdownFiles = glob.sync('docs/**/*.{md,mdx}');

// Regular expression to match code blocks
const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

// Check code blocks
const invalidCodeBlocks = [];

markdownFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const [fullMatch, language, code] = match;
    
    // Skip if no language specified
    if (!language) continue;
    
    // Validate based on language
    try {
      switch (language) {
        case 'javascript':
        case 'js':
          // Simple syntax check
          new Function(code);
          break;
        case 'json':
          JSON.parse(code);
          break;
        // Add more language validators as needed
      }
    } catch (error) {
      invalidCodeBlocks.push({
        file,
        language,
        error: error.message,
        lineNumber: getLineNumber(content, match.index)
      });
    }
  }
});

// Helper to get line number
function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

// Report results
if (invalidCodeBlocks.length > 0) {
  console.log(chalk.red(`Found ${invalidCodeBlocks.length} invalid code blocks:`));
  invalidCodeBlocks.forEach(({ file, language, error, lineNumber }) => {
    console.log(chalk.yellow(`  ${file}:${lineNumber} (${language}): ${error}`));
  });
  process.exit(1);
} else {
  console.log(chalk.green('All code blocks are valid!'));
}
\`\`\`

## Automated Testing Setup

Set up automated testing to run your validation scripts regularly.

### Creating a Test Runner

Create a script to run all your tests:

\`\`\`javascript
// scripts/test-docs.js
const { execSync } = require('child_process');
const chalk = require('chalk');

// List of test scripts to run
const tests = [
  { name: 'Link Validation', command: 'node scripts/check-links.js' },
  { name: 'External Link Validation', command: 'node scripts/check-external-links.js' },
  { name: 'Accessibility', command: 'node scripts/check-a11y.js' },
  { name: 'Frontmatter Validation', command: 'node scripts/validate-frontmatter.js' },
  { name: 'Code Block Validation', command: 'node scripts/validate-code-blocks.js' },
  { name: 'Markdown Linting', command: 'markdownlint docs/**/*.md' },
  { name: 'Spelling and Grammar', command: 'textlint docs/**/*.md' }
];

// Run each test
let failedTests = 0;

tests.forEach(({ name, command }) => {
  console.log(chalk.blue(`Running ${name}...`));
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(chalk.green(`✓ ${name} passed`));
  } catch (error) {
    console.log(chalk.red(`✗ ${name} failed`));
    failedTests++;
  }
  
  console.log(''); // Empty line for separation
});

// Report overall results
if (failedTests > 0) {
  console.log(chalk.red(`${failedTests} tests failed`));
  process.exit(1);
} else {
  console.log(chalk.green('All tests passed!'));
}
\`\`\`

### Setting Up npm Scripts

Add test scripts to your `package.json`:

\`\`\`json
{
  "scripts": {
    "test:links": "node scripts/check-links.js",
    "test:external-links": "node scripts/check-external-links.js",
    "test:a11y": "node scripts/check-a11y.js",
    "test:frontmatter": "node scripts/validate-frontmatter.js",
    "test:code-blocks": "node scripts/validate-code-blocks.js",
    "test:markdown": "markdownlint docs/**/*.md",
    "test:spelling": "textlint docs/**/*.md",
    "test:docs": "node scripts/test-docs.js"
  }
}
\`\`\`

### Pre-commit Hooks

Set up pre-commit hooks using Husky to run tests before committing:

\`\`\`bash
npm install --save-dev husky lint-staged
\`\`\`

Configure Husky in `package.json`:

\`\`\`json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "docs/**/*.{md,mdx}": [
      "markdownlint",
      "node scripts/validate-frontmatter.js",
      "node scripts/check-links.js"
    ]
  }
}
\`\`\`

## Visual Regression Testing

Visual regression testing ensures that your documentation looks consistent across updates.

### Setting Up Visual Regression Tests

Use tools like Percy or BackstopJS:

#### Option 1: Using BackstopJS

\`\`\`bash
npm install -g backstopjs
backstop init
\`\`\`

Configure `backstop.json`:

\`\`\`json
{
  "id": "docs_visual_regression",
  "viewports": [
    {
      "label": "desktop",
      "width": 1280,
      "height": 800
    },
    {
      "label": "tablet",
      "width": 768,
      "height": 1024
    },
    {
      "label": "mobile",
      "width": 320,
      "height": 568
    }
  ],
  "scenarios": [
    {
      "label": "Homepage",
      "url": "http://localhost:3000",
      "delay": 500,
      "requireSameDimensions": true
    },
    {
      "label": "Documentation",
      "url": "http://localhost:3000/docs/intro",
      "delay": 500,
      "requireSameDimensions": true
    }
    // Add more scenarios as needed
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}
\`\`\`

Run BackstopJS:

\`\`\`bash
# Create reference images
backstop reference

# Run tests
backstop test
\`\`\`

#### Option 2: Using Percy

\`\`\`bash
npm install --save-dev @percy/cli
\`\`\`

Create a Percy script:

\`\`\`javascript
// scripts/percy.js
const { percySnapshot } = require('@percy/puppeteer');
const puppeteer = require('puppeteer');

async function runVisualTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({ width: 1280, height: 800 });
  
  // Test homepage
  await page.goto('http://localhost:3000');
  await percySnapshot(page, 'Homepage');
  
  // Test documentation page
  await page.goto('http://localhost:3000/docs/intro');
  await percySnapshot(page, 'Documentation');
  
  // Add more pages as needed
  
  await browser.close();
}

runVisualTests();
\`\`\`

Run Percy:

\`\`\`bash
npx percy exec -- node scripts/percy.js
\`\`\`

## Performance Testing

Performance testing ensures your documentation loads quickly and provides a good user experience.

### Lighthouse Testing

Use Google Lighthouse to test performance:

\`\`\`javascript
// scripts/lighthouse.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { writeFileSync } = require('fs');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };
  
  const runnerResult = await lighthouse(url, options);
  
  // Write report to disk
  const reportHtml = runnerResult.report;
  writeFileSync(`lighthouse-report-${new Date().toISOString()}.html`, reportHtml);
  
  // Log scores
  console.log('Lighthouse scores:');
  console.log(`  Performance: ${runnerResult.lhr.categories.performance.score * 100}`);
  console.log(`  Accessibility: ${runnerResult.lhr.categories.accessibility.score * 100}`);
  console.log(`  Best Practices: ${runnerResult.lhr.categories['best-practices'].score * 100}`);
  console.log(`  SEO: ${runnerResult.lhr.categories.seo.score * 100}`);
  
  await chrome.kill();
}

// Test multiple pages
async function runTests() {
  const urls = [
    'http://localhost:3000',
    'http://localhost:3000/docs/intro',
    // Add more URLs as needed
  ];
  
  for (const url of urls) {
    console.log(`Testing ${url}`);
    await runLighthouse(url);
  }
}

runTests();
\`\`\`

### Load Time Monitoring

Create a script to monitor page load times:

\`\`\`javascript
// scripts/monitor-load-times.js
const puppeteer = require('puppeteer');

async function measureLoadTimes() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Enable performance metrics
  await page.setCacheEnabled(false);
  
  const urls = [
    'http://localhost:3000',
    'http://localhost:3000/docs/intro',
    // Add more URLs as needed
  ];
  
  for (const url of urls) {
    // Navigate to the page
    const response = await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Get performance metrics
    const timing = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
    );
    
    // Calculate load times
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
    const firstPaint = timing.responseEnd - timing.navigationStart;
    
    console.log(`Performance for ${url}:`);
    console.log(`  Load Time: ${loadTime}ms`);
    console.log(`  DOM Content Loaded: ${domContentLoaded}ms`);
    console.log(`  First Paint: ${firstPaint}ms`);
    console.log(`  Status Code: ${response.status()}`);
    console.log('');
  }
  
  await browser.close();
}

measureLoadTimes();
\`\`\`

## User Experience Testing

User experience testing evaluates how real users interact with your documentation.

### User Testing Sessions

Create a structured approach to user testing:

1. **Define Test Scenarios**:
   - Finding specific information
   - Following a tutorial
   - Navigating between sections
   - Using search functionality

2. **Recruit Test Participants**:
   - Target actual users of your product
   - Include users with different experience levels
   - Consider users with accessibility needs

3. **Conduct Testing Sessions**:
   - Use screen and audio recording
   - Ask users to think aloud
   - Observe without interfering
   - Follow up with questions

4. **Analyze Results**:
   - Identify common pain points
   - Look for patterns in user behavior
   - Prioritize issues based on impact

### Feedback Collection

Implement feedback mechanisms in your documentation:

\`\`\`jsx
// src/theme/DocItem/Footer/index.js
import React, { useState } from 'react';
import clsx from 'clsx';
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid';
import styles from './styles.module.css';

function DocFeedback() {
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleFeedback = async (isPositive) => {
    setFeedback(isPositive);
    
    // You can send this feedback to your analytics or API
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: window.location.pathname,
          isPositive,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };
  
  const submitComment = async () => {
    if (!comment.trim()) return;
    
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: window.location.pathname,
          isPositive: feedback,
          comment,
          timestamp: new Date().toISOString(),
        }),
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };
  
  if (submitted) {
    return (
      <div className={styles.feedbackContainer}>
        <p>Thank you for your feedback!</p>
      </div>
    );
  }
  
  return (
    <div className={styles.feedbackContainer}>
      <p>Was this page helpful?</p>
      
      <div className={styles.feedbackButtons}>
        <button
          className={clsx(styles.feedbackButton, feedback === true && styles.selected)}
          onClick={() => handleFeedback(true)}
          aria-label="Yes, this page was helpful"
        >
          <ThumbUpIcon className={styles.icon} />
          <span>Yes</span>
        </button>
        
        <button
          className={clsx(styles.feedbackButton, feedback === false && styles.selected)}
          onClick={() => handleFeedback(false)}
          aria-label="No, this page was not helpful"
        >
          <ThumbDownIcon className={styles.icon} />
          <span>No</span>
        </button>
      </div>
      
      {feedback !== null && (
        <div className={styles.commentContainer}>
          <textarea
            className={styles.commentInput}
            placeholder={feedback ? "What did you like about this page?" : "How can we improve this page?"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
          
          <button
            className={styles.submitButton}
            onClick={submitComment}
            disabled={!comment.trim()}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default function DocItemFooter(props) {
  return (
    <>
      <DocFeedback />
      {/* Original footer content */}
    </>
  );
}
\`\`\`

### Analytics Integration

Integrate analytics to track user behavior:

1. **Google Analytics**:

\`\`\`javascript
// docusaurus.config.js
module.exports = {
  // ... other config
  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
      async: true,
    },
    {
      src: '/js/analytics.js',
    },
  ],
  // ... other config
};
\`\`\`

Create a file at `static/js/analytics.js`:

\`\`\`javascript
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');

// Track documentation usage
document.addEventListener('DOMContentLoaded', function() {
  // Track clicks on links
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'click', {
        'event_category': 'link',
        'event_label': this.href,
      });
    });
  });
  
  // Track code block copying
  document.querySelectorAll('.copyButton').forEach(button => {
    button.addEventListener('click', function() {
      const codeBlock = this.closest('.codeBlockContainer');
      const language = codeBlock.querySelector('.language-tab')?.textContent || 'unknown';
      
      gtag('event', 'copy_code', {
        'event_category': 'engagement',
        'event_label': language,
      });
    });
  });
  
  // Track time spent on page
  let startTime = new Date();
  window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((new Date() - startTime) / 1000);
    gtag('event', 'time_spent', {
      'event_category': 'engagement',
      'event_label': window.location.pathname,
      'value': timeSpent,
    });
  });
});
\`\`\`

2. **Hotjar for Heatmaps and Recordings**:

\`\`\`javascript
// docusaurus.config.js
module.exports = {
  // ... other config
  scripts: [
    // ... other scripts
    {
      src: '/js/hotjar.js',
    },
  ],
  // ... other config
};
\`\`\`

Create a file at `static/js/hotjar.js`:

\`\`\`javascript
(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:XXXXXXX,hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
\`\`\`

## Continuous Integration

Set up continuous integration to automatically test your documentation on every change.

### GitHub Actions

Create a GitHub Actions workflow:

\`\`\`yaml
# .github/workflows/docs-tests.yml
name: Documentation Tests

on:
  push:
    branches: [ main ]
    paths:
      - 'docs/**'
      - 'src/**'
      - 'static/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'docs/**'
      - 'src/**'
      - 'static/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build website
        run: npm run build
        
      - name: Check links
        run: npm run test:links
        
      - name: Validate frontmatter
        run: npm run test:frontmatter
        
      - name: Lint Markdown
        run: npm run test:markdown
        
      - name: Check code blocks
        run: npm run test:code-blocks
        
      - name: Start server for accessibility tests
        run: npm run serve &
        
      - name: Wait for server
        run: sleep 5
        
      - name: Run accessibility tests
        run: npm run test:a11y
        
      - name: Run Lighthouse tests
        run: npm run lighthouse
        
      - name: Upload test reports
        uses: actions/upload-artifact@v2
        with:
          name: test-reports
          path: |
            lighthouse-report-*.html
\`\`\`

### GitLab CI

Create a GitLab CI configuration:

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "16"

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - build/
    expire_in: 1 week

test:links:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run test:links

test:markdown:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run test:markdown

test:frontmatter:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run test:frontmatter

test:code-blocks:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run test:code-blocks

test:a11y:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run serve &
    - sleep 5
    - npm run test:a11y

test:lighthouse:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run serve &
    - sleep 5
    - npm run lighthouse
  artifacts:
    paths:
      - lighthouse-report-*.html
    expire_in: 1 week

pages:
  stage: deploy
  dependencies:
    - build
  script:
    - mkdir -p public
    - cp -r build/* public/
  artifacts:
    paths:
      - public
  only:
    - main
\`\`\`

## Reporting and Monitoring

Set up reporting and monitoring to track documentation quality over time.

### Creating a Documentation Dashboard

Create a dashboard to visualize documentation health:

\`\`\`jsx
// src/components/DocsDashboard.js
import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

function DocsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/docs-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);
  
  if (loading) {
    return (
      <Layout title="Documentation Dashboard">
        <div className={styles.container}>
          <h1>Documentation Dashboard</h1>
          <p>Loading stats...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Documentation Dashboard">
      <div className={styles.container}>
        <h1>Documentation Dashboard</h1>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h2>Content</h2>
            <p><strong>{stats.totalDocs}</strong> documents</p>
            <p><strong>{stats.totalWords}</strong> words</p>
            <p><strong>{stats.avgWordsPerDoc}</strong> avg words per doc</p>
          </div>
          
          <div className={styles.statCard}>
            <h2>Quality</h2>
            <p><strong>{stats.brokenLinks}</strong> broken links</p>
            <p><strong>{stats.a11yIssues}</strong> accessibility issues</p>
            <p><strong>{stats.spellingErrors}</strong> spelling errors</p>
          </div>
          
          <div className={styles.statCard}>
            <h2>Performance</h2>
            <p><strong>{stats.avgLoadTime}</strong>ms avg load time</p>
            <p><strong>{stats.avgLighthouseScore}</strong> avg Lighthouse score</p>
          </div>
          
          <div className={styles.statCard}>
            <h2>Engagement</h2>
            <p><strong>{stats.avgTimeOnPage}</strong>s avg time on page</p>
            <p><strong>{stats.searchQueries}</strong> search queries</p>
            <p><strong>{stats.feedbackRatio}</strong>% positive feedback</p>
          </div>
        </div>
        
        <h2>Recent Issues</h2>
        <table className={styles.issuesTable}>
          <thead>
            <tr>
              <th>Page</th>
              <th>Issue</th>
              <th>Severity</th>
              <th>Detected</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentIssues.map((issue, index) => (
              <tr key={index}>
                <td>{issue.page}</td>
                <td>{issue.description}</td>
                <td>{issue.severity}</td>
                <td>{new Date(issue.detectedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default DocsDashboard;
\`\`\`

### Automated Reports

Generate regular reports on documentation health:

\`\`\`javascript
// scripts/generate-docs-report.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Run tests and collect results
function runTests() {
  const results = {
    timestamp: new Date().toISOString(),
    tests: {}
  };
  
  // Run link check
  try {
    execSync('npm run test:links');
    results.tests.links = { status: 'pass' };
  } catch (error) {
    results.tests.links = { 
      status: 'fail',
      details: error.stdout.toString()
    };
  }
  
  // Run other tests...
  // ...
  
  return results;
}

// Generate stats about the documentation
function generateStats() {
  const markdownFiles = glob.sync('docs/**/*.{md,mdx}');
  
  let totalWords = 0;
  let totalCodeBlocks = 0;
  
  markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Count words (excluding code blocks)
    const textContent = content.replace(/```[\s\S]*?```/g, '');
    const words = textContent.split(/\s+/).filter(Boolean);
    totalWords += words.length;
    
    // Count code blocks
    const codeBlockMatches = content.match(/```[\s\S]*?```/g);
    totalCodeBlocks += codeBlockMatches ? codeBlockMatches.length : 0;
  });
  
  return {
    totalDocs: markdownFiles.length,
    totalWords,
    avgWordsPerDoc: Math.round(totalWords / markdownFiles.length),
    totalCodeBlocks
  };
}

// Generate the report
function generateReport() {
  const testResults = runTests();
  const stats = generateStats();
  
  const report = {
    timestamp: new Date().toISOString(),
    stats,
    testResults
  };
  
  // Write report to file
  const reportPath = path.join('reports', `docs-report-${new Date().toISOString().split('T')[0]}.json`);
  fs.mkdirSync('reports', { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`Report generated at ${reportPath}`);
  
  // Generate HTML report
  const htmlReport = `
<!DOCTYPE html>
<html>
<head>
  <title>Documentation Report - ${new Date().toLocaleDateString()}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    h1 { color: #333; }
    .card { border: 1px solid #ddd; border-radius: 4px; padding: 15px; margin-bottom: 20px; }
    .success { color: green; }
    .failure { color: red; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>Documentation Report - ${new Date().toLocaleDateString()}</h1>
  
  <div class="card">
    <h2>Statistics</h2>
    <p>Total Documents: ${stats.totalDocs}</p>
    <p>Total Words: ${stats.totalWords}</p>
    <p>Average Words per Document: ${stats.avgWordsPerDoc}</p>
    <p>Total Code Blocks: ${stats.totalCodeBlocks}</p>
  </div>
  
  <div class="card">
    <h2>Test Results</h2>
    <table>
      <tr>
        <th>Test</th>
        <th>Status</th>
      </tr>
      ${Object.entries(testResults.tests).map(([test, result]) => `
        <tr>
          <td>${test}</td>
          <td class="${result.status === 'pass' ? 'success' : 'failure'}">${result.status}</td>
        </tr>
      `).join('')}
    </table>
  </div>
</body>
</html>
  `;
  
  const htmlReportPath = path.join('reports', `docs-report-${new Date().toISOString().split('T')[0]}.html`);
  fs.writeFileSync(htmlReportPath, htmlReport);
  
  console.log(`HTML report generated at ${htmlReportPath}`);
}

generateReport();
\`\`\`

### Monitoring Over Time

Track documentation quality metrics over time:

\`\`\`javascript
// scripts/track-metrics.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Load previous metrics if available
function loadPreviousMetrics() {
  const metricsPath = path.join('metrics', 'docs-metrics.json');
  
  if (fs.existsSync(metricsPath)) {
    return JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
  }
  
  return { metrics: [] };
}

// Generate current metrics
function generateCurrentMetrics() {
  const markdownFiles = glob.sync('docs/**/*.{md,mdx}');
  
  // Basic metrics
  let totalWords = 0;
  let totalCodeBlocks = 0;
  let totalImages = 0;
  
  markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Count words
    const textContent = content.replace(/```[\s\S]*?```/g, '');
    const words = textContent.split(/\s+/).filter(Boolean);
    totalWords += words.length;
    
    // Count code blocks
    const codeBlockMatches = content.match(/```[\s\S]*?```/g);
    totalCodeBlocks += codeBlockMatches ? codeBlockMatches.length : 0;
    
    // Count images
    const imageMatches = content.match(/!\[.*?\]$$.*?$$/g);
    totalImages += imageMatches ? imageMatches.length : 0;
  });
  
  return {
    timestamp: new Date().toISOString(),
    totalDocs: markdownFiles.length,
    totalWords,
    avgWordsPerDoc: Math.round(totalWords / markdownFiles.length),
    totalCodeBlocks,
    totalImages
  };
}

// Update metrics file
function updateMetrics() {
  const previousData = loadPreviousMetrics();
  const currentMetrics = generateCurrentMetrics();
  
  previousData.metrics.push(currentMetrics);
  
  // Keep only the last 30 entries
  if (previousData.metrics.length > 30) {
    previousData.metrics = previousData.metrics.slice(-30);
  }
  
  // Write updated metrics
  fs.mkdirSync('metrics', { recursive: true });
  fs.writeFileSync(
    path.join('metrics', 'docs-metrics.json'),
    JSON.stringify(previousData, null, 2)
  );
  
  console.log('Metrics updated');
  
  // Generate trends
  generateTrends(previousData.metrics);
}

// Generate trends from metrics
function generateTrends(metrics) {
  if (metrics.length < 2) {
    console.log('Not enough data to generate trends');
    return;
  }
  
  const latest = metrics[metrics.length - 1];
  const previous = metrics[metrics.length - 2];
  
  const trends = {
    timestamp: new Date().toISOString(),
    totalDocs: {
      current: latest.totalDocs,
      previous: previous.totalDocs,
      change: latest.totalDocs - previous.totalDocs,
      percentChange: ((latest.totalDocs - previous.totalDocs) / previous.totalDocs * 100).toFixed(2)
    },
    totalWords: {
      current: latest.totalWords,
      previous: previous.totalWords,
      change: latest.totalWords - previous.totalWords,
      percentChange: ((latest.totalWords - previous.totalWords) / previous.totalWords * 100).toFixed(2)
    },
    avgWordsPerDoc: {
      current: latest.avgWordsPerDoc,
      previous: previous.avgWordsPerDoc,
      change: latest.avgWordsPerDoc - previous.avgWordsPerDoc,
      percentChange: ((latest.avgWordsPerDoc - previous.avgWordsPerDoc) / previous.avgWordsPerDoc * 100).toFixed(2)
    }
  };
  
  fs.writeFileSync(
    path.join('metrics', 'docs-trends.json'),
    JSON.stringify(trends, null, 2)
  );
  
  console.log('Trends generated');
}

updateMetrics();
\`\`\`

## Best Practices

Follow these best practices to ensure effective documentation testing:

### Automation First

1. **Automate Repetitive Tests**: Automate tests that need to be run frequently
2. **Focus Manual Testing on UX**: Reserve manual testing for user experience evaluation
3. **Continuous Testing**: Run tests automatically on every change

### Test Coverage

1. **Test All Documentation Types**: Test tutorials, reference docs, guides, etc.
2. **Test Navigation Paths**: Ensure users can find information through different paths
3. **Test Search Functionality**: Verify that search returns relevant results

### Incremental Improvement

1. **Start Small**: Begin with basic tests and expand over time
2. **Prioritize Critical Issues**: Focus on fixing high-impact issues first
3. **Track Improvements**: Measure and celebrate improvements in documentation quality

### Documentation for Testing

1. **Document Your Testing Process**: Create guides for your testing procedures
2. **Create Testing Checklists**: Provide checklists for manual testing
3. **Share Test Results**: Make test results available to the documentation team

## Troubleshooting

### Common Testing Issues

#### Tests Taking Too Long

**Issue**: Documentation tests are taking too long to run.

**Solutions**:
1. Run only necessary tests during development
2. Parallelize test execution
3. Use incremental testing that only tests changed files

Example of incremental testing:

\`\`\`javascript
// scripts/incremental-test.js
const { execSync } = require('child_process');
const { changedFiles } = require('@changesets/get-github-info');

async function runIncrementalTests() {
  // Get changed files
  const files = await changedFiles();
  
  // Filter for documentation files
  const docFiles = files.filter(file => 
    file.startsWith('docs/') && 
    (file.endsWith('.md') || file.endsWith('.mdx'))
  );
  
  if (docFiles.length === 0) {
    console.log('No documentation files changed. Skipping tests.');
    return;
  }
  
  console.log(`Testing ${docFiles.length} changed files...`);
  
  // Run tests only on changed files
  docFiles.forEach(file => {
    console.log(`Testing ${file}...`);
    
    try {
      // Run markdown lint
      execSync(`markdownlint ${file}`);
      console.log('  Markdown lint: Passed');
      
      // Run frontmatter validation
      execSync(`node scripts/validate-frontmatter.js ${file}`);
      console.log('  Frontmatter validation: Passed');
      
      // Run link validation
      execSync(`node scripts/check-links.js ${file}`);
      console.log('  Link validation: Passed');
    } catch (error) {
      console.error(`  Error testing ${file}:`, error.message);
    }
  });
}

runIncrementalTests();
\`\`\`

#### False Positives

**Issue**: Tests are reporting issues that aren't actually problems.

**Solutions**:
1. Adjust test sensitivity
2. Add exceptions for specific cases
3. Improve test accuracy

Example of adding exceptions:

\`\`\`javascript
// .markdownlintrc
{
  "default": true,
  "MD013": false,
  "MD033": {
    "allowed_elements": ["details", "summary", "Tabs", "TabItem"]
  },
  "MD041": false
}
\`\`\`

#### Integration with Docusaurus

**Issue**: Tests don't integrate well with Docusaurus.

**Solutions**:
1. Use Docusaurus plugins for testing
2. Leverage Docusaurus APIs
3. Create custom integrations

Example of a Docusaurus plugin for testing:

\`\`\`javascript
// plugins/docusaurus-plugin-test/index.js
module.exports = function(context, options) {
  return {
    name: 'docusaurus-plugin-test',
    
    extendCli(cli) {
      cli
        .command('test:docs')
        .description('Test documentation quality')
        .action(async () => {
          // Implementation of the command
          console.log('Testing documentation...');
          
          // Access Docusaurus context
          const { siteDir, siteConfig } = context;
          
          // Run tests
          // ...
        });
    }
  };
};
\`\`\`

## Resources and References

### Testing Tools

- [markdownlint](https://github.com/DavidAnson/markdownlint): Markdown linting
- [broken-link-checker](https://github.com/stevenvachon/broken-link-checker): Link validation
- [axe-core](https://github.com/dequelabs/axe-core): Accessibility testing
- [lighthouse](https://github.com/GoogleChrome/lighthouse): Performance testing
- [textlint](https://github.com/textlint/textlint): Text linting
- [vale](https://github.com/errata-ai/vale): Style guide enforcement
- [pa11y](https://github.com/pa11y/pa11y): Accessibility testing
- [backstopjs](https://github.com/garris/BackstopJS): Visual regression testing

### Documentation

- [Docusaurus Testing Documentation](https://docusaurus.io/docs/testing)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Google Technical Writing Guide](https://developers.google.com/tech-writing)
- [Write the Docs Testing Guide](https://www.writethedocs.org/guide/tools/testing/)

### Community Resources

- [Write the Docs Community](https://www.writethedocs.org/)
- [Docusaurus Discord](https://discord.gg/docusaurus)
- [Technical Writing Stack Exchange](https://writing.stackexchange.com/)

## Conclusion

A comprehensive testing framework is essential for maintaining high-quality documentation. By implementing automated tests, manual reviews, and user feedback mechanisms, you can ensure your Docusaurus documentation remains accurate, accessible, and user-friendly.

Remember that documentation testing is an ongoing process. As your documentation evolves, your testing framework should evolve with it. Regularly review and update your tests to address new challenges and take advantage of new tools and techniques.

By following the approaches outlined in this guide, you can create a robust testing framework that helps you deliver documentation that truly meets the needs of your users.
