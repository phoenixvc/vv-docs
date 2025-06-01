import React, { ReactNode } from 'react';

interface SectionLevelOneProps {
  id: string;
  title: string;
  children: ReactNode;
}

export const SectionLevelOne = ({ id, title, children }: SectionLevelOneProps) => {
  return (
    <section id={id} className="section-level-one">
      <h1>{title}</h1>
      <div className="section-content">{children}</div>
    </section>
  );
};