import { connect } from 'react-redux';

import * as actions from './playerMatActions';
import * as appActions from '../App/appActions';
import * as rollActions from '../Roll/rollActions';
import PlayerMat from '../../components/playerMat/playerMat';

function mapStateToProps(state, props) {
  const { fullscreen } = state.app;
  const matState = state.mat;
  const mat =
    matState.session && matState.session[props.match.params.characterId]
      ? matState.session[props.match.params.characterId].get('character')
      : {
          name: '',
          occupation: '',
          health: 0,
          sanity: 0,
          baseLore: 0,
          baseInfluence: 0,
          baseObservation: 0,
          baseStrength: 0,
          baseWill: 0,
          improvements: {},
          image: '',
          inventory: []
        };
  return {
    ...mat,
    fullscreen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    undo() {
      dispatch(actions.undo());
    },
    redo() {
      dispatch(actions.redo());
    },
    openFullscreen() {
      dispatch(appActions.openFullScreen());
    },
    closeFullscreen() {
      dispatch(appActions.closeFullScreen());
    },
    promptCombat(test) {
      dispatch(rollActions.promptCombat(test));
    },
    promptRoll(test) {
      dispatch(rollActions.promptRoll(test));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerMat);
