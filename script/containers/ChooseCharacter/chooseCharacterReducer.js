import * as actions from './chooseCharacterActionTypes';

const defaultState = {
    characters: []
};

function charactersReducer(state = defaultState, action) {
    switch (action.type) {
        case actions.DownloadedCharacters:
            return {
                ...state,
                characters: action.characters
            };
        default:
            return state;
    }
}

export default charactersReducer;