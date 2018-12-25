import React from 'react';
import PropTypes from 'prop-types';

const PhysiologicalIndex = ({ letter, type, value }) => (
  <div className={`${type} index-value`}>
    <div className="eldritch-icon">{letter}</div>
    <div className="stat">
      <div className="inner-circle">
        <span>{value}</span>
      </div>
    </div>
  </div>
);

PhysiologicalIndex.propTypes = {
  letter: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default PhysiologicalIndex;
