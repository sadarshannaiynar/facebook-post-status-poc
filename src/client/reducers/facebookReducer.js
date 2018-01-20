import actions from '../constants/actionTypes';

const defaultState = {
  isPosting: false,
  success: false,
  message: '',
  fail: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_STATUS:
      return { ...defaultState };
    case actions.POST_STATUS_SUCCESS:
      return { ...state, success: true, message: action.payload };
    case actions.POST_STATUS_FAIL:
      return { ...state, fail: true, message: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
