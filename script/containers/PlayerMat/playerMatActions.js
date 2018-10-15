import * as actionTypes from './playerMatActionTypes';
import * as toastActions from '../Toast/toastActions';

export function createSession(props) {
    return async(dispatch) => {
        const sessionIdParam = /\?sessionId=(.+)/.exec(props.location.search);
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
                    pathname: props.location.pathname,
                    search: `?sessionId=${sessionId}`,
                    state: { some: "state" }
                })
            } catch (error) {
                console.error(error);
                toastActions.show(error.message, true);
            }
        }

        await dispatch(downloadSession(sessionId));
    }
}

export function downloadSession(sessionId) {
    return async(dispatch) => {
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

export function undo() {
    return {
        type: actionTypes.Undo
    }
}
export function redo() {
    return {
        type: actionTypes.Redo
    }
}