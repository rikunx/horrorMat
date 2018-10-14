import { connect } from 'react-redux';

import * as actions from './chooseCharacterActions';
import CharacterList from '../../components/characterList/characterList';

function mapStateToProps(state) {
    return {
        ...state.choose
    };
}

function mapDispatchToProps(dispatch) {
    dispatch(actions.downloadCharacters());
    return {
    };
}

const ChooseCharacterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacterList);

export default ChooseCharacterContainer;
