import React, { ReactNode } from 'react';

interface SectionLevelOneProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const SectionLevelOne = ({ 
  id, 
  title, 
  children, 
  className = '' 
}: SectionLevelOneProps) => {
  return (
    <section id={id} className={`section-level section-level-1 ${className}`}>
      <h1>
        {title}
        <a href={`#${id}`} className="section-anchor ml-2 opacity-0 group-hover:opacity-100">
          <span className="inline-block w-4 h-4">🔗</span>
        </a>
      </h1>
      <div className="section-content">{children}</div>
    </section>
  );
};

export default SectionLevelOne;
