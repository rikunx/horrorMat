import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import ChooseCharacterContainer from '../containers/ChooseCharacter/chooseCharacterContainer';
import PlayerMatContainer from '../containers/PlayerMat/playerMatContainer';

import Spinner from './spinner/spinner';

class AppWrapper extends React.Component {
  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <div id="container">
        <Spinner open={this.props.spinnerVisible} />
        <Route exact path="/session/:sessionId" component={ChooseCharacterContainer} />
        <Route exact path="/session/:sessionId/mat/:characterId" component={PlayerMatContainer} />
      </div>
    );
  }
}

AppWrapper.propTypes = {
  spinnerVisible: PropTypes.bool.isRequired,
  initialize: PropTypes.func.isRequired
};

export default withRouter(AppWrapper);
