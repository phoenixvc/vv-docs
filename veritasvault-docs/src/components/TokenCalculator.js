import React from 'react';

export function TokenCalculator(props) {
  return (
    <div className="token-calculator" style={{
      border: '1px solid #ddd',
      padding: '15px',
      margin: '15px 0',
      background: '#f5f5f5',
      borderRadius: '5px'
    }}>
      <h3>Token Calculator</h3>
      <div>{props.children || 'Token calculator placeholder'}</div>
    </div>
  );
}

export default TokenCalculator;