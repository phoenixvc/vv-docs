#!/bin/bash

# Script to swizzle all required Docusaurus theme components

cd veritasvault-docs

# Core components
npx docusaurus swizzle @docusaurus/theme-classic Root -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic SiteMetadata -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic Loading -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic NotFound -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic Error -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic Layout -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic Admonition -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic CodeBlock -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic Heading -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic MDXPage -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic prism-include-languages -- --typescript --danger

# Doc-related components
npx docusaurus swizzle @docusaurus/theme-classic DocItem -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic DocRoot -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic DocsRoot -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic DocVersionRoot -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic DocTagsListPage -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic DocTagDocListPage -- --typescript --danger

# Blog-related components
npx docusaurus swizzle @docusaurus/theme-classic BlogTagsListPage -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic BlogAuthorsPostsPage -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic BlogTagsPostsPage -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic BlogAuthorsListPage -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic BlogArchivePage -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic BlogListPage -- --typescript --danger
npx docusaurus swizzle @docusaurus/theme-classic BlogPostPage -- --typescript --danger

echo "All components have been swizzled successfully!"