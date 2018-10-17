import * as actionTypes from './appActionTypes';

import * as playerMatActions from '../PlayerMat/playerMatActions';
import * as chooseActions from '../ChooseCharacter/chooseCharacterActions';

export function initialize(props) {
    return async(dispatch, getState) => {
        await dispatch(chooseActions.downloadCharacters());

        const sessionIdParam = /session\/([^/]+)/.exec(props.location.pathname);
        let sessionId = sessionIdParam ? sessionIdParam[1] : null;
        // If session is not present in the URL, create a new one
        if (sessionId === null) {
            await dispatch(playerMatActions.createSession());

            sessionId = getState().mat.sessionId;
            // Navigate to newly created session
            props.history.push({
                pathname: `/session/${sessionId}`
            });
        }

        // Download the session
        await dispatch(playerMatActions.downloadSession(sessionId));

        const matParam = /mat\/([^/]+)/.exec(props.location.pathname);
        const matId = matParam ? matParam[1] : null;
        // If mat ID is present in the URL, choose it
        if (matId) {
            await dispatch(chooseActions.chooseCharacter(matId, props));
        }
    }
}

export function showSpinner() {
    return {
        type: actionTypes.ShowSpinner
    };
}

export function hideSpinner() {
    return {
        type: actionTypes.HideSpinner
    };
}