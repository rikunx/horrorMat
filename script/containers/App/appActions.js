import * as actionTypes from './appActionTypes';

import * as playerMatActions from '../PlayerMat/playerMatActions';
import * as chooseActions from '../ChooseCharacter/chooseCharacterActions';

export function initialize(props) {
  return async dispatch => {
    await dispatch(chooseActions.downloadCharacters());

    const sessionIdParam = /session\/([^/]+)/.exec(props.location.pathname);
    const sessionId = sessionIdParam ? sessionIdParam[1] : null;
    // If session is not present in the URL, create a new one
    if (sessionId !== null) {
      // Download the session
      await dispatch(playerMatActions.downloadSession(sessionId));

      const matParam = /mat\/([^/]+)/.exec(props.location.pathname);
      const matId = matParam ? matParam[1] : null;
      // If mat ID is present in the URL, choose it
      if (matId) {
        await dispatch(chooseActions.chooseCharacter(matId, props));
      }
    } else {
      await dispatch(playerMatActions.createSession(props));
    }
  };
}

export function createSession(props) {
  return async dispatch => {
    await dispatch(playerMatActions.createSession(props));
  };
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
