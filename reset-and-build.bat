@echo off
echo Cleaning up custom theme components...
rmdir /s /q veritasvault-docs\src\theme

echo Creating minimal working configuration...

echo // Minimal docusaurus.config.js > veritasvault-docs\docusaurus.config.js
echo // @ts-check >> veritasvault-docs\docusaurus.config.js
echo. >> veritasvault-docs\docusaurus.config.js
echo /** @type {import('@docusaurus/types').Config} */ >> veritasvault-docs\docusaurus.config.js
echo const config = { >> veritasvault-docs\docusaurus.config.js
echo   title: 'VeritasVault', >> veritasvault-docs\docusaurus.config.js
echo   tagline: 'Transparent and reliable data infrastructure', >> veritasvault-docs\docusaurus.config.js
echo   favicon: 'img/favicon.ico', >> veritasvault-docs\docusaurus.config.js
echo. >> veritasvault-docs\docusaurus.config.js
echo   url: 'https://veritasvault.com', >> veritasvault-docs\docusaurus.config.js
echo   baseUrl: '/', >> veritasvault-docs\docusaurus.config.js
echo. >> veritasvault-docs\docusaurus.config.js
echo   organizationName: 'veritasvault', >> veritasvault-docs\docusaurus.config.js
echo   projectName: 'veritasvault-docs', >> veritasvault-docs\docusaurus.config.js
echo. >> veritasvault-docs\docusaurus.config.js
echo   onBrokenLinks: 'warn', >> veritasvault-docs\docusaurus.config.js
echo   onBrokenMarkdownLinks: 'warn', >> veritasvault-docs\docusaurus.config.js
echo. >> veritasvault-docs\docusaurus.config.js
echo   i18n: { >> veritasvault-docs\docusaurus.config.js
echo     defaultLocale: 'en', >> veritasvault-docs\docusaurus.config.js
echo     locales: ['en'], >> veritasvault-docs\docusaurus.config.js
echo   }, >> veritasvault-docs\docusaurus.config.js
echo. >> veritasvault-docs\docusaurus.config.js
echo   presets: [ >> veritasvault-docs\docusaurus.config.js
echo     [ >> veritasvault-docs\docusaurus.config.js
echo       'classic', >> veritasvault-docs\docusaurus.config.js
echo       /** @type {import('@docusaurus/preset-classic').Options} */ >> veritasvault-docs\docusaurus.config.js
echo       ({ >> veritasvault-docs\docusaurus.config.js
echo         docs: { >> veritasvault-docs\docusaurus.config.js
echo           sidebarPath: require.resolve('./sidebars.ts'), >> veritasvault-docs\docusaurus.config.js
echo         }, >> veritasvault-docs\docusaurus.config.js
echo         blog: { >> veritasvault-docs\docusaurus.config.js
echo           showReadingTime: true, >> veritasvault-docs\docusaurus.config.js
echo         }, >> veritasvault-docs\docusaurus.config.js
echo         theme: { >> veritasvault-docs\docusaurus.config.js
echo           customCss: require.resolve('./src/css/custom.css'), >> veritasvault-docs\docusaurus.config.js
echo         }, >> veritasvault-docs\docusaurus.config.js
echo       }), >> veritasvault-docs\docusaurus.config.js
echo     ], >> veritasvault-docs\docusaurus.config.js
echo   ], >> veritasvault-docs\docusaurus.config.js
echo. >> veritasvault-docs\docusaurus.config.js
echo   themeConfig: >> veritasvault-docs\docusaurus.config.js
echo     /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ >> veritasvault-docs\docusaurus.config.js
echo     ({ >> veritasvault-docs\docusaurus.config.js
echo       navbar: { >> veritasvault-docs\docusaurus.config.js
echo         title: 'VeritasVault', >> veritasvault-docs\docusaurus.config.js
echo         items: [ >> veritasvault-docs\docusaurus.config.js
echo           { >> veritasvault-docs\docusaurus.config.js
echo             type: 'docSidebar', >> veritasvault-docs\docusaurus.config.js
echo             sidebarId: 'docsSidebar', >> veritasvault-docs\docusaurus.config.js
echo             position: 'left', >> veritasvault-docs\docusaurus.config.js
echo             label: 'Documentation', >> veritasvault-docs\docusaurus.config.js
echo           }, >> veritasvault-docs\docusaurus.config.js
echo           {to: '/blog', label: 'Blog', position: 'left'}, >> veritasvault-docs\docusaurus.config.js
echo         ], >> veritasvault-docs\docusaurus.config.js
echo       }, >> veritasvault-docs\docusaurus.config.js
echo     }), >> veritasvault-docs\docusaurus.config.js
echo }; >> veritasvault-docs\docusaurus.config.js
echo. >> veritasvault-docs\docusaurus.config.js
echo module.exports = config; >> veritasvault-docs\docusaurus.config.js

echo Creating simple PostCSS configuration...
echo module.exports = { > veritasvault-docs\postcss.config.js
echo   plugins: { >> veritasvault-docs\postcss.config.js
echo     tailwindcss: {}, >> veritasvault-docs\postcss.config.js
echo     autoprefixer: {}, >> veritasvault-docs\postcss.config.js
echo   }, >> veritasvault-docs\postcss.config.js
echo }; >> veritasvault-docs\postcss.config.js

echo Attempting to build with minimal configuration...
cd veritasvault-docs && npx docusaurus build

echo Done!