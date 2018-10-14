import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import '../css/index.styl'; // application stylesheet

import store from './store';

import ChooseCharacterContainer from './containers/ChooseCharacter/chooseCharacterContainer';

const App = () => (
    <Provider store={store}>
        <Router>
            <Route path='/' component={ChooseCharacterContainer} />
        </Router>
    </Provider>
);

export default App;
