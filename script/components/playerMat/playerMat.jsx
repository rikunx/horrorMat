import React from 'react';
import PropTypes from 'prop-types';

class PlayerMat extends React.Component {
    componentDidMount() {
        this.props.getSession();
    }
    render() {
        const {inventory, session} = this.props;
        return (
            <div id="player-mat">
                {inventory.map(item => (<div key={item}>{item}</div>))}
            </div>
        );
    }
}

PlayerMat.propTypes = {
    inventory: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    getSession: PropTypes.func.isRequired
};

export default PlayerMat;
