import React from 'react';
import PropTypes from 'prop-types';

const AttributeCircle = ({ children }) => (
  <div className="stat-container">
    <div className="stat">
      <span>{children}</span>
    </div>
  </div>
);

AttributeCircle.propTypes = {
  children: PropTypes.node.isRequired
};

export default AttributeCircle;
