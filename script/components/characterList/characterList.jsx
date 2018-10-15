import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const CharacterList = ({characters}) => (
    <div id="character-list">
        <div id="header">
            <img src="images/eh-logo.png" /> Player Companion
        </div>
        <div className="container">
            <strong>Choose your character:</strong>
            {characters.map(character => {
                return (
                    <div key={character._id}>
                        <Link to={`/mat/${character._id}`}>{character.name}</Link>
                    </div>
                );
            })}
        </div>
    </div>
);

CharacterList.propTypes = {
    characters: PropTypes.array.isRequired
};

export default CharacterList;
