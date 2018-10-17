import appReducer from '../containers/App/appReducer';
import toastReducer from '../containers/Toast/toastReducer';
import chooseCharacterReducer from '../containers/ChooseCharacter/chooseCharacterReducer';
import playerMatReducer from '../containers/PlayerMat/playerMatReducer';

export const app = appReducer;
export const toast = toastReducer;
export const choose = chooseCharacterReducer;
export const mat = playerMatReducer;
