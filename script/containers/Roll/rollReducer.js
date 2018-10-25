import * as actions from './chooseCharacterActionTypes';

const defaultState = {
  rolling: false,
  baseRoll: 0,
  clues: 0,
  abilities: [],
  inventory: []
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
