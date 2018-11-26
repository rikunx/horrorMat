import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';

const CharacterList = ({ characters, chooseCharacter, createNewSession }) => (
  <div id="character-list">
    <div id="header">
      <img src="images/eh-logo.png" /> Player Companion
      <Icon className="delete-icon" onClick={createNewSession}>
        delete_outline
      </Icon>
    </div>
    <div className="container">
      <h1>Choose your character:</h1>
      <div className="list">
        {characters.map(character => (
          <p key={character._id}>
            <a onClick={() => chooseCharacter(character._id)}>{character.name}</a>
          </p>
        ))}
      </div>
    </div>
  </div>
);

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired,
  chooseCharacter: PropTypes.func.isRequired,
  createNewSession: PropTypes.func.isRequired
};

export default CharacterList;
