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
    promptRoll(test) {
      dispatch(actions.promptTest(test));
    },
    closeRollPrompt() {
      dispatch(actions.closeRollPrompt());
    },
    setCombat(isCombat) {
      dispatch(actions.setCombat(isCombat));
    },
    useAbility(shouldUseAbility) {
      dispatch(actions.useAbility(shouldUseAbility));
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
