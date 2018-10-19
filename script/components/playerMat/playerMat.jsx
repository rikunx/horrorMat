import React from 'react';
import PropTypes from 'prop-types';

const PlayerMat = ({ mat }) => (
  <div id="player-mat">
    <div id="profile-placeholder">
      <div id="profile-pic" />
    </div>
  </div>
);

PlayerMat.propTypes = {
  mat: PropTypes.object.isRequired
};

export default PlayerMat;
