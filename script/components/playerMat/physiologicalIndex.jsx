import React from 'react';

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

PhysiologicalIndex.propTypes = {};

export default PhysiologicalIndex;
