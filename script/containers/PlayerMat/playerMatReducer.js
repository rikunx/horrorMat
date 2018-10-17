import rigmarole from 'rigmarole';

import * as actionTypes from './playerMatActionTypes';
import * as chooseActionTypes from '../ChooseCharacter/chooseCharacterActionTypes';

const defaultState = {
  sessionId: null,
  matId: null,
  session: null,
  mat: {
    inventory: []
  }
};

function playerMatReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CreatedSession:
      return {
        ...state,
        sessionId: action.sessionId
      };
    case actionTypes.DownloadedSession: {
      const sessionData = action.session;
      const sessionId = sessionData._id;
      const session = Object.keys(sessionData)
        .filter(key => key !== '_id')
        .reduce((immutableSession, characterKey) => {
          Object.assign(immutableSession, { [characterKey]: new rigmarole(100) });
          immutableSession[characterKey].set('mat', sessionData[characterKey]);
          return immutableSession;
        }, {});
      return {
        ...state,
        sessionId,
        session
      };
    }
    case chooseActionTypes.ChooseCharacter: {
      const characterId = action.characterId;
      const character = action.character;
      const session = state.session;
      if (!session[characterId]) {
        session[characterId] = new rigmarole(100);
        session[characterId].set('mat', character);
      }
      return {
        ...state,
        matId: characterId,
        session
      };
    }
    case actionTypes.Undo:
      return state.undo();
    case actionTypes.Redo:
      return state.redo();
    default:
      return state;
  }
}

export default playerMatReducer;
