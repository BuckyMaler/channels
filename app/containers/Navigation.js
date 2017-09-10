import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import * as channelsActions from '../actions/channels';
import { getChannels, getActiveChannel } from '../reducers/index';

function mapStateToProps(state) {
  return {
    channels: getChannels(state),
    activeChannel: getActiveChannel(state),
    isFetching: state.channels.isFetching,
    error: state.channels.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(channelsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
