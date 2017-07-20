import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/home';
import * as accessTokenActions from '../actions/accessToken';

function mapStateToProps(state) {
  return {
    accessToken: state.accessToken
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(accessTokenActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
