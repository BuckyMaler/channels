import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/home';
import * as accessTokenActions from '../actions/accessToken';
import * as channelListActions from '../actions/channelList';

function mapStateToProps(state) {
  return {
    accessToken: state.accessToken
  };
}

const actions = {
  ...accessTokenActions,
  ...channelListActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
