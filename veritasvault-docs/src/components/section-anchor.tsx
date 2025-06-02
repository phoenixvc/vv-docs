import React from 'react';

interface SectionAnchorProps {
  id: string;
  className?: string;
}

export function SectionAnchor({ id, className = '' }: SectionAnchorProps) {
  return (
    <a
      href={`#${id}`}
      className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity ${className}`}
      aria-label={`Link to ${id} section`}
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          // Update URL without triggering navigation
          history.pushState({}, "", `#${id}`);
          // Scroll to element with offset for header
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }}
    >
      <span className="inline-block w-4 h-4">🔗</span>
    </a>
  );
}

// Export the function as default export as well
export default SectionAnchor;
