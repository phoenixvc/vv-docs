# Docusaurus Deployment Guide

This guide provides comprehensive instructions for deploying your Docusaurus site to various platforms, configuring environments, optimizing performance, and setting up custom domains.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Platform-Specific Deployment](#platform-specific-deployment)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [AWS Amplify](#aws-amplify)
- [Environment Configuration](#environment-configuration)
- [Performance Optimization](#performance-optimization)
- [Custom Domain Setup](#custom-domain-setup)
- [Continuous Deployment](#continuous-deployment)
- [Post-Deployment Validation](#post-deployment-validation)
- [Troubleshooting](#troubleshooting)
- [Conclusion](#conclusion)
- [Additional Resources](#additional-resources)

## Pre-Deployment Checklist

Before deploying your Docusaurus site, ensure you've completed these steps:

1. **Build Verification**
   - Run `npm run build` locally to verify the build process works
   - Check the `build` directory for expected output
   - Test the production build locally with `npm run serve`

2. **Configuration Check**
   - Verify `docusaurus.config.js` settings:
     - Correct `url` and `baseUrl`
     - Proper `organizationName` and `projectName` (for GitHub Pages)
     - Valid plugin configurations

3. **Content Validation**
   - Run link checker to find broken internal links
   - Verify all images and assets are loading correctly
   - Check for any hardcoded URLs that should be relative

4. **Performance Audit**
   - Run Lighthouse or PageSpeed Insights on your local build
   - Optimize large images
   - Implement lazy loading for heavy components

5. **SEO Preparation**
   - Verify meta tags in `docusaurus.config.js`
   - Prepare `robots.txt` in the `static` directory
   - Create a sitemap configuration

## Platform-Specific Deployment

### Vercel

Vercel provides a seamless deployment experience for Docusaurus sites.

#### Step 1: Prepare Your Project

Ensure your `package.json` has the correct build script:

\`\`\`json
{
  "scripts": {
    "build": "docusaurus build"
  }
}
\`\`\`

Create a `vercel.json` configuration file in your project root:

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "docusaurus",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "status": 404, "dest": "/404.html" }
  ]
}
\`\`\`

#### Step 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. Log in to Vercel:
   \`\`\`bash
   vercel login
   \`\`\`

3. Deploy your site:
   \`\`\`bash
   vercel
   \`\`\`

4. For production deployment:
   \`\`\`bash
   vercel --prod
   \`\`\`

#### Step 3: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Log in to [Vercel](https://vercel.com)
3. Click **New Project**
4. Import your repository
5. Configure project settings:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Click **Deploy**

### Netlify

Netlify is another excellent platform for Docusaurus deployment.

#### Step 1: Prepare Your Project

Create a `netlify.toml` file in your project root:

\`\`\`toml
[build]
  command = "npm run build"
  publish = "build"

[context.production]
  environment = { NODE_VERSION = "16" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
  conditions = {Role = ["admin"]}

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
\`\`\`

#### Step 2: Deploy via Netlify UI

1. Sign up or log in to [Netlify](https://netlify.com)
2. Click **New site from Git**
3. Select your Git provider (GitHub, GitLab, BitBucket)
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click **Deploy site**

#### Step 3: Netlify CLI Deployment (Alternative)

1. Install Netlify CLI:
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`
2. Log in to Netlify:
   \`\`\`bash
   netlify login
   \`\`\`
3. Initialize your project:
   \`\`\`bash
   netlify init
   \`\`\`
4. Deploy your site:
   \`\`\`bash
   netlify deploy --prod
   \`\`\`

### GitHub Pages

GitHub Pages is a free hosting option that works well with Docusaurus.

#### Step 1: Configure docusaurus.config.js

Modify your `docusaurus.config.js` for GitHub Pages:

\`\`\`js
module.exports = {
  title: 'Your Site Title',
  url: 'https://username.github.io', // Replace with your GitHub username
  baseUrl: '/repository-name/', // Replace with your repository name
  organizationName: 'username', // GitHub username
  projectName: 'repository-name', // GitHub repository name
  deploymentBranch: 'gh-pages', // The branch to deploy to
  trailingSlash: false,
  // ... other configuration
};
\`\`\`

#### Step 2: Create a Deployment Script

For manual deployment, add this to your `package.json`:

\`\`\`json
{
  "scripts": {
    "deploy": "GIT_USER=<GITHUB_USERNAME> docusaurus deploy"
  }
}
\`\`\`

#### Step 3: Deploy to GitHub Pages

**Automated Deployment with GitHub Actions:**

Create a file at `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
\`\`\`

**Manual Deployment:**

Run the deploy script:

\`\`\`bash
USE_SSH=true npm run deploy
\`\`\`

or

\`\`\`bash
GIT_USER=<GITHUB_USERNAME> npm run deploy
\`\`\`

#### Step 4: Configure GitHub Repository

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Set the source to the `gh-pages` branch
4. Click **Save**

### AWS Amplify

AWS Amplify provides a powerful platform for Docusaurus deployment with AWS integration.

#### Step 1: Install and Configure the Amplify CLI

\`\`\`bash
npm install -g @aws-amplify/cli
amplify configure
\`\`\`

#### Step 2: Initialize Amplify in Your Project

\`\`\`bash
amplify init
\`\`\`

#### Step 3: Add Hosting

\`\`\`bash
amplify add hosting
\`\`\`

Choose "Hosting with Amplify Console" and "Manual deployment".

#### Step 4: Deploy

\`\`\`bash
amplify publish
\`\`\`

#### Amplify Console Deployment (Alternative)

1. Log in to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
2. Click **Connect app**
3. Select your Git provider
4. Select your repository and branch
5. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `build`
6. Click **Save and deploy**

## Environment Configuration

### Managing Environment Variables

Different platforms handle environment variables differently. Here's how to set them up:

#### Local Development

Create a `.env` file in your project root:

\`\`\`
SITE_URL=https://example.com
ALGOLIA_API_KEY=your_algolia_api_key
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
\`\`\`

Use the `dotenv` package to load these variables in your configuration files.

#### Production Deployment

Set environment variables in your deployment platform:

**Vercel:**
- Navigate to **Project Settings** → **Environment Variables**
- Add key-value pairs

**Netlify:**
- Navigate to **Site Settings** → **Build & deploy** → **Environment**
- Add key-value pairs

**GitHub Actions:**
Add to your workflow file:

\`\`\`yaml
env:
  SITE_URL: https://example.com
  ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
\`\`\`

### Accessing Environment Variables in Docusaurus

In `docusaurus.config.js`:

\`\`\`js
module.exports = {
  // ...
  customFields: {
    siteUrl: process.env.SITE_URL || 'https://default-site.com',
    gaTrackingId: process.env.GOOGLE_ANALYTICS_ID,
  },
  // ...
};
\`\`\`

## Performance Optimization

### Build-Time Optimizations

1. **Optimize Images**

   Use tools like `imagemin` to compress images. Add to your build process:

   \`\`\`bash
   npm install --save-dev imagemin-cli
   \`\`\`

   Add to `package.json`:

   \`\`\`json
   {
     "scripts": {
       "optimize-images": "imagemin static/img/* --out-dir static/img",
       "prebuild": "npm run optimize-images"
     }
   }
   \`\`\`

2. **Code Splitting**

   Docusaurus handles code splitting automatically, but ensure you're using dynamic imports for large components:

   \`\`\`jsx
   const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
   \`\`\`

3. **Prefetching**

   Add prefetch hints for important pages in your `docusaurus.config.js`:

   \`\`\`js
   module.exports = {
     scripts: [
       {
         src: '/prefetch.js',
         async: true,
       },
     ],
   };
   \`\`\`

   Create a `static/prefetch.js` file:

   \`\`\`js
   document.addEventListener('DOMContentLoaded', function() {
     const links = ['docs/intro', 'docs/advanced'];
     links.forEach(href => {
       const link = document.createElement('link');
       link.rel = 'prefetch';
       link.href = href;
       document.head.appendChild(link);
     });
   });
   \`\`\`

### Runtime Optimizations

1. **Enable Caching**

   For Vercel and Netlify, create a `_headers` file in your `static` directory:

   \`\`\`
   /*
     Cache-Control: public, max-age=0, must-revalidate

   /*.html
     Cache-Control: public, max-age=0, must-revalidate

   /assets/*
     Cache-Control: public, max-age=31536000, immutable

   /*.js
     Cache-Control: public, max-age=31536000, immutable

   /*.css
     Cache-Control: public, max-age=31536000, immutable
   \`\`\`

2. **Optimize Font Loading**

   Configure font loading in `docusaurus.config.js`:

   \`\`\`js
   module.exports = {
     stylesheets: [
       {
         href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
         type: 'text/css',
         crossorigin: 'anonymous',
         preconnect: true,
       },
     ],
   };
   \`\`\`

3. **Lazy Load Images**

   Use the `lozad` library for lazy loading images:

   \`\`\`bash
   npm install --save lozad
   \`\`\`

   Create a custom component for lazy-loaded images.

## Custom Domain Setup

### Vercel Custom Domain

1. Navigate to **Project Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain name
4. Follow the DNS configuration instructions

For subdomains:
- Add a `CNAME` record pointing to `cname.vercel-dns.com`

For apex domains:
- Add an `A` record pointing to Vercel's IP addresses

### Netlify Custom Domain

1. Navigate to **Site Settings** → **Domain Management** → **Custom domains**
2. Click **Add custom domain**
3. Enter your domain and click **Verify**
4. Choose between Netlify DNS or your own DNS provider
5. Follow the DNS configuration instructions

Netlify provides automatic HTTPS with Let's Encrypt.

### GitHub Pages Custom Domain

1. Add a file named `CNAME` to your `static` directory containing your domain:
   \`\`\`
   docs.example.com
   \`\`\`

2. Configure your DNS:
   - For a subdomain: Add a `CNAME` record pointing to `username.github.io`
   - For an apex domain: Add `A` records pointing to GitHub's IP addresses

3. In your GitHub repository, go to **Settings** → **Pages** → **Custom domain**
4. Enter your domain and click **Save**
5. Check **Enforce HTTPS** if available

### Domain Verification and SSL

Always verify SSL configuration after setting up a custom domain:

1. Visit [SSL Checker](https://www.sslshopper.com/ssl-checker.html) to verify your SSL certificate
2. Ensure your certificate covers both `example.com` and `www.example.com`
3. Implement proper redirects (www to non-www or vice versa)
4. Add security headers to your deployment configuration

## Continuous Deployment

### Setting Up CI/CD Workflows

#### GitHub Actions

Create a `.github/workflows/deploy.yml` file:

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: npm

      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

#### GitLab CI/CD

Create a `.gitlab-ci.yml` file:

\`\`\`yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:16
  script:
    - npm ci
    - npm test

build:
  stage: build
  image: node:16
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - build/

deploy:
  stage: deploy
  image: node:16
  script:
    - npm install -g netlify-cli
    - netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --prod
  only:
    - main
\`\`\`

### Preview Deployments

For pull request previews:

**Vercel:**
- Automatically created for each pull request
- Access from the GitHub PR checks

**Netlify:**
- Enable **Build previews** in site settings
- Access from the GitHub PR checks

**GitHub Actions:**
Create a separate workflow for pull requests that deploys to a staging environment.

## Post-Deployment Validation

After deploying, verify your site is working correctly:

1. **Functionality Check**
   - Navigate through main sections
   - Test search functionality
   - Verify links to various pages

2. **Performance Testing**
   - Run [Lighthouse](https://developers.google.com/web/tools/lighthouse) check
   - Test page load times from different regions
   - Verify mobile performance

3. **SEO Verification**
   - Check meta tags are correctly rendered
   - Verify canonical URLs
   - Test sitemap accessibility
   - Check robots.txt configuration

4. **Accessibility Testing**
   - Run accessibility checkers like [WAVE](https://wave.webaim.org/)
   - Test keyboard navigation
   - Verify screen reader compatibility

## Troubleshooting

### Common Deployment Issues

#### Build Failures

**Issue**: Build fails during deployment

**Solution**:
1. Check for Node.js version compatibility
2. Verify all dependencies are correctly installed
3. Look for syntax errors in your code
4. Check for import references to non-existent files

#### 404 Errors

**Issue**: Deployed site shows 404 for valid pages

**Solution**:
1. Verify `baseUrl` in `docusaurus.config.js`
2. Check the build output directory configuration
3. Verify routing configuration in your deployment platform
4. Ensure redirects are correctly configured

#### Static Assets Not Loading

**Issue**: Images, CSS, or JavaScript files are missing

**Solution**:
1. Check for correct relative paths
2. Verify the assets are being included in the build
3. Check for case-sensitivity issues in filenames
4. Verify CORS configuration if assets are on different domains

#### Environment Variable Issues

**Issue**: Environment variables not available during build

**Solution**:
1. Verify environment variables are correctly set in your deployment platform
2. Check for scoping issues (build-time vs. runtime variables)
3. Ensure you're accessing variables correctly in your code
4. Use fallback values for optional variables

### Platform-Specific Troubleshooting

#### Vercel

- **Issue**: Incorrect build output
  - Check your Vercel project settings for the correct output directory
  - Verify your `vercel.json` configuration

- **Issue**: Environment variables not working
  - Ensure variables are added to both preview and production environments
  - Use the Vercel CLI to debug: `vercel env ls`

#### Netlify

- **Issue**: Build timeouts
  - Optimize your build process
  - Consider using Netlify cache plugins
  - Increase build minutes in your Netlify plan

- **Issue**: Redirect issues
  - Check your `netlify.toml` or `_redirects` file
  - Verify redirects syntax and order (they're processed in sequence)

#### GitHub Pages

- **Issue**: Custom domain not working
  - Verify your `CNAME` file is in the correct location
  - Check DNS propagation using `dig` or `nslookup`
  - Ensure GitHub Pages is enabled on the correct branch

- **Issue**: Styles or scripts not loading
  - Check that the `baseUrl` in your configuration matches your repository name
  - Verify asset references use the correct paths

## Conclusion

Deploying your Docusaurus site requires careful configuration, but the process becomes straightforward once you understand the platform-specific requirements. By following this guide, you can ensure your documentation site is deployed correctly, optimized for performance, and properly configured for your domain.

Remember to regularly test your deployment process and keep your configurations up to date as Docusaurus and your chosen deployment platforms evolve.

## Additional Resources

- [Official Docusaurus Deployment Documentation](https://docusaurus.io/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
