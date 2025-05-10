# Static Assets Directory

This directory contains static assets for the Docusaurus site, including:

- Images
- Diagrams
- PDFs
- Other static files

## Directory Structure

- `/diagrams/` - Architecture and flow diagrams
- `/images/` - General images used throughout the documentation
- `/pdf/` - PDF versions of documentation
- `/icons/` - Icon assets

## Usage in Markdown/MDX

To reference these assets in your MDX files, use the `@site` alias:

\`\`\`md
![Example Image](@site/static/images/example.png)
\`\`\`

## Usage in React Components

In React components, reference static assets with a leading slash:

\`\`\`jsx
<img src="/images/example.png" alt="Example" />
