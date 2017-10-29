import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as accessTokenActions from '../actions/accessToken';

function mapStateToProps(state) {
  return {
    token: state.accessToken.token,
    isFetching: state.accessToken.isFetching,
    error: state.accessToken.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(accessTokenActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
