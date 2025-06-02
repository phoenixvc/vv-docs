import React, { JSX } from 'react';

interface SectionAnchorProps {
  id: string;
  title?: string;
}

/**
 * Creates an anchor point for section links with optional tooltip
 */
export default function SectionAnchor({ id, title }: SectionAnchorProps): JSX.Element {
  return (
    <span id={id} className="section-anchor" title={title || `Link to this section: #${id}`}>
      <a href={`#${id}`} className="section-anchor-link">
        #
      </a>
    </span>
  );
}