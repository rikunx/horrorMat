import * as actionTypes from './playerMatActionTypes';

import * as appActions from '../App/appActions';
import * as toastActions from '../Toast/toastActions';

export function downloadSession(sessionId) {
  return async dispatch => {
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
  };
}

export function createSession(props) {
  return async dispatch => {
    dispatch(appActions.showSpinner());
    dispatch({
      type: actionTypes.CreatingSession
    });

    try {
      const response = await fetch('/session', { method: 'post' });
      const session = await response.json();
      const sessionId = session.insertedId;
      dispatch({
        type: actionTypes.CreatedSession,
        sessionId
      });

      // Navigate to newly created session
      props.history.push({
        pathname: `/session/${sessionId}`
      });

      // Download the session
      await dispatch(downloadSession(sessionId));
    } catch (error) {
      console.error(error);
      toastActions.show(error.message, true);
    } finally {
      dispatch(appActions.hideSpinner());
    }
  };
}

export function undo() {
  return {
    type: actionTypes.Undo
  };
}
export function redo() {
  return {
    type: actionTypes.Redo
  };
}
