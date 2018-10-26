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
          lore: 0,
          influence: 0,
          observation: 0,
          strength: 0,
          will: 0,
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
    roll(test) {
      dispatch(rollActions.roll(test));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerMat);
