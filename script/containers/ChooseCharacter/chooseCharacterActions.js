import * as actionTypes from './chooseCharacterActionTypes';

export function downloadCharacters() {
    return {
        type: actionTypes.DownloadingCharacters
    };
}
