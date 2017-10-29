import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoList from '../components/VideoList';
import * as videosActions from '../actions/videos';
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(videosActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
