import React, { ReactNode } from 'react';

interface AdmonitionProps {
  type?: "note" | "tip" | "info" | "warning" | "danger";
  title?: string;
  children: ReactNode;
}

export const Admonition = ({ 
  type = "note", 
  title, 
  children 
}: AdmonitionProps) => {
  return (
    <div className={`admonition admonition-${type}`}>
      {title && <div className="admonition-title">{title}</div>}
      <div className="admonition-content">{children}</div>
    </div>
  );
};
export default Admonition;
