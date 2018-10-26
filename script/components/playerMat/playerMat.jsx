import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';

import RollContainer from '../../containers/Roll/rollContainer';

import { Attributes } from '../../enum';

const generateProfilePicPath = imageName => {
  if (imageName) return `../../../images/character_profiles/${imageName}`;
  return '';
};
const PlayerMat = ({
  name,
  occupation,
  image,
  health,
  sanity,
  lore,
  influence,
  observation,
  strength,
  will,
  improvements,
  fullscreen,
  openFullscreen,
  closeFullscreen,
  roll
}) => (
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
    <div id="stats-area">
      <div id="physiological-index-area">
        <div className="physiological-index">
          <div className="health eldritch-icon">K</div>
          <div className="stat">{health}</div>
        </div>
        <div className="physiological-index">
          <div className="sanity eldritch-icon">L</div>
          <div className="stat">{sanity}</div>
        </div>
      </div>
      <div id="attributes">
        <div className="attribute-container">
          <div className="attribute-label">Lore</div>
          <div className="lore eldritch-icon">A</div>
          <div className="stat">{lore}</div>
          <div className="improvement-stat">{improvements.lore}</div>
        </div>
        <div className="attribute-container">
          <div className="attribute-label">Influence</div>
          <div className="influence eldritch-icon">S</div>
          <div className="stat">{influence}</div>
          <div className="improvement-stat">{improvements.influence}</div>
        </div>
        <div className="attribute-container">
          <div className="attribute-label">Observation</div>
          <div className="observation eldritch-icon">D</div>
          <div className="stat">{observation}</div>
          <div className="improvement-stat">{improvements.observation}</div>
        </div>
        <div className="attribute-container" onClick={() => roll(Attributes.STRENGTH)}>
          <div className="attribute-label">Strength</div>
          <div className="strength eldritch-icon">F</div>
          <div className="stat">{strength}</div>
          <div className="improvement-stat">{improvements.strength}</div>
        </div>
        <div className="attribute-container">
          <div className="attribute-label">Will</div>
          <div className="will eldritch-icon">G</div>
          <div className="stat">{will}</div>
          <div className="improvement-stat">{improvements.will}</div>
        </div>
      </div>
    </div>
    <RollContainer />
  </div>
);

PlayerMat.propTypes = {
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  health: PropTypes.number.isRequired,
  sanity: PropTypes.number.isRequired,
  lore: PropTypes.number.isRequired,
  influence: PropTypes.number.isRequired,
  observation: PropTypes.number.isRequired,
  strength: PropTypes.number.isRequired,
  will: PropTypes.number.isRequired,
  improvements: PropTypes.object.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  openFullscreen: PropTypes.func.isRequired,
  closeFullscreen: PropTypes.func.isRequired,
  roll: PropTypes.func.isRequired
};

export default PlayerMat;
