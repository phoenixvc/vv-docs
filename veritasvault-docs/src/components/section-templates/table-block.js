import React from 'react';

export function TableBlock({ title, children }) {
  return (
    <div className="table-block">
      {title && <h3>{title}</h3>}
      <div className="table-content">
        {children}
      </div>
    </div>
  );
}