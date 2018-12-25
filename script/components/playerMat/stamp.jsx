import React from 'react';
import PropTypes from 'prop-types';

import AttributeCircle from './attributeCircle';

const Stamp = ({ letter, value, improvement }) => (
  <div className="stamp-container">
    <div className="stamp">
      <div className="inner-stamp">
        <div className="eldritch-icon">
          <div className="inner-circle">
            <span>{letter}</span>
          </div>
        </div>
        <AttributeCircle>{value}</AttributeCircle>
        <div className="improvement-stat">{improvement}</div>
      </div>
    </div>
  </div>
);

Stamp.propTypes = {
  letter: PropTypes.string.isRequired,
  improvement: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default Stamp;
