import React, { ReactNode } from 'react';

interface SectionLevelThreeProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const SectionLevelThree = ({
  id,
  title,
  children,
  className = '',
}: SectionLevelThreeProps) => {
  return (
    <section id={id} className={`section-level section-level-3 ${className}`}>
      <h3>
        {title}
        <a href={`#${id}`} className="section-anchor ml-2 opacity-0 group-hover:opacity-100">
          <span className="inline-block w-4 h-4">🔗</span>
        </a>
      </h3>
      <div className="section-content">{children}</div>
    </section>
  );
};

export default SectionLevelThree;