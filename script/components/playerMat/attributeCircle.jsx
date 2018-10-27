import React from 'react';

const AttributeCircle = ({ children }) => (
  <div className="stat-container">
    <div className="stat">
      <span>{children}</span>
    </div>
  </div>
);

AttributeCircle.propTypes = {};

export default AttributeCircle;
