import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import * as allAppReducers from '../../script/reducers';

export function createAppTestStore() {
  return createStore(combineReducers(allAppReducers), applyMiddleware(thunk));
}

export function createMockStoreForActionsTesting(initialState) {
  return configureStore([thunk])(initialState);
}
