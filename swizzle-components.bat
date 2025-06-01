@echo off
REM This script swizzles (customizes) Docusaurus theme components
REM which ensures they're properly available during build

cd veritasvault-docs

REM Swizzle the main theme components
call npx docusaurus swizzle @docusaurus/theme-classic Root --danger
call npx docusaurus swizzle @docusaurus/theme-classic Layout --danger
call npx docusaurus swizzle @docusaurus/theme-classic MDXComponents --danger
call npx docusaurus swizzle @docusaurus/theme-classic NotFound --danger
call npx docusaurus swizzle @docusaurus/theme-classic SiteMetadata --danger
call npx docusaurus swizzle @docusaurus/theme-classic CodeBlock --danger
call npx docusaurus swizzle @docusaurus/theme-classic Heading --danger
call npx docusaurus swizzle @docusaurus/theme-classic Admonition --danger
call npx docusaurus swizzle @docusaurus/theme-classic TOC --danger
call npx docusaurus swizzle @docusaurus/theme-classic TOCInline --danger

REM Swizzle doc-related components
call npx docusaurus swizzle @docusaurus/theme-classic DocItem --danger
call npx docusaurus swizzle @docusaurus/theme-classic DocSidebar --danger
call npx docusaurus swizzle @docusaurus/theme-classic DocPage --danger
call npx docusaurus swizzle @docusaurus/theme-classic DocVersionBanner --danger
call npx docusaurus swizzle @docusaurus/theme-classic DocTagsListPage --danger
call npx docusaurus swizzle @docusaurus/theme-classic DocTagDocListPage --danger

REM Swizzle blog-related components
call npx docusaurus swizzle @docusaurus/theme-classic BlogPostItem --danger
call npx docusaurus swizzle @docusaurus/theme-classic BlogPostPage --danger
call npx docusaurus swizzle @docusaurus/theme-classic BlogListPage --danger
call npx docusaurus swizzle @docusaurus/theme-classic BlogSidebar --danger
call npx docusaurus swizzle @docusaurus/theme-classic BlogTagsListPage --danger
call npx docusaurus swizzle @docusaurus/theme-classic BlogTagsPostsPage --danger
call npx docusaurus swizzle @docusaurus/theme-classic BlogArchivePage --danger

REM Create empty Error and Loading components
mkdir src\theme\Error
echo import React from 'react'; > src\theme\Error\index.js
echo export default function Error({error, tryAgain}) { >> src\theme\Error\index.js
echo   return ( >> src\theme\Error\index.js
echo     ^<div^> >> src\theme\Error\index.js
echo       ^<p^>Something went wrong!^</p^> >> src\theme\Error\index.js
echo       ^<button onClick={tryAgain}^>Try Again^</button^> >> src\theme\Error\index.js
echo       ^<p^>{error.message}^</p^> >> src\theme\Error\index.js
echo     ^</div^> >> src\theme\Error\index.js
echo   ); >> src\theme\Error\index.js
echo } >> src\theme\Error\index.js

mkdir src\theme\Loading
echo import React from 'react'; > src\theme\Loading\index.js
echo export default function Loading() { >> src\theme\Loading\index.js
echo   return ^<div^>Loading...^</div^>; >> src\theme\Loading\index.js
echo } >> src\theme\Loading\index.js

REM Create prism-include-languages
mkdir -p src\theme
echo /** > src\theme\prism-include-languages.js
echo  * This file is used to configure additional Prism syntax highlighting languages >> src\theme\prism-include-languages.js
echo  */ >> src\theme\prism-include-languages.js
echo const prismIncludeLanguages = (PrismObject) =^> { >> src\theme\prism-include-languages.js
echo   globalThis.Prism = PrismObject; >> src\theme\prism-include-languages.js
echo   require('prismjs/components/prism-bash'); >> src\theme\prism-include-languages.js
echo   require('prismjs/components/prism-json'); >> src\theme\prism-include-languages.js
echo   require('prismjs/components/prism-yaml'); >> src\theme\prism-include-languages.js
echo   delete globalThis.Prism; >> src\theme\prism-include-languages.js
echo }; >> src\theme\prism-include-languages.js
echo export default prismIncludeLanguages; >> src\theme\prism-include-languages.js

echo ✅ All components swizzled successfully