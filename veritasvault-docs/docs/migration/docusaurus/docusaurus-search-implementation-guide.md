# Docusaurus Search Implementation Guide

## Overview

This guide provides comprehensive instructions for implementing and optimizing search functionality in your Docusaurus documentation site. Effective search is critical for documentation usability, allowing users to quickly find relevant information across your content.

## Table of Contents

1. [Search Options in Docusaurus](#search-options-in-docusaurus)
2. [Local Search Implementation](#local-search-implementation)
3. [Algolia DocSearch Implementation](#algolia-docsearch-implementation)
4. [Custom Search Implementation](#custom-search-implementation)
5. [Search Optimization Best Practices](#search-optimization-best-practices)
6. [Troubleshooting Common Issues](#troubleshooting-common-issues)
7. [Advanced Configuration](#advanced-configuration)

## Search Options in Docusaurus

Docusaurus offers several search implementation options:

### 1. Local Search (Built-in)

- **Pros**: No external dependencies, works offline, simple setup
- **Cons**: Limited features, may not scale well for large documentation sites
- **Best for**: Small to medium documentation sites, projects with privacy requirements

### 2. Algolia DocSearch

- **Pros**: Powerful search capabilities, typo tolerance, relevant results ranking
- **Cons**: Requires application to Algolia's program, external dependency
- **Best for**: Medium to large documentation sites with public content

### 3. Custom Search Solutions

- **Pros**: Full customization, integration with existing systems
- **Cons**: Requires more development effort
- **Best for**: Enterprise documentation with specific requirements

## Local Search Implementation

### Step 1: Install the plugin

\`\`\`bash
npm install --save @easyops-cn/docusaurus-search-local
\`\`\`

### Step 2: Configure in docusaurus.config.js

\`\`\`javascript
module.exports = {
  // ... other config
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/',
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
      },
    ],
  ],
};
\`\`\`

### Step 3: Customize styling (optional)

Create a custom CSS file to style the search components:

\`\`\`css
/* src/css/custom.css */
:root {
  --search-local-highlight-color: #5468ff;
  --search-local-background-color: var(--ifm-background-color);
  --search-local-shadow-color: rgba(0, 0, 0, 0.1);
}

.search-result-match {
  background-color: var(--search-local-highlight-color);
  color: white;
  border-radius: 2px;
  padding: 0 2px;
}
\`\`\`

## Algolia DocSearch Implementation

### Step 1: Apply for DocSearch

Visit [Algolia DocSearch](https://docsearch.algolia.com/apply/) and apply for the free DocSearch service.

### Step 2: Install the plugin

\`\`\`bash
npm install --save @docusaurus/theme-search-algolia
\`\`\`

### Step 3: Configure in docusaurus.config.js

\`\`\`javascript
module.exports = {
  // ... other config
  themeConfig: {
    // ... other theme config
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY', // Public API key, not Admin API key
      indexName: 'YOUR_INDEX_NAME',
      contextualSearch: true,
      searchParameters: {
        facetFilters: ['language:en', 'version:current'],
      },
      // Optional: path for search page that enabled by default
      searchPagePath: 'search',
    },
  },
};
\`\`\`

### Step 4: Configure DocSearch crawler (if self-hosting)

Create a `docsearch.json` configuration file:

\`\`\`json
{
  "index_name": "YOUR_INDEX_NAME",
  "start_urls": ["https://your-documentation-site.com/"],
  "sitemap_urls": ["https://your-documentation-site.com/sitemap.xml"],
  "stop_urls": [],
  "selectors": {
    "lvl0": {
      "selector": ".navbar__item.navbar__link--active",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "article h1",
    "lvl2": "article h2",
    "lvl3": "article h3",
    "lvl4": "article h4",
    "lvl5": "article h5, article td:first-child",
    "text": "article p, article li, article td:last-child"
  },
  "strip_chars": " .,;:#",
  "custom_settings": {
    "separatorsToIndex": "_",
    "attributesForFaceting": ["language", "version", "type", "docusaurus_tag"],
    "attributesToRetrieve": [
      "hierarchy",
      "content",
      "anchor",
      "url",
      "url_without_anchor",
      "type"
    ]
  }
}
\`\`\`

## Custom Search Implementation

### Option 1: Integrate with Elasticsearch

#### Step 1: Set up Elasticsearch

Deploy Elasticsearch or use a managed service like Elastic Cloud.

#### Step 2: Create a custom search component

\`\`\`jsx
// src/components/CustomSearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

export default function CustomSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      const response = await axios.post('/api/search', { query });
      setResults(response.data.results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="custom-search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation..."
          className="custom-search-input"
        />
        <button type="submit" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {results.length > 0 && (
        <div className="search-results">
          {results.map((result, index) => (
            <a key={index} href={result.url} className="search-result-item">
              <h3>{result.title}</h3>
              <p>{result.snippet}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
\`\`\`

#### Step 3: Create a search API endpoint

Set up a serverless function or API endpoint to handle search requests.

### Option 2: Use Typesense

Typesense is an open-source, typo-tolerant search engine that's easy to set up.

#### Step 1: Install the plugin

\`\`\`bash
npm install --save docusaurus-theme-search-typesense
\`\`\`

#### Step 2: Configure in docusaurus.config.js

\`\`\`javascript
module.exports = {
  // ... other config
  themes: ['docusaurus-theme-search-typesense'],
  themeConfig: {
    // ... other theme config
    typesense: {
      typesenseCollectionName: 'docusaurus-docs',
      typesenseServerConfig: {
        nodes: [
          {
            host: 'xxx.typesense.net',
            port: 443,
            protocol: 'https',
          },
        ],
        apiKey: 'xyz',
      },
      typesenseSearchParameters: {},
      contextualSearch: true,
    },
  },
};
\`\`\`

## Search Optimization Best Practices

### 1. Content Structure

- Use clear, descriptive headings and subheadings
- Structure content hierarchically (h1 → h2 → h3)
- Include relevant keywords in headings and early paragraphs

### 2. Metadata Enhancement

\`\`\`jsx
// Add frontmatter to your Markdown files
---
title: Implementing Search in Docusaurus
description: A comprehensive guide to setting up and optimizing search functionality in Docusaurus documentation sites
keywords: [docusaurus, search, algolia, typesense, elasticsearch]
---
\`\`\`

### 3. Search Index Optimization

- Exclude unnecessary content (navigation, footers)
- Include code examples when relevant
- Configure proper content weights

### 4. User Experience Considerations

- Implement keyboard navigation (↑/↓ to navigate, Enter to select)
- Add search shortcuts (e.g., '/' to focus search)
- Provide clear visual feedback for search results
- Include search analytics to improve results over time

## Troubleshooting Common Issues

### Algolia DocSearch Issues

1. **No search results appearing**
   - Check API keys and index name
   - Verify crawler has indexed your site
   - Check browser console for errors

2. **Outdated search results**
   - Request a re-crawl of your documentation
   - Check crawler configuration for excluded paths

### Local Search Issues

1. **Search index not building**
   - Check build logs for errors
   - Verify plugin configuration
   - Try clearing cache and rebuilding

2. **Poor search result quality**
   - Adjust content structure
   - Review heading hierarchy
   - Add more descriptive content

## Advanced Configuration

### Custom Result Ranking

\`\`\`javascript
// For Algolia
module.exports = {
  // ... other config
  themeConfig: {
    algolia: {
      // ... other algolia config
      searchParameters: {
        // Boost pages with recent updates
        customRanking: ['desc(lastUpdatedAt)'],
        // Attributes to search in
        attributesToSearchIn: [
          'unordered(title)',
          'unordered(content)',
          'unordered(headings)',
        ],
      },
    },
  },
};
\`\`\`

### Implementing Search Analytics

Track search queries to improve documentation:

\`\`\`javascript
// src/theme/SearchBar/index.js
import React from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';

export default function SearchBar(props) {
  const trackSearch = (query) => {
    // Send to your analytics platform
    if (window.gtag) {
      window.gtag('event', 'search', {
        search_term: query,
      });
    }
  };

  return (
    <>
      <OriginalSearchBar 
        {...props} 
        onSearchQuery={trackSearch}
      />
    </>
  );
}
\`\`\`

### Multi-language Search Support

\`\`\`javascript
module.exports = {
  // ... other config
  themeConfig: {
    algolia: {
      // ... other algolia config
      searchParameters: {
        facetFilters: ['language:${lang}', 'version:${version}'],
      },
    },
  },
};
\`\`\`

## Conclusion

Implementing effective search functionality is crucial for documentation usability. Choose the approach that best fits your project's size, requirements, and resources. Regularly review search analytics to identify gaps in your documentation and improve the search experience over time.

## Additional Resources

- [Official Docusaurus Search Documentation](https://docusaurus.io/docs/search)
- [Algolia DocSearch Documentation](https://docsearch.algolia.com/docs/what-is-docsearch)
- [Typesense Documentation](https://typesense.org/docs/)
- [Elasticsearch Documentation](https://www.elastic.co/guide/index.html)
