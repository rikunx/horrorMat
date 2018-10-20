import * as actionTypes from './appActionTypes';

const defaultState = {
  spinnerVisible: false,
  ongoingRequests: 0,
  fullscreen: false
};

function appReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ShowSpinner:
      return {
        ...state,
        ongoingRequests: state.ongoingRequests + 1,
        spinnerVisible: true
      };
    case actionTypes.HideSpinner: {
      const ongoingRequests = state.ongoingRequests - 1;
      return {
        ...state,
        ongoingRequests,
        spinnerVisible: ongoingRequests > 0
      };
    }
    case actionTypes.Fullscreen:
      return {
        ...state,
        fullscreen: true
      };
    case actionTypes.CloseFullscreen:
      return {
        ...state,
        fullscreen: false
      };
    default:
      return state;
  }
}

export default appReducer;
