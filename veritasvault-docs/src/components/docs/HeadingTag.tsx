import React, { JSX, ReactNode } from 'react';

interface HeadingTagProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  id?: string;
}

export const HeadingTag = ({ 
  level = 2, 
  children, 
  className = '',
  id
}: HeadingTagProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag id={id} className={className}>{children}</Tag>;
};

export default HeadingTag;