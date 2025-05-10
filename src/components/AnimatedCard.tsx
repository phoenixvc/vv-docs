import React, { useState, useEffect, ReactNode } from 'react';
import clsx from 'clsx';

interface AnimatedCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  delay?: number;
  animation?: 'fade' | 'slide' | 'pulse';
}

/**
 * AnimatedCard component for displaying content with animations
 * 
 * @example
 * ```jsx
 * <AnimatedCard 
 *   title="Architecture Overview" 
 *   description="Our system architecture explained"
 *   animation="slide"
 * >
 *   <p>Detailed content here...</p>
 * </AnimatedCard>
 * ```
 */
export function AnimatedCard({
  title,
  description,
  children,
  delay = 0,
  animation = 'fade'
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide':
        return 'animate-slide-in';
      case 'pulse':
        return 'animate-pulse-slow';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={clsx(
        'card rounded-lg shadow-md p-6 bg-white dark:bg-gray-800 mb-8',
        isVisible ? getAnimationClass() : 'opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-light">{title}</h3>
      {description && <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>}
      <div className="prose dark:prose-invert">{children}</div>
    </div>
  );
}

/**
 * AnimatedSection component for creating sections with entrance animations
 */
export function AnimatedSection({
  children,
  className,
  animation = 'fade',
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'pulse';
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide':
        return 'animate-slide-in';
      case 'pulse':
        return 'animate-pulse-slow';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={clsx(
        className,
        isVisible ? getAnimationClass() : 'opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}