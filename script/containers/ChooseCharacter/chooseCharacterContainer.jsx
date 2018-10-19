import { connect } from 'react-redux';

import * as actions from './chooseCharacterActions';
import * as appActions from '../App/appActions';
import CharacterList from '../../components/characterList/characterList';

function mapStateToProps(state) {
  return {
    ...state.choose
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    downloadCharacters() {
      dispatch(actions.downloadCharacters());
    },
    chooseCharacter(characterId) {
      dispatch(actions.chooseCharacter(characterId, props));
    },
    createNewSession() {
      dispatch(appActions.createSession(props));
    }
  };
}

const ChooseCharacterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterList);

export default ChooseCharacterContainer;
