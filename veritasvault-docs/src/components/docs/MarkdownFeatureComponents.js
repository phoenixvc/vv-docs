import React from 'react';

export function Highlight({ children, color }) {
  return (
    <span
      style={{
        backgroundColor: color || '#1877F2',
        borderRadius: '20px',
        color: '#fff',
        padding: '10px',
        cursor: 'pointer',
      }}
      onClick={() => {
        alert(`You clicked the color ${color} with label ${children}`);
      }}>
      {children}
    </span>
  );
}

// A special styles object for the docsaurus-integration-guide
export const styles = {
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  subheading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '24px',
    marginBottom: '12px',
  },
  paragraph: {
    marginBottom: '16px',
    lineHeight: '1.5',
  }
};

// Fix for the TokenCalculator
export function TokenCalculator(props) {
  return (
    <div className="token-calculator" style={{border: '1px solid #ccc', padding: '15px', borderRadius: '5px'}}>
      <h3>Token Calculator</h3>
      <div className="calculator-content">
        {props.children || 'This is a placeholder for the token calculator component.'}
      </div>
    </div>
  );
}

export default {
  Highlight,
  styles,
  TokenCalculator
};