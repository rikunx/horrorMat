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
    closeRollPrompt() {
      dispatch(actions.closeRollPrompt());
    },
    setModifier(modifier) {
      dispatch(actions.setModifier(modifier));
    },
    promptSituation() {
      dispatch(actions.promptSituation());
    },
    setSituation(situation) {
      dispatch(actions.setSituation(situation));
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
