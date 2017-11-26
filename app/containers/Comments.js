import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Comments from '../components/Comments';
import * as commentsActions from '../actions/comments';
import { getComments } from '../reducers/index';

function mapStateToProps(state) {
  return {
    activeVideo: state.activeVideo,
    comments: getComments(state),
    isFetching: state.comments.isFetching,
    error: state.comments.error,
    pageToken: state.comments.pageToken
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
