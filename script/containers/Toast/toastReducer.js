import * as Toast from './toastActionTypes';

const initialState = {
  open: false,
  message: '',
  isError: true,
  hideDelay: 10000
};

function toastReducer(state = initialState, action) {
  switch (action.type) {
    case Toast.Show: {
      const { hideDelay } = action;
      return {
        ...state,
        open: true,
        message: action.message,
        isError: action.isError,
        hideDelay: typeof hideDelay !== 'undefined' && hideDelay !== null ? hideDelay : initialState.hideDelay
      };
    }
    case Toast.Hide:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}

export default toastReducer;
