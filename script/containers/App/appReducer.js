import rigmarole from 'rigmarole';
import * as actionTypes from './appActionTypes';

const defaultState = {
    sessionId: '',
    session: {}
};

function appReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.DownloadedSession:
            {
                const sessionData = action.session;
                const sessionId = sessionData._id;
                const session = Object.keys(sessionData)
                    .filter(key => key !== '_id')
                    .reduce((immutableSession, characterKey) => {
                        immutableSession[characterKey] = new rigmarole(100)
                        immutableSession[characterKey].set('session', sessionData[characterKey])
                        return immutableSession;
                    }, {});
                return {
                    ...state,
                    sessionId,
                    session
                }
            }
        case actionTypes.ChooseCharacter:
            {
                const character = action.character;
                const session = state.session;
                if (!session[character._id]) {
                    session[character._id] = new rigmarole(100);
                    session[character._id].set('session', character);
                }
                return {
                    ...state,
                    session
                }
            }
        default:
            return state;
    }
}

export default appReducer;