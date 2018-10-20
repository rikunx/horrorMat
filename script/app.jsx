import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import '../css/index.styl'; // application stylesheet

import store from './store';

import ThemeWrapper from './components/themeWrapper';
import AppContainer from './containers/App/appContainer';

const App = () => (
  <Provider store={store}>
    <ThemeWrapper>
      <Router>
        <Route path="/" component={AppContainer} />
      </Router>
    </ThemeWrapper>
  </Provider>
);

export default App;
