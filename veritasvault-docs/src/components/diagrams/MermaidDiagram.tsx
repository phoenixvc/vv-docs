import React, { JSX, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
  className?: string;
}

/**
 * Component for rendering Mermaid diagrams in documentation
 */
export default function MermaidDiagram({
  chart,
  caption,
  className = '',
}: MermaidDiagramProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize mermaid with default config
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
    
    // Render the diagram
    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);
  
  return (
    <div className={`mermaid-diagram-wrapper ${className}`}>
      <div className="mermaid" ref={ref}>
        {chart}
      </div>
      {caption && <p className="mermaid-caption">{caption}</p>}
    </div>
  );
}