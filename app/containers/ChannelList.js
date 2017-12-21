import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as channelsActions from '../actions/channels';
import ChannelList from '../components/ChannelList';
import { getChannels } from '../reducers/index';

function mapStateToProps(state, ownProps) {
  return {
    channels: getChannels(state),
    isFetching: state.channels.isFetching,
    error: state.channels.error,
    activeChannelId: ownProps.activeChannelId,
    channelListIsOpen: ownProps.channelListIsOpen,
    toggleChannelList: ownProps.toggleChannelList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(channelsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
