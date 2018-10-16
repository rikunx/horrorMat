import { connect } from 'react-redux';

import * as actions from './playerMatActions';
import PlayerMat from '../../components/playerMat/playerMat';

function mapStateToProps(state, props) {
    const matState = state.app;
    return {
        session: matState.session[props.match.params.characterId]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        undo() {
            dispatch(actions.undo());
        },
        redo() {
            dispatch(actions.redo());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerMat);
