import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentsActions from '../actions/comments';
import Comments from '../components/Comments';
import { getComments } from '../reducers/index';

function mapStateToProps(state, ownProps) {
  return {
    comments: getComments(state),
    pageToken: state.comments.pageToken,
    isFetching: state.comments.isFetching,
    error: state.comments.error,
    activeVideoId: ownProps.activeVideoId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commentsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
