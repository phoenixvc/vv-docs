import React, { ReactNode } from 'react';

interface ContentBlockProps {
  children: ReactNode;
  className?: string;
}

export function ContentBlock({ children, className = '' }: ContentBlockProps) {
  return <div className={`content-block ${className}`}>{children}</div>;
}

export default ContentBlock;
