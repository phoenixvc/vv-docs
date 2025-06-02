// This file exports all doc components used throughout the MDX files
import React from 'react';

// Basic section level components
export function SectionLevelOne({ id, title, description, sectionNumber, children }) {
  return (
    <section id={id} className="section-level-one">
      <h1>
        {sectionNumber && <span className="section-number">{sectionNumber}</span>}
        {title}
      </h1>
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">{children}</div>
    </section>
  );
}

export function SectionLevelTwo({ id, title, description, sectionNumber, children }) {
  return (
    <section id={id} className="section-level-two">
      <h2>
        {sectionNumber && <span className="section-number">{sectionNumber}</span>}
        {title}
      </h2>
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">{children}</div>
    </section>
  );
}

export function SectionLevelThree({ id, title, description, sectionNumber, children }) {
  return (
    <section id={id} className="section-level-three">
      <h3>
        {sectionNumber && <span className="section-number">{sectionNumber}</span>}
        {title}
      </h3>
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">{children}</div>
    </section>
  );
}

// Content blocks
export function ContentBlock({ title, children }) {
  return (
    <div className="content-block">
      {title && <h4 className="content-title">{title}</h4>}
      <div className="content">{children}</div>
    </div>
  );
}

// Code examples
export function CodeBlock({ language, children }) {
  return (
    <pre className={`language-${language || 'text'}`}>
      <code>{children}</code>
    </pre>
  );
}

export function CodeExampleBlock({ title, language, fileName, children }) {
  return (
    <div className="code-example-block">
      {title && <h4>{title}</h4>}
      {fileName && <div className="file-name">{fileName}</div>}
      <pre className={`language-${language || 'text'}`}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

// Interactive elements
export function InteractiveBlock({ title, children }) {
  return (
    <div className="interactive-block">
      {title && <h4>{title}</h4>}
      <div className="interactive-content">{children}</div>
    </div>
  );
}

// Diagram blocks
export function DiagramBlock({ title, description, imageSrc, imageAlt, caption }) {
  return (
    <div className="diagram-block">
      {title && <h4>{title}</h4>}
      {description && <p>{description}</p>}
      <div className="diagram-container">
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt || title} />
        ) : (
          <div className="placeholder-image">Diagram Placeholder</div>
        )}
      </div>
      {caption && <p className="diagram-caption">{caption}</p>}
    </div>
  );
}

// Admonitions
export function Admonition({ type, title, children }) {
  const admonitionType = type || 'note';
  const admonitionTitle = title || admonitionType.charAt(0).toUpperCase() + admonitionType.slice(1);
  
  return (
    <div className={`admonition admonition-${admonitionType}`}>
      <div className="admonition-heading">{admonitionTitle}</div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}

// Export the BL component that's causing errors
export function BL({ children, title }) {
  return (
    <div className="bl-component" style={{
      border: '1px solid #eee',
      padding: '15px',
      margin: '10px 0',
      background: '#f8f8f8',
      borderRadius: '5px'
    }}>
      <strong>{title || "Business Logic"}</strong>
      <div>{children}</div>
    </div>
  );
}

// Add a styles export for docsaurus-integration-guide file
export const styles = {
  heading: { fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' },
  subheading: { fontSize: '18px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' },
  paragraph: { marginBottom: '16px', lineHeight: '1.5' },
  sectionLevel1: { marginBottom: '2.5rem' },
  sectionLevel2: { marginTop: '2rem', marginBottom: '1.5rem' },
  sectionLevel3: { marginTop: '1.5rem', marginBottom: '1rem' },
  sectionNumber: { display: 'inline-block', marginRight: '0.5rem' },
  sectionDescription: { fontSize: '1.1rem', marginBottom: '1.5rem' },
  sectionContent: { marginTop: '1rem' }
};