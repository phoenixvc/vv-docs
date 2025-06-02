// Import the original MDX components
import MDXComponentsDefault from '@theme-original/MDXComponents';

// Define BL as a React constant component (different approach)
const BL = (props) => {
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
};

// All other components...
function HeadingTag(props) {
  const level = props?.level || 2;
  const Tag = `h${level}`;
  return <Tag>{props?.children}</Tag>;
}

function Highlight(props) {
  return (
    <span style={{
      backgroundColor: props?.color || '#1877F2',
      borderRadius: '4px',
      color: '#fff',
      padding: '0.2rem 0.4rem',
    }}>
      {props?.children}
    </span>
  );
}

function SectionLevelOne(props) {
  return (
    <section id={props.id} className="section-level-one">
      <h1>{props.title}</h1>
      {props.description && <p>{props.description}</p>}
      <div>{props.children}</div>
    </section>
  );
}

function SectionLevelTwo(props) {
  return (
    <section id={props.id} className="section-level-two">
      <h2>{props.title}</h2>
      {props.description && <p>{props.description}</p>}
      <div>{props.children}</div>
    </section>
  );
}

function SectionLevelThree(props) {
  return (
    <section id={props.id} className="section-level-three">
      <h3>{props.title}</h3>
      {props.description && <p>{props.description}</p>}
      <div>{props.children}</div>
    </section>
  );
}

// Content blocks
function ContentBlock(props) {
  return (
    <div className="content-block">
      {props.title && <h4>{props.title}</h4>}
      <div>{props.children}</div>
    </div>
  );
}

function CodeBlock(props) {
  return (
    <pre className={`language-${props.language || 'text'}`}>
      <code>{props.children}</code>
    </pre>
  );
}

function CodeExampleBlock(props) {
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

// Interactive elements and calculators
function TokenCalculator(props) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '20px',
      margin: '20px 0',
      background: '#f7f7f7',
      textAlign: 'center'
    }}>
      <h3>Token Calculator</h3>
      <p>Interactive token calculator will appear here.</p>
      <p>This is a placeholder for the actual calculator component.</p>
    </div>
  );
}

function InteractiveBlock(props) {
  return (
    <div className="interactive-block">
      {props.title && <h4>{props.title}</h4>}
      <div>{props.children}</div>
    </div>
  );
}

// Diagram blocks
function DiagramBlock(props) {
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

// Create individual styled components for the styles object
const Heading = (props) => <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{props.children}</div>;
const Subheading = (props) => <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>{props.children}</div>;
const Paragraph = (props) => <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>{props.children}</p>;

// Define styles object for direct variable usage
const styles = {
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

// Export with the correct format for Docusaurus 3.7.0
export default {
  ...MDXComponentsDefault,
  BL,
  HeadingTag,
  Highlight,
  SectionLevelOne,
  SectionLevelTwo,
  SectionLevelThree,
  ContentBlock,
  CodeBlock,
  CodeExampleBlock,
  TokenCalculator,
  InteractiveBlock,
  DiagramBlock,
  Heading,
  Subheading,
  Paragraph,
  // Export the styles as a component to make it available to MDX
  styles: styles,
  // Also export each style property as its own property
  headingStyle: styles.heading,
  subheadingStyle: styles.subheading,
  paragraphStyle: styles.paragraph,
  sectionLevel1Style: styles.sectionLevel1,
  sectionLevel2Style: styles.sectionLevel2,
  sectionLevel3Style: styles.sectionLevel3
};