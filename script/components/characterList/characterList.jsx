import React from 'react';
import PropTypes from 'prop-types';

import HeaderContainer from '../../containers/Header/headerContainer';

const CharacterList = ({characters}) => (
    <div id="character-list">
        <HeaderContainer />
        <div className="container">
            <strong>Choose your character:</strong>
            {characters.map(character => (<div key={character._id}>{character.name}</div>))}
        </div>
    </div>
);

CharacterList.propTypes = {
    characters: PropTypes.array.isRequired
};

export default CharacterList;
