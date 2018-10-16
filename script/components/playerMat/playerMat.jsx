import React from 'react';
import PropTypes from 'prop-types';

const PlayerMat = ({session}) => {
    // {session.inventory.map(item => (<div key={item}>{item}</div>))}
    return (
        <div id="player-mat">

        </div>
    );
};

PlayerMat.propTypes = {
    session: PropTypes.object
};

export default PlayerMat;
