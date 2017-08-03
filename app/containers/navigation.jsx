import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from '../components/navigation/navigation';
import * as toggleActions from '../actions/toggle';
import * as channelListActions from '../actions/channelList';
import * as channelActions from '../actions/channel';

function mapStateToProps(state) {
  return {
    toggle: state.toggle,
    searchBar: state.searchBar,
    channelList: state.channelList
  };
}

const actions = {
  ...toggleActions,
  ...channelListActions,
  ...channelActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
