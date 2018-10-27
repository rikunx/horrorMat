import { connect } from 'react-redux';

import * as actions from './rollActions';
import RollPad from '../../components/roll/roll';

function mapStateToProps(state) {
  return {
    ...state.roll
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeCombatPrompt() {
      dispatch(actions.closeCombatPrompt());
    },
    promptRoll(test, isCombat) {
      dispatch(actions.promptRoll(test, isCombat));
    },
    closeRollPrompt() {
      dispatch(actions.closeRollPrompt());
    },
    roll(numOfDice) {
      dispatch(actions.roll(numOfDice));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RollPad);
