# Creating a Custom Docusaurus Theme

This guide provides detailed instructions for creating and customizing a Docusaurus theme. Whether you need to make minor adjustments to the default theme or build a completely custom theme from scratch, this document will walk you through the process.

## Table of Contents

- [Understanding Docusaurus Theme Architecture](#understanding-docusaurus-theme-architecture)
- [Approaches to Theme Customization](#approaches-to-theme-customization)
- [Theme Component Structure](#theme-component-structure)
- [Creating a Custom Theme](#creating-a-custom-theme)
- [Styling Your Theme](#styling-your-theme)
- [Advanced Theme Customizations](#advanced-theme-customizations)
- [Theme Testing and Validation](#theme-testing-and-validation)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Understanding Docusaurus Theme Architecture

Docusaurus uses a component-based theming system that allows for extensive customization. Before diving into creating a custom theme, it's important to understand how themes work in Docusaurus.

### Theme Components

Themes in Docusaurus are collections of React components that determine the appearance and behavior of your site. The default theme (`@docusaurus/theme-classic`) provides components for:

- Layout (header, footer, sidebar)
- Navigation
- Documentation pages
- Blog pages
- Search functionality
- And more

### Theme Inheritance

Docusaurus supports theme inheritance, allowing you to:

1. **Extend existing themes**: Build upon an existing theme, overriding only specific components
2. **Create standalone themes**: Build a completely new theme from scratch

### Theme Component Resolution

When Docusaurus renders a page, it resolves components in this order:

1. **Client theme components**: Your custom theme components
2. **Plugin theme components**: Components from plugins you've installed
3. **Base theme components**: Components from the base theme (usually classic theme)

This resolution order allows you to override specific components without duplicating the entire theme.

## Approaches to Theme Customization

There are several ways to customize a Docusaurus theme, each with different levels of complexity:

### 1. Swizzling Components

Swizzling is Docusaurus' mechanism for copying theme components into your project for customization.

\`\`\`bash
# Eject a component in development mode (safe)
npm run swizzle @docusaurus/theme-classic [ComponentName] -- --eject --typescript

# Wrap a component (safer alternative)
npm run swizzle @docusaurus/theme-classic [ComponentName] -- --wrap --typescript
\`\`\`

Swizzling is ideal for:
- Making minor changes to specific components
- Customizing the appearance of particular elements
- Adding functionality to existing components

### 2. Creating a Standalone Theme

For more extensive customization, you can create a standalone theme:

\`\`\`bash
mkdir -p src/theme
\`\`\`

Then, create the necessary component files in this directory to override the default theme components.

### 3. Creating a Theme Package

For reusable themes across multiple projects, you can create a theme package:

\`\`\`bash
mkdir my-docusaurus-theme
cd my-docusaurus-theme
npm init
\`\`\`

## Theme Component Structure

A Docusaurus theme typically has the following structure:

\`\`\`
src/theme/
├── Footer/
│   └── index.js       # Footer component
├── Navbar/
│   └── index.js       # Navbar component
├── Layout/
│   └── index.js       # Main layout component
├── MDXComponents/
│   └── index.js       # Custom MDX components
└── theme.config.js    # Theme configuration
\`\`\`

### Key Components to Consider

When creating a custom theme, these are the key components you might want to customize:

1. **Layout**: The overall page structure
2. **Navbar**: The top navigation bar
3. **Footer**: The page footer
4. **DocSidebar**: The documentation sidebar
5. **DocItem**: Individual documentation pages
6. **BlogPostItem**: Individual blog posts
7. **CodeBlock**: Code syntax highlighting
8. **TOC**: Table of contents

## Creating a Custom Theme

Let's walk through the process of creating a custom theme from scratch:

### 1. Set Up the Theme Directory

\`\`\`bash
mkdir -p src/theme
\`\`\`

### 2. Create a Theme Entry Point

Create a file at `src/theme/index.js`:

\`\`\`javascript
// src/theme/index.js
import './styles.css'; // Your theme's global styles

// You can export theme constants here
export const ThemeColors = {
  primary: '#3578e5',
  secondary: '#1c1e21',
  // ...
};
\`\`\`

### 3. Override Key Components

Let's override the Navbar component as an example:

\`\`\`jsx
// src/theme/Navbar/index.js
import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarLogo from '@theme/NavbarLogo';
import styles from './styles.module.css';

function Navbar() {
  const {
    navbar: {items},
  } = useThemeConfig();
  const {navbarRef, isNavbarVisible} = useHideableNavbar();
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <nav
      ref={navbarRef}
      className={clsx('navbar', 'navbar--fixed-top', {
        'navbar-sidebar--show': mobileSidebar.shown,
        [styles.navbarHidden]: !isNavbarVisible,
      })}>
      <div className="navbar__inner">
        <div className="navbar__items">
          <NavbarLogo />
          {items
            .filter((item) => item.position === 'left')
            .map((item, i) => (
              <NavbarItem {...item} key={i} />
            ))}
        </div>
        <div className="navbar__items navbar__items--right">
          {items
            .filter((item) => item.position === 'right')
            .map((item, i) => (
              <NavbarItem {...item} key={i} />
            ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
\`\`\`

### 4. Create Component Styles

For the Navbar component, create a CSS module:

\`\`\`css
/* src/theme/Navbar/styles.module.css */
.navbarHidden {
  transform: translate3d(0, calc(-100% - 2px), 0);
}

/* Add your custom styles here */
.customNavbarClass {
  background-color: var(--custom-navbar-bg-color);
}
\`\`\`

### 5. Create Global Theme Styles

\`\`\`css
/* src/theme/styles.css */
:root {
  --custom-navbar-bg-color: #ffffff;
  --custom-primary-color: #3578e5;
  --custom-secondary-color: #1c1e21;
  /* Add more custom CSS variables */
}

html[data-theme='dark'] {
  --custom-navbar-bg-color: #1c1e21;
  --custom-primary-color: #4e89e8;
  --custom-secondary-color: #f5f6f7;
  /* Dark theme variables */
}

/* Global styles */
.custom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
\`\`\`

## Styling Your Theme

Docusaurus offers several approaches to styling your custom theme:

### 1. CSS Modules

CSS Modules provide local scoping for CSS classes, preventing style conflicts:

\`\`\`jsx
import styles from './styles.module.css';

function MyComponent() {
  return <div className={styles.myCustomClass}>Content</div>;
}
\`\`\`

### 2. Global Styles

For global styles that apply across your site:

\`\`\`jsx
// src/theme/index.js
import './styles.css';
\`\`\`

### 3. CSS Variables

Docusaurus uses CSS variables for theming, which you can override:

\`\`\`css
:root {
  --ifm-color-primary: #3578e5;
  --ifm-color-primary-dark: #1d68e1;
  /* ... other variables */
}
\`\`\`

### 4. Tailwind CSS Integration

You can integrate Tailwind CSS with Docusaurus:

1. Install Tailwind and dependencies:

\`\`\`bash
npm install tailwindcss postcss autoprefixer
\`\`\`

2. Create configuration files:

\`\`\`bash
npx tailwindcss init
\`\`\`

3. Configure PostCSS in `postcss.config.js`:

\`\`\`javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
\`\`\`

4. Update your Tailwind config:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'], // Support Docusaurus dark mode
};
\`\`\`

5. Create a CSS file to import Tailwind:

\`\`\`css
/* src/css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

6. Import the CSS file in your theme:

\`\`\`javascript
// src/theme/index.js
import '../css/tailwind.css';
\`\`\`

## Advanced Theme Customizations

### Custom MDX Components

You can customize how MDX content is rendered by overriding the `MDXComponents` theme component:

\`\`\`jsx
// src/theme/MDXComponents/index.js
import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import CustomCallout from '@site/src/components/CustomCallout';
import CodeBlock from '@theme/CodeBlock';

export default {
  ...MDXComponents,
  Callout: CustomCallout,
  code: (props) => {
    const {children} = props;
    if (typeof children === 'string') {
      return <CodeBlock {...props} />;
    }
    return <code {...props} />;
  },
};
\`\`\`

### Custom Syntax Highlighting

To customize code syntax highlighting:

\`\`\`jsx
// docusaurus.config.js
module.exports = {
  // ...
  themeConfig: {
    // ...
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['java', 'php'],
    },
  },
};
\`\`\`

### Custom Search

To implement a custom search solution:

1. Disable the default search:

\`\`\`javascript
// docusaurus.config.js
module.exports = {
  // ...
  themeConfig: {
    // ...
    algolia: undefined,
  },
};
\`\`\`

2. Create a custom search component:

\`\`\`jsx
// src/theme/SearchBar/index.js
import React, {useState} from 'react';
import styles from './styles.module.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Searching for:', query);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
\`\`\`

## Theme Testing and Validation

### Testing Components

1. Set up Jest for testing:

\`\`\`bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
\`\`\`

2. Create a test file:

\`\`\`jsx
// src/theme/Navbar/__tests__/index.test.js
import React from 'react';
import {render, screen} from '@testing-library/react';
import Navbar from '../index';

// Mock the theme hooks
jest.mock('@docusaurus/theme-common', () => ({
  useThemeConfig: () => ({
    navbar: {
      items: [],
    },
  }),
}));

jest.mock('@docusaurus/theme-common/internal', () => ({
  useHideableNavbar: () => ({
    navbarRef: {current: null},
    isNavbarVisible: true,
  }),
  useNavbarMobileSidebar: () => ({
    shown: false,
  }),
}));

describe('Navbar', () => {
  it('renders correctly', () => {
    render(<Navbar />);
    // Add your assertions here
  });
});
\`\`\`

### Visual Testing

Consider using Storybook for visual testing of theme components:

\`\`\`bash
npx sb init
\`\`\`

Then create stories for your components:

\`\`\`jsx
// src/theme/Navbar/Navbar.stories.jsx
import React from 'react';
import Navbar from './index';

export default {
  title: 'Theme/Navbar',
  component: Navbar,
};

export const Default = () => <Navbar />;
\`\`\`

### Accessibility Testing

Ensure your theme components are accessible:

1. Install axe-core for accessibility testing:

\`\`\`bash
npm install --save-dev @axe-core/react
\`\`\`

2. Add accessibility tests:

\`\`\`jsx
import React from 'react';
import {render} from '@testing-library/react';
import {axe, toHaveNoViolations} from 'jest-axe';
import Navbar from '../index';

expect.extend(toHaveNoViolations);

describe('Navbar accessibility', () => {
  it('should not have accessibility violations', async () => {
    const {container} = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
\`\`\`

## Best Practices

### 1. Theme Organization

- Keep theme components organized in a logical structure
- Use consistent naming conventions
- Group related components together

### 2. Performance Considerations

- Minimize bundle size by avoiding unnecessary dependencies
- Use code splitting for large components
- Optimize images and assets

### 3. Maintainability

- Document your theme components
- Use TypeScript for type safety
- Write tests for critical components

### 4. Responsive Design

- Ensure your theme works well on all device sizes
- Use responsive design principles
- Test on multiple devices and browsers

### 5. Dark Mode Support

Ensure your theme supports Docusaurus' dark mode:

\`\`\`css
:root {
  --my-color: #1c1e21;
}

html[data-theme='dark'] {
  --my-color: #f5f6f7;
}
\`\`\`

## Troubleshooting

### Common Issues

1. **Component not being overridden**
   - Ensure the component path exactly matches the theme component path
   - Check for typos in component names
   - Verify the component is being exported correctly

2. **Styling conflicts**
   - Use CSS modules to avoid global style conflicts
   - Check specificity of CSS selectors
   - Use browser dev tools to inspect styles

3. **Build errors**
   - Check console for error messages
   - Verify all dependencies are installed
   - Ensure component props match expected types

## Conclusion

Creating a custom Docusaurus theme allows you to fully control the appearance and functionality of your documentation site. By understanding the theme architecture and following the best practices outlined in this guide, you can create a polished, professional theme that enhances the user experience of your documentation.

## Additional Resources

- [Official Docusaurus Theming Documentation](https://docusaurus.io/docs/styling-layout)
- [Swizzling Tutorial](https://docusaurus.io/docs/swizzling)
- [Theme Classic Source Code](https://github.com/facebook/docusaurus/tree/main/packages/docusaurus-theme-classic)
- [Docusaurus Setup Guide](docs/docusaurus-setup-checklist.md)
- [Docusaurus Content Migration Guide](docs/docusaurus-content-migration-guide.md)
- [Docusaurus Component Migration Guide](docs/docusaurus-component-migration-guide.md)
