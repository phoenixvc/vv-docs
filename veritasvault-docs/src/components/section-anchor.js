import React from 'react';

export function SectionAnchor({ id }) {
  return <div id={id} className="section-anchor"></div>;
}

// Add default export to fix the import issues
export default SectionAnchor;