import { connect } from 'react-redux';

import * as actions from './rollActions';
import RollPad from '../../components/roll/roll';

function mapStateToProps(state) {
  return {
    ...state.roll
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    roll() {
      dispatch(actions.rolling(props.baseRoll));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RollPad);
