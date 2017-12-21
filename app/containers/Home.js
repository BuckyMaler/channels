import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accessTokenActions from '../actions/accessToken';
import Home from '../components/Home';
import { getActiveChannel } from '../reducers/index';

function mapStateToProps(state) {
  return {
    token: state.accessToken.token,
    isFetching: state.accessToken.isFetching,
    error: state.accessToken.error,
    activeChannel: getActiveChannel(state),
    activeVideo: state.activeVideo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(accessTokenActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
