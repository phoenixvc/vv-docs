import React, { JSX, ReactNode } from 'react';

// SectionAnchor component
export function SectionAnchor({ id, className = '' }) {
  return (
    <a
      href={`#${id}`}
      className={`section-anchor ${className}`}
      aria-label={`Link to ${id} section`}
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          // Update URL without triggering navigation
          history.pushState({}, "", `#${id}`);
          // Scroll to element with offset for header
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }}
    >
      <span className="anchor-icon">🔗</span>
    </a>
  );
}

// Section components
export function SectionLevelOne({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`section-level section-level-1 ${className}`}>
      <h1>
        {title}
        <SectionAnchor id={id} />
      </h1>
      <div className="section-content">{children}</div>
    </section>
  );
}

export function SectionLevelTwo({ id, title, description, sectionNumber, children, className = '', isPrintMode = false }) {
  return (
    <section id={id} className={`section-level section-level-2 ${className}`}>
      <h2>
        {title}
        {!isPrintMode && <SectionAnchor id={id} />}
      </h2>
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">{children}</div>
    </section>
  );
}

export function SectionLevelThree({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`section-level section-level-3 ${className}`}>
      <h3>
        {title}
        <SectionAnchor id={id} />
      </h3>
      <div className="section-content">{children}</div>
    </section>
  );
}

// Generic SectionLevel component
export function SectionLevel({ id, title, level = 2, children, className = '' }) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <section id={id} className={`section-level section-level-${level} ${className}`}>
      <HeadingTag>
        {title}
        <SectionAnchor id={id} />
      </HeadingTag>
      <div className="section-content">{children}</div>
    </section>
  );
}

// Content block components
export function ContentBlock({ children, className = '' }) {
  return <div className={`content-block ${className}`}>{children}</div>;
}

export function CodeExampleBlock({ children, language = "text", title = "" }) {
  return (
    <div className="code-example-block">
      {title && <div className="code-example-title">{title}</div>}
      <pre className={`language-${language}`}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function DiagramBlock({ children, title = "", className = '' }) {
  return (
    <div className={`diagram-block ${className}`}>
      {title && <div className="diagram-title">{title}</div>}
      <div className="diagram-content">{children}</div>
    </div>
  );
}

export function TableBlock({ headers = [], data = [] }) {
  return (
    <div className="table-block">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Admonition component
export function Admonition({ type = "note", title, children }) {
  return (
    <div className={`admonition admonition-${type}`}>
      {title && <div className="admonition-title">{title}</div>}
      <div className="admonition-content">{children}</div>
    </div>
  );
}

// Highlight component for markdown-features.mdx
export function Highlight({ children, color }) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}

// Set up default exports as well
export default {
  SectionAnchor,
  SectionLevel,
  SectionLevelOne,
  SectionLevelTwo,
  SectionLevelThree,
  ContentBlock,
  CodeExampleBlock,
  DiagramBlock,
  TableBlock,
  Admonition,
  Highlight
};