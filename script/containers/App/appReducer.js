import * as actionTypes from './appActionTypes';

const defaultState = {
  spinnerVisible: false,
  ongoingRequests: 0
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
    default:
      return state;
  }
}

export default appReducer;
