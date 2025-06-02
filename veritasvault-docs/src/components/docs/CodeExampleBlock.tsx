import React, { ReactNode } from 'react';

interface CodeExampleBlockProps {
  children: ReactNode;
  language?: string;
  title?: string;
}

export const CodeExampleBlock = ({ 
  children, 
  language = "text", 
  title = "" 
}: CodeExampleBlockProps) => {
  return (
    <div className="code-example-block">
      {title && <div className="code-example-title">{title}</div>}
      <pre className={`language-${language}`}>
        <code>{children}</code>
      </pre>
    </div>
  );
};
export default CodeExampleBlock;
