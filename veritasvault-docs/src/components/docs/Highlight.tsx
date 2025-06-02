import React, { ReactNode } from 'react';

interface HighlightProps {
  children: ReactNode;
  color: string;
}

export const Highlight = ({ children, color }: HighlightProps) => {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
};

export default Highlight;