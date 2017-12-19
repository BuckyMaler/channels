import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentsActions from '../actions/comments';
import Comments from '../components/Comments';
import { getComments } from '../reducers/index';

function mapStateToProps(state) {
  return {
    activeVideo: state.activeVideo,
    comments: getComments(state),
    pageToken: state.comments.pageToken,
    isFetching: state.comments.isFetching,
    error: state.comments.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
