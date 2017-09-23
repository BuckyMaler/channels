import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LeftColumn from '../components/LeftColumn';
import * as channelsActions from '../actions/channels';
import * as videosActions from '../actions/videos';
import { getActiveChannel, getChannels, getVideos } from '../reducers/index';

function mapStateToProps(state) {
  return {
    activeChannel: getActiveChannel(state),
    channels: getChannels(state),
    isFetchingChannels: state.channels.isFetching,
    errorChannels: state.channels.error,
    videos: getVideos(state),
    isFetchingVideos: state.videos.isFetching,
    errorVideos: state.videos.error,
    pageToken: state.videos.pageToken
  };
}

const actions = {
  ...channelsActions,
  ...videosActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftColumn);
