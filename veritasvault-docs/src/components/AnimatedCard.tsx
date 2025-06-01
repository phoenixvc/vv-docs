import React, { JSX, ReactNode } from 'react';

interface AnimatedCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  animated?: boolean;
}

/**
 * An animated card component for interactive displays
 */
export default function AnimatedCard({
  title,
  subtitle,
  children,
  className = '',
  onClick,
  animated = true,
}: AnimatedCardProps): JSX.Element {
  return (
    <div 
      className={`animated-card ${animated ? 'animated' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="animated-card-content">
        {title && <h3 className="animated-card-title">{title}</h3>}
        {subtitle && <p className="animated-card-subtitle">{subtitle}</p>}
        <div className="animated-card-body">{children}</div>
      </div>
    </div>
  );
}