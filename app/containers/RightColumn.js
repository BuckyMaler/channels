import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RightColumn from '../components/RightColumn';
import * as ratingsActions from '../actions/ratings';
import * as activeVideoActions from '../actions/activeVideo';
import { getActiveVideoRating } from '../reducers/index';

function mapStateToProps(state) {
  return {
    activeVideo: state.activeVideo,
    rating: getActiveVideoRating(state)
  };
}

const actions = {
  ...ratingsActions,
  ...activeVideoActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RightColumn);
