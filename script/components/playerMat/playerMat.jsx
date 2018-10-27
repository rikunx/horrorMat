import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';

import RollContainer from '../../containers/Roll/rollContainer';

import { Attributes } from '../../enum';

import IndexCircle from './indexCircle';
import AttributeCircle from './attributeCircle';

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
  promptRoll,
  promptCombat
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
    <div id="physiological-index-area">
      <div className="physiological-index">
        <div className="index-label">
          <div>PHYSIOLOGICAL INDEX</div>
        </div>
        <div className="health index-value">
          <div className="eldritch-icon">K</div>
          <IndexCircle>{health}</IndexCircle>
        </div>
      </div>
      <div className="physiological-index">
        <div className="index-label">
          <div>PHYSIOLOGICAL INDEX</div>
        </div>
        <div className="sanity index-value">
          <div className="eldritch-icon">L</div>
          <IndexCircle>{sanity}</IndexCircle>
        </div>
      </div>
    </div>
    <div id="stats-area">
      <div id="attributes">
        <div className="attribute-container lore" onClick={() => promptRoll(Attributes.LORE)}>
          <div className="attribute-label">Lore</div>
          <div className="stamp-container">
            <div className="stamp">
              <div className="inner-stamp">
                <div className="eldritch-icon">
                  <div className="inner-circle">
                    <span>A</span>
                  </div>
                </div>
                <AttributeCircle>{lore}</AttributeCircle>
                <div className="improvement-stat">{improvements.lore}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="attribute-container influence" onClick={() => promptRoll(Attributes.INFLUENCE)}>
          <div className="attribute-label">Influence</div>
          <div className="stamp-container">
            <div className="stamp">
              <div className="inner-stamp">
                <div className="eldritch-icon">
                  <div className="inner-circle">
                    <span>S</span>
                  </div>
                </div>
                <AttributeCircle>{influence}</AttributeCircle>
                <div className="improvement-stat">{improvements.influence}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="attribute-container observation" onClick={() => promptRoll(Attributes.OBSERVATION)}>
          <div className="attribute-label">Observation</div>
          <div className="stamp-container">
            <div className="stamp">
              <div className="inner-stamp">
                <div className="eldritch-icon">
                  <div className="inner-circle">
                    <span>D</span>
                  </div>
                </div>
                <AttributeCircle>{observation}</AttributeCircle>
                <div className="improvement-stat">{improvements.observation}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="attribute-container strength" onClick={() => promptCombat(Attributes.STRENGTH)}>
          <div className="attribute-label">Strength</div>
          <div className="stamp-container">
            <div className="stamp">
              <div className="inner-stamp">
                <div className="eldritch-icon">
                  <div className="inner-circle">
                    <span>F</span>
                  </div>
                </div>
                <AttributeCircle>{strength}</AttributeCircle>
                <div className="improvement-stat">{improvements.strength}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="attribute-container will" onClick={() => promptCombat(Attributes.WILL)}>
          <div className="attribute-label">Will</div>
          <div className="stamp-container">
            <div className="stamp">
              <div className="inner-stamp">
                <div className="eldritch-icon">
                  <div className="inner-circle">
                    <span>G</span>
                  </div>
                </div>
                <AttributeCircle>{will}</AttributeCircle>
                <div className="improvement-stat">{improvements.will}</div>
              </div>
            </div>
          </div>
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
  promptRoll: PropTypes.func.isRequired,
  promptCombat: PropTypes.func.isRequired
};

export default PlayerMat;
