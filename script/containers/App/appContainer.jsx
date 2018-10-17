import { connect } from 'react-redux';

import * as actions from './appActions';
import App from '../../components/appWrapper';

function mapStateToProps(state) {
    return {
        ...state.app
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        initialize() {
            dispatch(actions.initialize(props));
        }
    };
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
