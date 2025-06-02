import React from 'react';

interface TableBlockProps {
  headers?: string[] | null;
  data?: any[][] | null;
}

export const TableBlock = (props: TableBlockProps) => {
  // Defensive coding - assign defaults and handle everything as optional
  const headers = props?.headers || [];
  const data = props?.data || [];

  return (
    <div className="table-block">
      <table>
        <thead>
          <tr>
            {Array.isArray(headers) ? headers.map((header, index) => (
              <th key={index}>{header}</th>
            )) : null}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) ? data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Array.isArray(row) ? row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              )) : <td>Invalid row data</td>}
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
};

export default TableBlock;