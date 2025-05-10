# Docusaurus Component Migration Guide

This guide provides detailed instructions for adapting React components from Next.js to Docusaurus. It covers the key differences between the frameworks, component adaptation patterns, and solutions for common migration challenges.

## Framework Differences

| Feature | Next.js | Docusaurus |
|---------|---------|------------|
| Rendering | Server Components, Client Components | Client-side React components |
| Routing | App Router or Pages Router | Plugin-based routing |
| Data Fetching | Server Components, getServerSideProps, etc. | Plugin lifecycle methods |
| Styling | CSS Modules, CSS-in-JS, etc. | CSS Modules, global CSS |
| Image Optimization | Next Image component | Standard img with plugins |
| MDX Support | Built-in with @next/mdx | First-class MDX support |
| Client/Server | Clear separation | Primarily client-side |

## Component Adaptation Patterns

### Basic Component Migration

When migrating a simple React component from Next.js to Docusaurus:

1. Move the component to `src/components/` in your Docusaurus project
2. Convert any Server Components to Client Components
3. Update imports to match Docusaurus conventions
4. Adapt styling approaches as needed

### Example: Simple Component

\`\`\`jsx
// Next.js component (src/components/Alert.jsx)
export default function Alert({ type, children }) {
  return (
    <div className={`alert alert-${type}`}>
      {children}
    </div>
  );
}

// Docusaurus component (src/components/Alert.jsx)
import React from 'react';
import styles from './styles.module.css';

export default function Alert({ type, children }) {
  return (
    <div className={`${styles.alert} ${styles[`alert${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}>
      {children}
    </div>
  );
}
\`\`\`

### Complex Component Migration

For components with data fetching or routing dependencies:

1. Identify Next.js-specific features being used
2. Find Docusaurus equivalents for these features
3. Refactor the component to use Docusaurus patterns
4. Test thoroughly to ensure functionality is preserved

### Example: Component with Data Fetching

\`\`\`jsx
// Next.js component with data fetching
// pages/dashboard.js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
  };
}

export default function Dashboard({ data }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Docusaurus component with data fetching
// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { siteConfig } = useDocusaurusContext();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://api.example.com/data');
        const fetchedData = await res.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    <Layout title="Dashboard" description={siteConfig.tagline}>
      <div className="container margin-vert--lg">
        <h1>Dashboard</h1>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <ul>
            {data.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
\`\`\`

## MDX Integration

### Using Components in MDX

In Docusaurus, you can import and use React components in MDX files:

\`\`\`mdx
---
id: my-doc
title: My Document
---

import MyComponent from '@site/src/components/MyComponent';

# My Document

This is my MDX content.

<MyComponent />
\`\`\`

### Global Components

You can register components globally in Docusaurus by adding them to the `docusaurus.config.js` file:

\`\`\`javascript
module.exports = {
  // ...
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // ...
          remarkPlugins: [require('./src/plugins/remark-plugin-global-components')],
        },
      },
    ],
  ],
};
\`\`\`

### MDX Component Swizzling

Docusaurus allows "swizzling" (customizing) built-in components:

\`\`\`bash
npm run swizzle @docusaurus/theme-classic [ComponentName]
\`\`\`

## Client-Side Components

### Client-Side Only Components

For components that rely on browser APIs:

\`\`\`jsx
import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function MyClientComponent() {
  return (
    <BrowserOnly>
      {() => {
        // This code only runs in the browser
        const MyBrowserComponent = require('./MyBrowserComponent').default;
        return <MyBrowserComponent />;
      }}
    </BrowserOnly>
  );
}
\`\`\`

### Handling Window/Document Access

\`\`\`jsx
// Next.js Component with window access
'use client';

import { useEffect, useState } from 'react';

export default function WindowSizeDisplay() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    // Initial size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      <p>Window width: {windowSize.width}px</p>
      <p>Window height: {windowSize.height}px</p>
    </div>
  );
}

// Docusaurus Component with window access
import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Option 1: Using BrowserOnly component
export function WindowSizeDisplay() {
  return (
    <BrowserOnly>
      {() => {
        // This code only runs in browser
        const [windowSize, setWindowSize] = useState({
          width: window.innerWidth,
          height: window.innerHeight
        });
        
        useEffect(() => {
          function handleResize() {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight
            });
          }
          
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);
        
        return (
          <div>
            <p>Window width: {windowSize.width}px</p>
            <p>Window height: {windowSize.height}px</p>
          </div>
        );
      }}
    </BrowserOnly>
  );
}

// Option 2: Using useEffect with null initial state
export function WindowSizeDisplayAlt() {
  const [windowSize, setWindowSize] = useState(null);
  
  useEffect(() => {
    // This code only runs in browser
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Render nothing until we have window size
  if (!windowSize) return null;
  
  return (
    <div>
      <p>Window width: {windowSize.width}px</p>
      <p>Window height: {windowSize.height}px</p>
    </div>
  );
}
\`\`\`

## Styling Approaches

### CSS Modules

Both Next.js and Docusaurus support CSS Modules:

\`\`\`jsx
// Next.js CSS Modules
// components/Button.module.css
.button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
}

.primary {
  background-color: #0070f3;
  color: white;
}

.secondary {
  background-color: #f3f4f6;
  color: #1f2937;
}

// components/Button.jsx
import styles from './Button.module.css';

export default function Button({ variant = 'primary', children, ...props }) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`} 
      {...props}
    >
      {children}
    </button>
  );
}

// Docusaurus CSS Modules
// src/components/Button/styles.module.css
.button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
}

.primary {
  background-color: var(--ifm-color-primary);
  color: var(--ifm-color-white);
}

.secondary {
  background-color: var(--ifm-color-gray-100);
  color: var(--ifm-color-gray-900);
}

// src/components/Button/index.jsx
import React from 'react';
import styles from './styles.module.css';

export default function Button({ variant = 'primary', children, ...props }) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`} 
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

### Global Styles

\`\`\`jsx
// Next.js Global Styles
// app/globals.css or styles/globals.css
:root {
  --primary-color: #0070f3;
  --secondary-color: #ff4081;
  --text-color: #333;
  --background-color: #fff;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Import in _app.js or layout.js
import '../styles/globals.css';

// Docusaurus Global Styles
// src/css/custom.css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Configure in docusaurus.config.js
module.exports = {
  // ...other config
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // ...other preset options
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
      },
    ],
  ],
};
\`\`\`

### Tailwind CSS

Docusaurus can be configured to use Tailwind CSS:

1. Install Tailwind and dependencies
2. Create a `tailwind.config.js` file
3. Configure PostCSS in `docusaurus.config.js`
4. Import Tailwind in your CSS

## Common Challenges and Solutions

### Server Component Migration

Next.js server components must be converted to client components in Docusaurus:

\`\`\`jsx
// Next.js Server Component
// app/user-profile/page.jsx
import { getUser } from '@/lib/api';

export default async function UserProfile({ params }) {
  const user = await getUser(params.id);
  
  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

// Docusaurus Client Component
// src/components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('id');
  
  useEffect(() => {
    async function loadUser() {
      try {
        // Import the API function dynamically to avoid server-side issues
        const { getUser } = await import('../lib/api');
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      loadUser();
    }
  }, [userId]);
  
  if (loading) return <div>Loading user profile...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
\`\`\`

### Data Fetching

Replace Next.js data fetching with Docusaurus approaches:

[PLACEHOLDER: Data fetching comparison]

### Dynamic Routes

Convert dynamic routes to Docusaurus routing system:

\`\`\`jsx
// Next.js Dynamic Route
// pages/blog/[slug].js
export async function getStaticPaths() {
  const posts = await getPosts();
  
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  
  return {
    props: { post },
  };
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Docusaurus Dynamic Route
// In docusaurus.config.js
module.exports = {
  // ...other config
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        // ...other options
        routeBasePath: 'blog',
        path: './blog',
      },
    ],
  ],
};

// For custom dynamic routes, create a plugin:
// src/plugins/dynamic-routes/index.js
module.exports = function(context, options) {
  return {
    name: 'dynamic-routes-plugin',
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;
      const posts = await getPosts(); // Your data fetching function
      
      for (const post of posts) {
        // Create data file
        const postDataPath = await createData(
          `${post.slug}.json`,
          JSON.stringify(post)
        );
        
        // Add route
        addRoute({
          path: `/blog/${post.slug}`,
          component: '@site/src/components/BlogPost',
          exact: true,
          modules: {
            // Add post data as a prop
            content: postDataPath,
          },
        });
      }
    },
  };
};

// src/components/BlogPost.jsx
import React from 'react';
import Layout from '@theme/Layout';

export default function BlogPost(props) {
  const { content: post } = props;
  
  return (
    <Layout title={post.title}>
      <article className="container margin-vert--lg">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}
\`\`\`

### Image Optimization

Replace Next.js Image component with Docusaurus img handling:

\`\`\`jsx
// Next.js Image Component
import Image from 'next/image';

export default function ProfileCard({ user }) {
  return (
    <div className="card">
      <Image 
        src={user.avatar || "/placeholder.svg"} 
        alt={`${user.name}'s avatar`}
        width={100}
        height={100}
        priority
      />
      <h2>{user.name}</h2>
    </div>
  );
}

// Docusaurus Image Component
import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function ProfileCard({ user }) {
  // For images that change with theme
  const avatarLight = useBaseUrl(`/img/avatars/${user.avatarLight}`);
  const avatarDark = useBaseUrl(`/img/avatars/${user.avatarDark}`);
  
  // For simple images
  const simpleAvatar = useBaseUrl(`/img/avatars/${user.avatar}`);
  
  return (
    <div className="card">
      {/* For theme-aware images */}
      <ThemedImage
        sources={{
          light: avatarLight,
          dark: avatarDark,
        }}
        alt={`${user.name}'s avatar`}
        width={100}
        height={100}
      />
      
      {/* For simple images */}
      <img 
        src={simpleAvatar || "/placeholder.svg"}
        alt={`${user.name}'s avatar`}
        width={100}
        height={100}
      />
      
      <h2>{user.name}</h2>
    </div>
  );
}
\`\`\`

## Testing and Validation

### Component Testing

1. Set up Jest with Docusaurus
2. Adapt your test files
3. Mock Docusaurus-specific features

### Accessibility Testing

Ensure components maintain accessibility when migrated:

1. Use the same accessibility testing tools
2. Verify keyboard navigation works
3. Check screen reader compatibility

## Conclusion

Migrating components from Next.js to Docusaurus requires understanding the fundamental differences between the frameworks and adapting your components accordingly. This guide provides a starting point, but each project may have unique challenges requiring specific solutions.

## Additional Resources

- [Docusaurus Official Documentation](https://docusaurus.io/docs)
- [React Components in Docusaurus](https://docusaurus.io/docs/creating-pages#using-react)
- [Styling and Layout in Docusaurus](https://docusaurus.io/docs/styling-layout)
- [Docusaurus Setup Guide](docs/docusaurus-setup-checklist.md)
- [Docusaurus Content Migration Guide](docs/docusaurus-content-migration-guide.md)
