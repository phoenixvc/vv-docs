import React, { ReactNode } from 'react';
import clsx from 'clsx';

// Table Root
export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto">
      <table className={clsx("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

// Table Header
export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={clsx("bg-muted/50", className)} {...props} />;
}

// Table Body
export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={clsx("[&_tr:last-child]:border-0", className)} {...props} />;
}

// Table Footer
export function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={clsx("bg-primary text-primary-foreground font-medium", className)} {...props} />;
}

// Table Row
export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={clsx("border-b transition-colors hover:bg-muted/50", className)} {...props} />;
}

// Table Head
export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={clsx("h-12 px-4 text-left align-middle font-medium text-muted-foreground", className)} {...props} />;
}

// Table Cell
export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={clsx("p-4 align-middle", className)} {...props} />;
}

// Table Caption
export function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={clsx("mt-4 text-sm text-muted-foreground", className)} {...props} />;
}

export default Table;