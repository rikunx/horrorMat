import React from 'react';
import PropTypes from 'prop-types';

const CharacterList = ({ characters, chooseCharacter }) => (
    <div id="character-list">
        <div id="header">
            <img src="images/eh-logo.png" /> Player Companion
        </div>
        <div className="container">
            <strong>Choose your character:</strong>
            {characters.map(character => (
                <div key={character._id}>
                    <a onClick={() => chooseCharacter(character._id)}>{character.name}</a>
                </div>
            ))}
        </div>
    </div>
);

CharacterList.propTypes = {
    characters: PropTypes.array.isRequired,
    downloadCharacters: PropTypes.func.isRequired,
    chooseCharacter: PropTypes.func.isRequired
};

export default CharacterList;
