import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoList from '../components/VideoList';
import * as videosActions from '../actions/videos';
import * as activeVideoActions from '../actions/activeVideo';
import { getVideos } from '../reducers/index';

function mapStateToProps(state) {
  return {
    channelId: state.channels.activeId,
    videos: getVideos(state),
    isFetching: state.videos.isFetching,
    error: state.videos.error,
    pageToken: state.videos.pageToken
  };
}

const actions = {
  ...videosActions,
  ...activeVideoActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
