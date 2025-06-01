// Minimal docusaurus.config.js 
// @ts-check 
 
/** @type {import('@docusaurus/types').Config} */ 
const config = { 
  title: 'VeritasVault', 
  tagline: 'Transparent and reliable data infrastructure', 
  favicon: 'img/favicon.ico', 
 
  url: 'https://veritasvault.com', 
  baseUrl: '/', 
 
  organizationName: 'veritasvault', 
  projectName: 'veritasvault-docs', 
 
  onBrokenLinks: 'warn', 
  onBrokenMarkdownLinks: 'warn', 
 
  i18n: { 
    defaultLocale: 'en', 
    locales: ['en'], 
  }, 
 
  presets: [ 
    [ 
      'classic', 
      /** @type {import('@docusaurus/preset-classic').Options} */ 
      ({ 
        docs: { 
          sidebarPath: require.resolve('./sidebars.ts'), 
        }, 
        blog: { 
          showReadingTime: true, 
        }, 
        theme: { 
          customCss: require.resolve('./src/css/custom.css'), 
        }, 
      }), 
    ], 
  ], 
 
  themeConfig: 
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ 
    ({ 
      navbar: { 
        title: 'VeritasVault', 
        items: [ 
          { 
            type: 'docSidebar', 
            sidebarId: 'docsSidebar', 
            position: 'left', 
            label: 'Documentation', 
          }, 
          {to: '/blog', label: 'Blog', position: 'left'}, 
        ], 
      }, 
    }), 
}; 
 
module.exports = config; 
