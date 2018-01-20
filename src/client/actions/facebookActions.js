import axios from 'axios';
import actions from '../constants/actionTypes';

const postStart = () => ({
  type: actions.POST_STATUS,
});

const postSuccess = payload => ({
  type: actions.POST_STATUS_SUCCESS,
  payload,
});

const postFail = payload => ({
  type: actions.POST_STATUS_FAIL,
  payload,
});

const postStatus = message => (
  (dispatch) => {
    dispatch(postStart());
    axios.post('/postStatus', {
      message,
    }).then((res) => {
      dispatch(postSuccess(res.data));
    }).catch((error) => {
      dispatch(postFail(error));
    });
  }
);

export default {
  postStatus,
};
