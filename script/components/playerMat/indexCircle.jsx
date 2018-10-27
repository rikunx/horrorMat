import React from 'react';

const NumberCircle = ({ children }) => (
  <div className="stat">
    <div className="inner-circle">
      <span>{children}</span>
    </div>
  </div>
);

NumberCircle.propTypes = {};

export default NumberCircle;
