import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import '../css/index.styl'; // application stylesheet

import store from './store';

import AppContainer from './containers/App/appContainer';

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={AppContainer} />
    </Router>
  </Provider>
);

export default App;
