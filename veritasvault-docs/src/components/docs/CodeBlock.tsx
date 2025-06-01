import React from 'react';
import OriginalCodeBlock from '@theme/CodeBlock';

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ 
  children, 
  language = 'text', 
  title, 
  showLineNumbers = false 
}: CodeBlockProps) => {
  return (
    <OriginalCodeBlock 
      language={language} 
      title={title} 
      showLineNumbers={showLineNumbers}
    >
      {children}
    </OriginalCodeBlock>
  );
};