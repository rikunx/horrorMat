import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';

const generateProfilePicPath = imageName => {
  if (imageName) return `../../../images/character_profiles/${imageName}`;
  return '';
};
const PlayerMat = ({ name, occupation, image, fullscreen, openFullscreen, closeFullscreen }) => (
  <div id="player-mat">
    <Icon
      className="fullscreen"
      onClick={() => {
        if (fullscreen) closeFullscreen();
        else openFullscreen();
      }}
      color="primary"
    >
      {!fullscreen ? 'fullscreen' : 'fullscreen_exit'}
    </Icon>
    <div id="profile">
      <div id="profile-placeholder">
        <div id="profile-pic">
          <img src={generateProfilePicPath(image)} />
        </div>
      </div>
      <div id="profile-info">
        <div className="profile-label">NAME OF BEARER</div>
        <hr />
        <div id="player-name">{name}</div>
        <div className="profile-label">OCCUPATION</div>
        <hr />
        <div id="player-occupation">{occupation}</div>
      </div>
    </div>
  </div>
);

PlayerMat.propTypes = {
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  openFullscreen: PropTypes.func.isRequired,
  closeFullscreen: PropTypes.func.isRequired
};

export default PlayerMat;
