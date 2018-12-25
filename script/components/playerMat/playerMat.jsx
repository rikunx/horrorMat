import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';

import RollContainer from '../../containers/Roll/rollContainer';

import { Attributes } from '../../enum';

import Passport from './passport';
import PhysiologicalIndex from './physiologicalIndex';
import Stamp from './stamp';

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
  promptRoll
}) => (
  <div id="player-mat">
    <Passport>
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
        <div id="profile-pic-content">
          <div id="profile-placeholder">
            <div id="profile-pic">
              <img src={generateProfilePicPath(image)} />
            </div>
          </div>
        </div>
        <div id="profile-info">
          <div className="profile-label">NAME OF BEARER</div>
          <hr />
          <div id="player-name">{name}</div>
          <div className="profile-label">OCCUPATION</div>
          <hr />
          <div id="player-occupation">{occupation}</div>
          <div id="physiological-index-area">
            <div className="physiological-index">
              <div className="index-label">
                <div>PHYSIOLOGICAL INDEX</div>
              </div>
              <PhysiologicalIndex letter="K" type="health" value={health} />
            </div>
            <div className="physiological-index">
              <div className="index-label">
                <div>PHYSIOLOGICAL INDEX</div>
              </div>
              <PhysiologicalIndex letter="L" type="sanity" value={sanity} />
            </div>
          </div>
        </div>
        <div id="actions">
          <div>
            <div className="label">DISTINGUISHING FEATURES AND ABILITIES</div>
            <hr />
            <div>Regular Roll</div>
            <div>Resolve Spell (-1, 0, +1)</div>
            <div>Reckoning</div>
          </div>
          <div>
            <div className="label">ITEMS TO DECLARE</div>
            <hr />
            <div>Assets</div>
            <div>Clues</div>
          </div>
        </div>
      </div>
      <div id="stats-area">
        <div id="attributes">
          <div
            className="attribute-container lore"
            onClick={() => promptRoll(Attributes.LORE, lore, improvements.lore)}
          >
            <div className="attribute-label">Lore</div>
            <Stamp letter="A" value={lore} improvement={improvements.lore} />
          </div>
          <div
            className="attribute-container influence"
            onClick={() => promptRoll(Attributes.INFLUENCE, influence, improvements.influence)}
          >
            <div className="attribute-label">Influence</div>
            <Stamp letter="S" value={influence} improvement={improvements.influence} />
          </div>
          <div
            className="attribute-container observation"
            onClick={() => promptRoll(Attributes.OBSERVATION, observation, improvements.observation)}
          >
            <div className="attribute-label">Observation</div>
            <Stamp letter="D" value={observation} improvement={improvements.observation} />
          </div>
          <div
            className="attribute-container strength"
            onClick={() => promptRoll(Attributes.STRENGTH, strength, improvements.strength)}
          >
            <div className="attribute-label">Strength</div>
            <Stamp letter="F" value={strength} improvement={improvements.strength} />
          </div>
          <div
            className="attribute-container will"
            onClick={() => promptRoll(Attributes.WILL, will, improvements.will)}
          >
            <div className="attribute-label">Will</div>
            <Stamp letter="G" value={will} improvement={improvements.will} />
          </div>
        </div>
      </div>
      <RollContainer />
    </Passport>
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
  promptRoll: PropTypes.func.isRequired
};

export default PlayerMat;
