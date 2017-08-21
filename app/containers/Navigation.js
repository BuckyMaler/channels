import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import * as statusActions from '../actions/status';
import * as channelListActions from '../actions/channelList';
import * as channelActions from '../actions/channel';

function mapStateToProps(state) {
  return {
    status: state.status,
    searchBar: state.searchBar,
    channelList: state.channelList
  };
}

const actions = {
  ...statusActions,
  ...channelListActions,
  ...channelActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
