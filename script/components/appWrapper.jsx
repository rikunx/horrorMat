import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import { withRouter } from "react-router";

import ChooseCharacterContainer from '../containers/ChooseCharacter/chooseCharacterContainer';
import PlayerMatContainer from '../containers/PlayerMat/playerMatContainer';
class AppWrapper extends React.Component {
    componentDidMount() {
        this.props.getSession();
    }
    render() {
        return (
            <div>
                <Route exact path='/session/:sessionId' component={ChooseCharacterContainer} />
                <Route exact path='/session/:sessionId/mat/:characterId' component={PlayerMatContainer} />
            </div>
        );
    }
};

AppWrapper.propTypes = {
    getSession: PropTypes.func.isRequired
};

export default withRouter(AppWrapper);
