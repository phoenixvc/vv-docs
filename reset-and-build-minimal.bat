@echo off
echo Cleaning up custom theme components and generated files...
rmdir /s /q veritasvault-docs\src\theme
rmdir /s /q veritasvault-docs\.docusaurus

echo Creating absolutely minimal working configuration...

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

echo Creating minimal CSS file without Tailwind...
echo :root { > veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary: #2e8555; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-dark: #29784c; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-darker: #277148; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-darkest: #205d3b; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-light: #33925d; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-lighter: #359962; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-lightest: #3cad6e; >> veritasvault-docs\src\css\custom.css
echo   --ifm-code-font-size: 95%%; >> veritasvault-docs\src\css\custom.css
echo   --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1); >> veritasvault-docs\src\css\custom.css
echo } >> veritasvault-docs\src\css\custom.css
echo. >> veritasvault-docs\src\css\custom.css
echo [data-theme='dark'] { >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary: #25c2a0; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-dark: #21af90; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-darker: #1fa588; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-darkest: #1a8870; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-light: #29d5b0; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-lighter: #32d8b4; >> veritasvault-docs\src\css\custom.css
echo   --ifm-color-primary-lightest: #4fddbf; >> veritasvault-docs\src\css\custom.css
echo   --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3); >> veritasvault-docs\src\css\custom.css
echo } >> veritasvault-docs\src\css\custom.css

echo Removing any references to tailwind.css from theme configuration...
echo if exist veritasvault-docs\src\css\tailwind.css del veritasvault-docs\src\css\tailwind.css

echo Removing PostCSS config since we're not using TailwindCSS anymore...
if exist veritasvault-docs\postcss.config.js del veritasvault-docs\postcss.config.js

echo Attempting to build with absolutely minimal configuration...
cd veritasvault-docs && npx docusaurus build

echo Done!