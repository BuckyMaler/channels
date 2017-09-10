import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as accessTokenActions from '../actions/accessToken';
import * as channelsActions from '../actions/channels';

function mapStateToProps(state) {
  return {
    accessToken: state.accessToken
  };
}

const actions = {
  ...accessTokenActions,
  ...channelsActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
