import { connect } from 'react-redux';
import App from '../components/App';
import facebookActions from '../actions/facebookActions';

const mapStateToProps = state => ({
  message: state.facebookReducer.message,
});

const mapDispatchToProps = dispatch => ({
  postStatus: (message) => {
    dispatch(facebookActions.postStatus(message));
  },
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
