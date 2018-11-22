import * as actionTypes from './chooseCharacterActionTypes';

import * as appActions from '../App/appActions';
import * as toastActions from '../Toast/toastActions';

export function downloadCharacters() {
  return async dispatch => {
    dispatch(appActions.showSpinner());
    dispatch({
      type: actionTypes.DownloadingCharacters
    });
    try {
      const response = await fetch('/characters');
      const characters = await response.json();

      dispatch({
        type: actionTypes.DownloadedCharacters,
        characters
      });
    } catch (error) {
      dispatch(toastActions.show(error.message, true));
    } finally {
      dispatch(appActions.hideSpinner());
    }
  };
}

export function chooseCharacter(characterId, props) {
  return async (dispatch, getState) => {
    const { choose, mat } = getState();
    const character = choose.characters.find(char => char._id === characterId);
    const sessionId = mat.sessionId;
    const session = mat.session;

    // If the character mat doesn't exist, update the session to contain the
    // base character data
    if (session[characterId] == null) {
      dispatch(appActions.showSpinner());
      Object.assign(character, {
        health: character.baseHealth,
        sanity: character.baseSanity,
        improvements: {
          lore: 0,
          influence: 0,
          observation: 0,
          strength: 0,
          will: 0
        }
      });
      try {
        const response = await fetch(`/session/${sessionId}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json'
          },
          body: JSON.stringify({
            characterId,
            sessionData: character
          })
        });
        await response.json();
      } catch (error) {
        dispatch(toastActions.show(error.message, true));
      } finally {
        dispatch(appActions.hideSpinner());
      }
    }

    dispatch({
      type: actionTypes.ChooseCharacter,
      character,
      characterId
    });

    if (props.location.pathname !== `/session/${sessionId}/mat/${characterId}`) {
      props.history.push({
        pathname: `/session/${sessionId}/mat/${characterId}`
      });
    }
  };
}
