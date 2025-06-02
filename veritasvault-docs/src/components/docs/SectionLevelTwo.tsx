import React, { ReactNode } from 'react';

interface SectionLevelTwoProps {
  id: string;
  title: string;
  description?: string;
  sectionNumber?: string;
  children: ReactNode;
  className?: string;
  isPrintMode?: boolean;
}

export const SectionLevelTwo = ({
  id,
  title,
  description,
  sectionNumber,
  children,
  className = "",
  isPrintMode = false,
}: SectionLevelTwoProps) => {
  return (
    <section id={id} className={`section-level section-level-2 ${className}`}>
      <h2>
        {title}
        {!isPrintMode && (
          <a href={`#${id}`} className="section-anchor ml-2 opacity-0 group-hover:opacity-100">
            <span className="inline-block w-4 h-4">🔗</span>
          </a>
        )}
      </h2>
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">{children}</div>
    </section>
  );
};

export default SectionLevelTwo;