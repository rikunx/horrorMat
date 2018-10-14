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