import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  className?: string;
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  header?: ReactNode;
}

export const Card = ({
  className,
  children,
  title,
  description,
  footer,
  header,
  ...props
}: CardProps) => {
  return (
    <div 
      className={clsx(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {header && <div className="flex flex-col space-y-1.5 p-6">{header}</div>}
      {(title || description) && (
        <div className="flex flex-col space-y-1.5 p-6">
          {title && <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="p-6 pt-0">{children}</div>
      {footer && <div className="flex items-center p-6 pt-0">{footer}</div>}
    </div>
  );
};

export const CardHeader = ({ className, ...props }: { className?: string; [key: string]: any }) => (
  <div className={clsx("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: { className?: string; [key: string]: any }) => (
  <h3 className={clsx("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);

export const CardDescription = ({ className, ...props }: { className?: string; [key: string]: any }) => (
  <p className={clsx("text-sm text-muted-foreground", className)} {...props} />
);

export const CardContent = ({ className, ...props }: { className?: string; [key: string]: any }) => (
  <div className={clsx("p-6 pt-0", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: { className?: string; [key: string]: any }) => (
  <div className={clsx("flex items-center p-6 pt-0", className)} {...props} />
);

export default Card;