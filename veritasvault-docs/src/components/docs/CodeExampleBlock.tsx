import React, { JSX, ReactNode } from 'react';
import CodeBlock from '@theme/CodeBlock';

interface CodeExampleBlockProps {
  title?: string;
  language?: string;
  children: string;
  showLineNumbers?: boolean;
  highlight?: string;
  caption?: string;
}

/**
 * Enhanced code block with title, caption and highlighting
 */
export default function CodeExampleBlock({
  title,
  language = 'typescript',
  children,
  showLineNumbers = false,
  highlight,
  caption,
}: CodeExampleBlockProps): JSX.Element {
  return (
    <div className="code-example-block">
      {title && <h4 className="code-example-title">{title}</h4>}
      <CodeBlock
        language={language}
        title={title}
        showLineNumbers={showLineNumbers}
        metastring={highlight ? `{${highlight}}` : ''}
      >
        {children}
      </CodeBlock>
      {caption && <p className="code-example-caption">{caption}</p>}
    </div>
  );
}