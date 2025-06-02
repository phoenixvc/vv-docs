// Minimal docusaurus.config.js 
// @ts-check 
const path = require('path'); // Need to add this for path.resolve
import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
 
/** @type {import('@docusaurus/types').Config} */ 
const config = { 
  title: 'Veritas Vault Documentation', 
  tagline: 'Veritas Vault Developer Documentation', 
  favicon: 'img/favicon.ico', 
 
  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com', 
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/', 
 
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  onBrokenLinks: 'warn', // Changed from 'throw' to 'warn'
  onBrokenMarkdownLinks: 'warn', 
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          sidebarPath: './sidebars.js', 
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/', 
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        }, 
        blog: { 
          showReadingTime: true, 
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/', 
        }, 
        theme: { 
          customCss: './src/css/custom.css', 
        }, 
      }), 
    ], 
  ], 
 
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ 
    ({ 
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: { 
        title: 'Veritas Vault', 
        logo: { 
          alt: 'My Site Logo', 
          src: 'img/logo.svg', 
        }, 
        items: [ 
          { 
            type: 'docSidebar', 
            sidebarId: 'tutorialSidebar', 
            position: 'left', 
            label: 'Tutorial', 
          }, 
          {to: '/blog', label: 'Blog', position: 'left'}, 
          { 
            href: 'https://github.com/facebook/docusaurus', 
            label: 'GitHub', 
            position: 'right', 
          }, 
        ], 
      }, 
      footer: { 
        style: 'dark', 
        links: [ 
          { 
            title: 'Docs', 
            items: [ 
              { 
                label: 'Tutorial', 
                to: '/docs/intro', 
              }, 
            ], 
          }, 
          { 
            title: 'Community', 
            items: [ 
              { 
                label: 'Stack Overflow', 
                href: 'https://stackoverflow.com/questions/tagged/docusaurus', 
              }, 
              { 
                label: 'Discord', 
                href: 'https://discordapp.com/invite/docusaurus', 
              }, 
              { 
                label: 'Twitter', 
                href: 'https://twitter.com/docusaurus', 
              }, 
            ], 
          }, 
          { 
            title: 'More', 
            items: [ 
              { 
                label: 'Blog', 
                to: '/blog', 
              }, 
              { 
                label: 'GitHub', 
                href: 'https://github.com/facebook/docusaurus', 
              }, 
            ], 
          }, 
        ], 
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`, 
      }, 
      prism: { 
        theme: prismThemes.github, 
        darkTheme: prismThemes.dracula, 
      }, 
    }), 
  
  plugins: [ 
    async function myPlugin(context, options) { 
      return { 
        name: "webpack-configuration-plugin", 
        configureWebpack(config, isServer, utils) { 
          return { 
            resolve: { 
              alias: { 
                '@site': path.resolve(__dirname, './'), 
                '@': path.resolve(__dirname, './'), 
              }, 
            }, 
          }; 
        }, 
      }; 
    }, 
  ], 
 
  // Add this to register MDX components globally
  markdown: { 
    mdx1Compat: { 
      comments: false, 
      admonitions: false, 
      headingIds: false, 
    }, 
  }, 
}; 

// Add global MDX components here
config.themeConfig.mdx = { 
  components: { 
    // Import all from docs directory for MDX files
    SectionLevel: path.resolve(__dirname, './src/components/docs/SectionLevel'), 
    SectionLevelOne: path.resolve(__dirname, './src/components/docs/SectionLevelOne'), 
    SectionLevelTwo: path.resolve(__dirname, './src/components/docs/SectionLevelTwo'), 
    SectionLevelThree: path.resolve(__dirname, './src/components/docs/SectionLevelThree'), 
    ContentBlock: path.resolve(__dirname, './src/components/docs/ContentBlock'), 
    DiagramBlock: path.resolve(__dirname, './src/components/docs/DiagramBlock'), 
    CodeExampleBlock: path.resolve(__dirname, './src/components/docs/CodeExampleBlock'), 
    TableBlock: path.resolve(__dirname, './src/components/docs/TableBlock'), 
    Highlight: path.resolve(__dirname, './src/components/docs/Highlight'), 
    HeadingTag: path.resolve(__dirname, './src/components/docs/HeadingTag'), 
    Admonition: path.resolve(__dirname, './src/components/docs/Admonition'), 
    BL: path.resolve(__dirname, './src/components/docs/BL'), 
  }, 
}; 

export default config;
