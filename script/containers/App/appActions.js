import * as actionTypes from './appActionTypes';
import * as toastActions from '../Toast/toastActions';
import * as chooseActions from '../ChooseCharacter/chooseCharacterActions';

export function createSession(props) {
    return async(dispatch) => {
        const sessionIdParam = /session\/([^\/]+)/.exec(props.location.pathname);

        let sessionId = sessionIdParam ? sessionIdParam[1] : null;
        if (sessionId === null) {
            dispatch({
                type: actionTypes.CreatingSession
            });

            try {
                const response = await fetch('/session', { method: 'post' });
                const session = await response.json();

                sessionId = session.insertedIds[0];
                dispatch({
                    type: actionTypes.CreatedSession
                });

                props.history.push({
                    pathname: `/session/${sessionId}`
                })
            } catch (error) {
                console.error(error);
                toastActions.show(error.message, true);
            }
        }

        await dispatch(downloadSession(sessionId));

        const matParam = /mat\/([^\/]+)/.exec(props.location.pathname);
        let matId = matParam ? matParam[1] : null;
        if (matId) {
            await dispatch(chooseActions.chooseCharacter(matId, props));
        }
    }
}

export function downloadSession(sessionId) {
    return async(dispatch) => {
        await dispatch(chooseActions.downloadCharacters());
        dispatch({ type: actionTypes.DownloadingSession, sessionId });

        try {
            const response = await fetch(`/session/${sessionId}`);

            if (!response.ok) {
                throw new Error(await response.text());
            }
            const session = await response.json();
            dispatch({
                type: actionTypes.DownloadedSession,
                session
            });
        } catch (error) {
            toastActions.show(error, true);
        }
    }
}