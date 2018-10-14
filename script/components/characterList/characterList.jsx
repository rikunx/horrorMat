import React from 'react';
import PropTypes from 'prop-types';

import HeaderContainer from '../../containers/Header/headerContainer';

const CharacterList = ({characters}) => (
    <div id="character-list">
        <HeaderContainer />
        {characters.map(character => (<div>{character.name}</div>))}
    </div>
);

CharacterList.propTypes = {
    characters: PropTypes.array.isRequired
};

export default CharacterList;
