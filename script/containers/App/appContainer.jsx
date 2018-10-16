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
        getSession() {
            dispatch(actions.createSession(props));
        }
    };
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
