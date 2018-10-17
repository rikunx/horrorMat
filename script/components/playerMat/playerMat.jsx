import React from 'react';
import PropTypes from 'prop-types';

const PlayerMat = ({ mat }) => (
  <div id="player-mat">
    {mat.inventory.map(item => (
      <div key={item}>{item}</div>
    ))}
  </div>
);

PlayerMat.propTypes = {
  session: PropTypes.object
};

export default PlayerMat;
