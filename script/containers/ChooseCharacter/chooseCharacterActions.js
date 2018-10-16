import * as appActionTypes from '../App/appActionTypes';
import * as actionTypes from './chooseCharacterActionTypes';

export function downloadCharacters() {
    return async(dispatch) => {
        dispatch({
            type: actionTypes.DownloadingCharacters
        });

        const response = await fetch('/characters');
        const characters = await response.json();

        dispatch({
            type: actionTypes.DownloadedCharacters,
            characters
        });
    }
}

export function chooseCharacter(characterId, props) {
    return async(dispatch, getState) => {
        const { choose, app } = getState();
        const character = choose.characters.find(character => character._id === characterId);

        const sessionId = app.sessionId;
        const session = app.session;
        if (session[character._id] == null) {
            try {
                const response = await fetch(`/session/${sessionId}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify({
                        characterId: character._id,
                        sessionData: character
                    })
                });
                await response.json();
            } catch (error) {
                console.error(error);
                return;
            }
        }
        dispatch({
            type: appActionTypes.ChooseCharacter,
            character
        });

        if (props.location.pathname !== `/session/${sessionId}/mat/${characterId}`) {
            props.history.push({
                pathname: `/session/${sessionId}/mat/${characterId}`
            })
        }
    }
}