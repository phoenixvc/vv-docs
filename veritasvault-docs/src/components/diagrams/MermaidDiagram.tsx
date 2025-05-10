import React, { useState, useEffect } from 'react';
import Mermaid from '@theme/Mermaid';
import clsx from 'clsx';

interface MermaidDiagramProps {
  chart: string;
  title?: string;
  caption?: string;
  className?: string;
  animate?: boolean;
  animationDelay?: number;
}

/**
 * Enhanced Mermaid diagram component with animation support
 * 
 * @example
 * ```jsx
 * <MermaidDiagram
 *   title="System Architecture"
 *   caption="High-level overview of the VeritasVault architecture"
 *   animate={true}
 *   chart={`
 *     graph TD
 *       A[Client] --> B[API Gateway]
 *       B --> C[Auth Service]
 *       B --> D[Data Service]
 *       D --> E[(Database)]
 *   `}
 * />
 * ```
 */
export function MermaidDiagram({
  chart,
  title,
  caption,
  className,
  animate = true,
  animationDelay = 200
}: MermaidDiagramProps) {
  const [isVisible, setIsVisible] = useState(!animate);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, animationDelay);

      return () => clearTimeout(timer);
    }
  }, [animate, animationDelay]);

  return (
    <div className={clsx(
      'architecture-diagram-container my-8',
      className,
      animate && (isVisible ? 'animate-fade-in' : 'opacity-0')
    )}>
      {title && (
        <h4 className="text-lg font-semibold mb-4 text-center">{title}</h4>
      )}
      
      <div className="architecture-diagram overflow-hidden rounded-lg border dark:border-gray-700">
        <Mermaid chart={chart} />
      </div>
      
      {caption && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
}

export default MermaidDiagram;