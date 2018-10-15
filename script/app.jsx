import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom'

import '../css/index.styl'; // application stylesheet

import store from './store';

import ChooseCharacterContainer from './containers/ChooseCharacter/chooseCharacterContainer';
import PlayerMatContainer from './containers/PlayerMat/playerMatContainer';

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path='/' component={ChooseCharacterContainer} />
                <Route path='/mat/:characterId' component={PlayerMatContainer} />
            </div>
        </Router>
    </Provider>
);

export default App;
