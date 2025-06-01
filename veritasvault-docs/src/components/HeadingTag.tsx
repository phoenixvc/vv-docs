import React from 'react';

interface HeadingTagProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function HeadingTag({ 
  as: Component = 'h2', 
  children, 
  className = '', 
  id 
}: HeadingTagProps) {
  return (
    <Component id={id} className={className}>
      {children}
    </Component>
  );
}

export default HeadingTag;