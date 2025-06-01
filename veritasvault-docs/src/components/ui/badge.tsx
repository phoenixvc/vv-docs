import React from 'react';
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "primary" | "secondary";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-secondary/50 text-foreground",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    secondary: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

// For compatibility with the import in section-level components
export { Badge };

// For use with variants if needed
export const badgeVariants = (variant: BadgeProps["variant"]) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-secondary/50 text-foreground",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    secondary: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };
  
  return cn(
    "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold",
    variantClasses[variant || "default"]
  );
};