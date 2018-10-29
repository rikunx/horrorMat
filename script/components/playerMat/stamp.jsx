import React from 'react';
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

Stamp.propTypes = {};

export default Stamp;
