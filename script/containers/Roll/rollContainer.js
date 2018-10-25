import { connect } from 'react-redux';

import * as actions from './playerMatActions';
import * as appActions from '../App/appActions';
import PlayerMat from '../../components/playerMat/playerMat';

function mapStateToProps(state) {
  return {
    ...state.roll
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
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerMat);
