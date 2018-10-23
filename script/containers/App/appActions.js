import * as actionTypes from './appActionTypes';

import * as playerMatActions from '../PlayerMat/playerMatActions';
import * as chooseActions from '../ChooseCharacter/chooseCharacterActions';

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen(elem) {
  if (elem.exitFullscreen) {
    elem.exitFullscreen();
  } else if (elem.mozCancelFullScreen) {
    /* Firefox */
    elem.mozCancelFullScreen();
  } else if (elem.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitExitFullscreen();
  } else if (elem.msExitFullscreen) {
    /* IE/Edge */
    elem.msExitFullscreen();
  }
}

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

export function openFullScreen() {
  return dispatch => {
    dispatch({ type: actionTypes.Fullscreen });
    openFullscreen(document.documentElement);

    function exitHandler() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        dispatch({ type: actionTypes.CloseFullscreen });
        document.removeEventListener('webkitfullscreenchange', exitHandler);
        document.removeEventListener('mozfullscreenchange', exitHandler);
        document.removeEventListener('fullscreenchange', exitHandler);
        document.removeEventListener('MSFullscreenChange', exitHandler);
      }
    }
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);
  };
}

export function closeFullScreen() {
  return dispatch => {
    dispatch({ type: actionTypes.CloseFullscreen });
    closeFullscreen(document);
  };
}
