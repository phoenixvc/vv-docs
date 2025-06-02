import React from 'react';
import MDXComponents from '@docusaurus/theme-common/internal/MDXComponents';

// BL component for the finmodelling-first-phase file
export function BL(props) {
  return (
    <div className="bl-component" style={{
      border: '1px solid #eee',
      padding: '10px',
      margin: '10px 0',
      background: '#f8f8f8',
      borderRadius: '5px'
    }}>
      <strong>{props.title || "Business Logic"}</strong>
      <div>{props.children}</div>
    </div>
  );
}

// HeadingTag component for docsaurus-integration-guide
export function HeadingTag(props) {
  const level = props?.level || 2;
  const Tag = `h${level}`;
  return <Tag>{props?.children}</Tag>;
}

// Highlight component for markdown-features
export function Highlight(props) {
  return (
    <span
      style={{
        backgroundColor: props?.color || '#1877F2',
        borderRadius: '4px',
        color: '#fff',
        padding: '0.2rem 0.4rem',
      }}>
      {props?.children}
    </span>
  );
}

// Section level components
export function SectionLevelOne(props) {
  return (
    <section id={props.id} className="section-level-one">
      <h1>
        {props.sectionNumber && <span className="section-number">{props.sectionNumber}</span>}
        {props.title}
      </h1>
      {props.description && <p className="section-description">{props.description}</p>}
      <div className="section-content">{props.children}</div>
    </section>
  );
}

export function SectionLevelTwo(props) {
  return (
    <section id={props.id} className="section-level-two">
      <h2>
        {props.sectionNumber && <span className="section-number">{props.sectionNumber}</span>}
        {props.title}
      </h2>
      {props.description && <p className="section-description">{props.description}</p>}
      <div className="section-content">{props.children}</div>
    </section>
  );
}

export function SectionLevelThree(props) {
  return (
    <section id={props.id} className="section-level-three">
      <h3>
        {props.sectionNumber && <span className="section-number">{props.sectionNumber}</span>}
        {props.title}
      </h3>
      {props.description && <p className="section-description">{props.description}</p>}
      <div className="section-content">{props.children}</div>
    </section>
  );
}

// Other necessary components
export function ContentBlock(props) { /* Same implementation */
  return (
    <div className="content-block">
      {props.title && <h4 className="content-title">{props.title}</h4>}
      <div className="content">{props.children}</div>
    </div>
  );
}

export function CodeBlock(props) {
  return (
    <pre className={`language-${props.language || 'text'}`}>
      <code>{props.children}</code>
    </pre>
  );
}

export function DiagramBlock(props) {
  return (
    <div className="diagram-block">
      {props.title && <h4>{props.title}</h4>}
      {props.description && <p>{props.description}</p>}
      <div className="diagram-container">
        {props.imageSrc ? (
          <img src={props.imageSrc} alt={props.imageAlt || props.title} />
        ) : (
          <div className="placeholder-image">Diagram Placeholder</div>
        )}
      </div>
      {props.caption && <p className="diagram-caption">{props.caption}</p>}
    </div>
  );
}

export function CodeExampleBlock(props) {
  return (
    <div className="code-example-block">
      {props.title && <h4>{props.title}</h4>}
      {props.fileName && <div className="file-name">{props.fileName}</div>}
      <pre className={`language-${props.language || 'text'}`}>
        <code>{props.children}</code>
      </pre>
    </div>
  );
}

export function InteractiveBlock(props) {
  return (
    <div className="interactive-block">
      {props.title && <h4>{props.title}</h4>}
      <div className="interactive-content">{props.children}</div>
    </div>
  );
}

export function Admonition(props) {
  const admonitionType = props.type || 'note';
  const admonitionTitle = props.title || admonitionType.charAt(0).toUpperCase() + admonitionType.slice(1);

  return (
    <div className={`admonition admonition-${admonitionType}`}>
      <div className="admonition-heading">{admonitionTitle}</div>
      <div className="admonition-content">{props.children}</div>
    </div>
  );
}

export function PortfolioSimulator() {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '20px',
      margin: '20px 0',
      background: '#f7f7f7',
      textAlign: 'center'
    }}>
      <h3>Portfolio Simulator</h3>
      <p>Interactive portfolio simulator will appear here.</p>
      <p>This is a placeholder for the actual simulator component.</p>
    </div>
  );
}

// styles object for the docsaurus-integration-guide
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

// Export all components in proper format for Docusaurus v3
export default {
  ...MDXComponents, // Important to keep original components
  BL,
  HeadingTag,
  Highlight,
  SectionLevelOne,
  SectionLevelTwo,
  SectionLevelThree,
  ContentBlock,
  CodeBlock,
  DiagramBlock,
  CodeExampleBlock,
  InteractiveBlock,
  Admonition,
  PortfolioSimulator,
};