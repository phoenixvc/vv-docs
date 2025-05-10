// docusaurus.config.js
import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";

const config: Config = {
  title: "VeritasVault Documentation",
  tagline: "Comprehensive documentation for the VeritasVault platform",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-site.com",
  baseUrl: "/",
  
  // GitHub pages deployment config
  organizationName: "VeritasVault",
  projectName: "veritasvault-docs",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/VeritasVault/veritasvault-docs/edit/main/",
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/VeritasVault/veritasvault-docs/edit/main/blog/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "VeritasVault",
      logo: {
        alt: "VeritasVault Logo",
        src: "img/veritas-vault-logo.png",
      },
      items: [
        // Main documentation
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Docs",
        },
        // Whitepaper dropdown
        {
          type: "dropdown",
          label: "Whitepaper",
          position: "left",
          items: [
            {
              to: "/docs/whitepaper/overview",
              label: "Overview",
            },
            {
              to: "/docs/architecture",
              label: "Architecture",
            },
            {
              to: "/docs/tokenomics",
              label: "Tokenomics",
            },
            {
              to: "/docs/security",
              label: "Security",
            },
            {
              to: "/docs/finance-models",
              label: "Finance Models",
            },
            {
              to: "/docs/integrations",
              label: "Integrations",
            },
          ],
        },
        // Other main sections
        {
          to: "/docs/architecture",
          label: "Architecture",
          position: "left",
        },
        {
          to: "/docs/chain-services",
          label: "Chain Services",
          position: "left",
        },
        // Blog
        { 
          to: "/blog", 
          label: "Blog", 
          position: "left" 
        },
        // Version control
        {
          to: "/docs/versions",
          label: "Versions",
          position: "right",
        },
        // GitHub link
        {
          href: "https://github.com/VeritasVault/veritasvault-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Introduction",
              to: "/docs/intro",
            },
            {
              label: "Architecture",
              to: "/docs/architecture",
            },
            {
              label: "Tokenomics",
              to: "/docs/tokenomics",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/veritasvault",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/veritasvault",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/your-handle",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/VeritasVault/veritasvault-docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} VeritasVault, Inc. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
    },
    // Theme colors from VeritasVault docs
    primaryColor: "#4a90e2", // Light blue accent
    secondaryColor: "#f5a623", // Gold/amber
    prism: {
      theme: {
        plain: { color: "#393A34", backgroundColor: "#f6f8fa" },
        styles: [/* theme styles */],
      },
      darkTheme: {
        plain: { color: "#f8f8f2", backgroundColor: "#282a36" },
        styles: [/* dark theme styles */],
      },
    },
  } satisfies Preset.ThemeConfig,

  // Add static directory configuration
  staticDirectories: ["static"],

  // Add plugins
  plugins: [
    // Your existing plugins
  ],  
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },
}

export default config
