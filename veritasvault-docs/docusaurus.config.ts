// docusaurus.config.js
module.exports = {
  title: 'VeritasVault Docs',
  tagline: 'Documentation for the VeritasVault platform',
  url: 'https://your-docusaurus-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'VeritasVault',
  projectName: 'veritasvault-docs',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/VeritasVault/veritasvault-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/VeritasVault/veritasvault-docs/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'VeritasVault',
      logo: {
        alt: 'VeritasVault Logo',
        src: 'img/veritas-vault-logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/VeritasVault/veritasvault-docs',
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
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/veritasvault',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/veritasvault',
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
              href: 'https://github.com/VeritasVault/veritasvault-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} VeritasVault, Inc. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
    },
    // These colors match your brand assets
    primaryColor: '#4a90e2', // Light blue accent
    secondaryColor: '#f5a623', // Gold/amber
    customCss: [require.resolve('./src/css/custom.css')],
  },
};
