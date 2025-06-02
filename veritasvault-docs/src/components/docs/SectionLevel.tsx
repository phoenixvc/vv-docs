import React, { ReactNode } from 'react';

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
export const SectionLevel = ({
  id,
  title,
  level = 2,
  children,
  className = '',
}: SectionLevelProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <section id={id} className={`section-level section-level-${level} ${className}`}>
      <Tag>
          {title}
        <a href={`#${id}`} className="section-anchor ml-2 opacity-0 group-hover:opacity-100">
          <span className="inline-block w-4 h-4">🔗</span>
        </a>
      </Tag>
      <div className="section-content">{children}</div>
    </section>
  );
};
// Export SectionLevel levels as separate named exports
export function SectionLevelOne(props: Omit<SectionLevelProps, 'level'>) {
  return SectionLevel({ ...props, level: 1 });
}

export function SectionLevelTwo(props: Omit<SectionLevelProps, 'level'>) {
  return SectionLevel({ ...props, level: 2 });
}

export function SectionLevelThree(props: Omit<SectionLevelProps, 'level'>) {
  return SectionLevel({ ...props, level: 3 });
}

// Export default
export default SectionLevel;