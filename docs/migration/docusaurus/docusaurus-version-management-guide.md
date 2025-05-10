# Docusaurus Version Management Guide

## Introduction

Version management is a critical aspect of maintaining documentation for evolving software products. Docusaurus provides robust versioning capabilities that allow you to:

- Maintain documentation for multiple versions of your product simultaneously
- Provide users with access to documentation for the specific version they're using
- Preserve historical documentation while continuing to update current documentation
- Create a seamless migration path for users upgrading between versions

This guide explains how to effectively implement and manage versioning in your Docusaurus documentation.

## When to Create a New Version

Consider creating a new documentation version when:

- You release a major version of your product with significant API changes
- You introduce breaking changes that require different documentation
- You completely redesign a feature or workflow
- You need to maintain long-term support for an older version

As a rule of thumb, align documentation versions with your product's semantic versioning (if applicable).

## Version Creation Process

### Prerequisites

Before creating a new version, ensure:

1. Your current documentation (`docs/` directory) accurately reflects the latest state of your product
2. All content is reviewed and approved
3. All links, code examples, and screenshots are up-to-date
4. You've run tests to verify documentation builds correctly

### Creating a Version Snapshot

To create a new version in Docusaurus:

\`\`\`bash
# Navigate to your project root
cd your-docusaurus-project

# Create a new version snapshot
yarn docusaurus docs:version 1.0.0
\`\`\`

This command:
1. Copies your current `docs/` directory to `versioned_docs/version-1.0.0/`
2. Creates a versioned sidebars file at `versioned_sidebars/version-1.0.0-sidebars.json`
3. Adds the new version to `versions.json`

### Version Configuration

After creating a version, update your `docusaurus.config.js` file to configure version display:

\`\`\`js
module.exports = {
  // ... other config
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // ... other docs config
          versions: {
            current: {
              label: 'Next',
              path: 'next',
            },
            '1.0.0': {
              label: '1.0.0',
              path: '1.0.0',
              banner: 'unmaintained',
            },
          },
        },
      },
    ],
  ],
};
\`\`\`

## Managing Multiple Versions

### Version Dropdown

Docusaurus automatically creates a version dropdown in your documentation. Customize its appearance in `docusaurus.config.js`:

\`\`\`js
module.exports = {
  themeConfig: {
    navbar: {
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          dropdownActiveClassDisabled: true,
        },
      ],
    },
  },
};
\`\`\`

### Version Landing Page

Create a custom versions landing page at `src/pages/versions.js` to help users navigate between versions:

\`\`\`jsx
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

function Version() {
  const {siteConfig} = useDocusaurusContext();
  const versions = siteConfig.presets[0][1].docs.versions;
  
  return (
    <Layout title="Versions" description="Multi-chain Architecture Documentation Versions">
      <main className="container margin-vert--lg">
        <h1>Documentation Versions</h1>
        <div className="margin-bottom--lg">
          <p>
            This page lists all available versions of the Multi-chain Architecture documentation.
          </p>
        </div>
        <div className="margin-bottom--lg">
          <h2>Current Version</h2>
          <p>
            The latest documentation for the current development version:
          </p>
          <table>
            <tbody>
              <tr>
                <th>Next</th>
                <td>
                  <Link to="/docs/next">Documentation</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="margin-bottom--lg">
          <h2>Released Versions</h2>
          <p>
            Documentation for all official releases:
          </p>
          <table>
            <tbody>
              {Object.entries(versions)
                .filter(([version]) => version !== 'current')
                .map(([version, versionConfig]) => (
                  <tr key={version}>
                    <th>{versionConfig.label}</th>
                    <td>
                      <Link to={`/docs/${versionConfig.path}`}>Documentation</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}

export default Version;
\`\`\`

## Version Maintenance Best Practices

### Documentation Structure

Maintain a consistent structure across versions to help users navigate between them:

- Keep the same document IDs when possible
- Maintain similar sidebar organization
- Use consistent terminology

### Updating Versioned Documentation

When you need to update a published version (for critical fixes only):

1. Edit files directly in the `versioned_docs/version-X.Y.Z/` directory
2. Avoid major restructuring or content changes
3. Document the changes in a changelog or release notes

### Version Pruning

As your project evolves, consider pruning old versions:

1. Remove outdated versions from `versions.json`
2. Delete corresponding `versioned_docs/version-X.Y.Z/` and `versioned_sidebars/version-X.Y.Z-sidebars.json`
3. Update the versions dropdown configuration

### Version-Specific Content

Use Docusaurus' built-in version detection to display version-specific content:

\`\`\`jsx
import {useDocsVersion} from '@docusaurus/theme-common/internal';

function MyComponent() {
  const {version} = useDocsVersion();
  
  if (version === 'current') {
    return <p>This is only visible in the latest version</p>;
  }
  
  return <p>This is visible in version {version}</p>;
}
\`\`\`

## Migration Considerations

### Guiding Users Between Versions

Help users navigate version changes with:

1. **Migration Guides**: Create dedicated migration guides for major version changes
2. **Version Banners**: Use version banners to indicate deprecated or upcoming versions
3. **Changelogs**: Maintain detailed changelogs highlighting breaking changes

Example version banner configuration:

\`\`\`js
versions: {
  '1.0.0': {
    label: '1.0.0',
    path: '1.0.0',
    banner: 'unmaintained',
    badge: true,
    banner: 'This version is no longer maintained. Please upgrade to the latest version.',
  },
}
\`\`\`

### Redirects for Renamed Documents

If you rename documents between versions, set up redirects to prevent broken links:

\`\`\`js
module.exports = {
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs/1.0.0/old-doc',
            to: '/docs/1.0.0/new-doc',
          },
        ],
      },
    ],
  ],
};
\`\`\`

## Advanced Version Configuration

### Custom Version Paths

Customize version paths for cleaner URLs:

\`\`\`js
versions: {
  current: {
    label: 'Next',
    path: 'next',
  },
  '2.0.0': {
    label: '2.0.0',
    path: '',  // Empty path makes this the default version
  },
  '1.0.0': {
    label: '1.0.0',
    path: '1.0.0',
  },
}
\`\`\`

### Version-Specific Sidebars

Create version-specific sidebar structures by editing the versioned sidebar files directly:

\`\`\`json
// versioned_sidebars/version-1.0.0-sidebars.json
{
  "version-1.0.0/docs": [
    {
      "type": "category",
      "label": "Getting Started",
      "items": [
        "version-1.0.0/introduction",
        "version-1.0.0/installation"
      ]
    }
  ]
}
\`\`\`

## Troubleshooting

### Common Issues

1. **Missing versions in dropdown**: Ensure versions are properly defined in `versions.json`
2. **Broken links between versions**: Use full paths with version prefixes for cross-version links
3. **Build errors after versioning**: Check for duplicate document IDs across versions
4. **Inconsistent navigation**: Verify sidebar configurations match between versions

### Version Cleanup

If you need to remove a version and start over:

1. Delete the corresponding directory in `versioned_docs/`
2. Remove the version from `versions.json`
3. Delete the corresponding sidebar file in `versioned_sidebars/`
4. Rebuild your documentation

## Conclusion

Effective version management is essential for maintaining high-quality documentation across multiple product releases. By following the practices outlined in this guide, you can create a documentation experience that supports users across all versions of your product while maintaining a sustainable workflow for your documentation team.

Remember that versioning should be used judiciously - create new versions only when necessary to avoid maintenance overhead and potential user confusion.
