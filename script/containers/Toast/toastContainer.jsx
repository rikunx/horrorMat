import { connect } from 'react-redux';

import Toast from '../../components/toast/toast';
import * as toast from './toastActions';

function mapStateToProps(state) {
  return state.toast;
}

function mapDispatchToProps(dispatch) {
  return {
    hide(_, reason) {
      if (reason !== 'clickaway') {
        dispatch(toast.hide());
      }
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast);
