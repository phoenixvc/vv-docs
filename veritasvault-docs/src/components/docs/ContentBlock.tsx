import React, { ReactNode } from 'react';

interface ContentBlockProps {
  children: ReactNode;
  className?: string;
}

const ContentBlock = ({ children, className = '' }: ContentBlockProps) => {
  return <div className={`content-block ${className}`}>{children}</div>;
};

// Only export once - both named and default
export { ContentBlock };
export default ContentBlock;
