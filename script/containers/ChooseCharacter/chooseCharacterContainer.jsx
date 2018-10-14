import { connect } from 'react-redux';

import * as actions from './chooseCharacterActions';
import CharacterList from '../../components/characterList/characterList';

function mapStateToProps(state) {
    return {
        ...state.choose
    };
}

function mapDispatchToProps(dispatch) {
    return {
        downloadCharacters() {
            dispatch(actions.downloadCharacters());
        }
    };
}

const ChooseCharacterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacterList);

export default ChooseCharacterContainer;
