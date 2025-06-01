import React, { ReactNode } from 'react';
import OriginalAdmonition from '@theme/Admonition';

interface AdmonitionProps {
  type: 'note' | 'tip' | 'info' | 'caution' | 'danger';
  title?: string;
  children: ReactNode;
}

export const Admonition = ({ type, title, children }: AdmonitionProps) => {
  return (
    <OriginalAdmonition type={type} title={title}>
      {children}
    </OriginalAdmonition>
  );
};