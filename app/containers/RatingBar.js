import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activeVideoActions from '../actions/activeVideo';
import * as ratingsActions from '../actions/ratings';
import RatingBar from '../components/RatingBar';
import { getActiveVideoRating } from '../reducers/index';

function mapStateToProps(state, ownProps) {
  return {
    rating: getActiveVideoRating(state),
    activeVideoId: ownProps.activeVideoId,
    likeCount: ownProps.likeCount,
    dislikeCount: ownProps.dislikeCount
  };
}

const actions = {
  ...activeVideoActions,
  ...ratingsActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingBar);
