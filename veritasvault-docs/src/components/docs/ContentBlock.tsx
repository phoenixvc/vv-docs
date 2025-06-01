import React, { ReactNode } from 'react';

interface ContentBlockProps {
  children: ReactNode;
  className?: string;
}

export const ContentBlock = ({ children, className = '' }: ContentBlockProps) => {
  return (
    <div className={`content-block ${className}`}>
      {children}
    </div>
  );
};