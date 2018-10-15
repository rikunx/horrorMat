import { connect } from 'react-redux';

import * as actions from './playerMatActions';
import PlayerMat from '../../components/playerMat/playerMat';

function mapStateToProps(state) {
    const matState = state.mat;
    return {
        inventory: matState.get('inventory'),
        session: matState.get('session')
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        getSession() {
            dispatch(actions.createSession(props));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerMat);
