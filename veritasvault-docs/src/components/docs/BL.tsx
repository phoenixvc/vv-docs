import React, { ReactNode } from 'react';

// This is a placeholder for the BL component referenced in finmodelling-first-phase
interface BLProps {
  children?: ReactNode;
  [key: string]: any; // Allow any other props
}

export const BL = (props: BLProps) => {
  const { children, ...rest } = props;
  return (
    <div className="bl-component" {...rest}>
      {children}
    </div>
  );
};

export default BL;