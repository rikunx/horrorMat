import appReducer from '../containers/App/appReducer';
import toastReducer from '../containers/Toast/toastReducer';
import chooseCharacterReducer from '../containers/ChooseCharacter/chooseCharacterReducer';
import playerMatReducer from '../containers/PlayerMat/playerMatReducer';
import rollReducer from '../containers/Roll/rollReducer';

export const app = appReducer;
export const toast = toastReducer;
export const choose = chooseCharacterReducer;
export const mat = playerMatReducer;
export const roll = rollReducer;
