import * as appActions from '../App/appActionTypes';
import * as actions from './playerMatActionTypes';
import rigmarole from 'rigmarole';

const defaultState = new rigmarole(100);
defaultState.set('session', {});

function playerMatReducer(state = defaultState, action) {
    switch (action.type) {
        case actions.Undo:
            return state.undo();
        case actions.Redo:
            return state.redo();
        default:
            return state;
    }
}

export default playerMatReducer;