import React, { JSX, ReactNode } from 'react';

interface SectionLevelProps {
  id: string;
  title: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

/**
 * Section level component for document structure
 */
export default function SectionLevel({
  id,
  title,
  level = 2,
  children,
  className = '',
}: SectionLevelProps): JSX.Element {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <section id={id} className={`section-level section-level-${level} ${className}`}>
      <HeadingTag>
        <a href={`#${id}`} className="section-anchor">
          {title}
        </a>
      </HeadingTag>
      <div className="section-content">{children}</div>
    </section>
  );
}