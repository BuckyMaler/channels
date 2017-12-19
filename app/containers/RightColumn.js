import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activeVideoActions from '../actions/activeVideo';
import * as ratingsActions from '../actions/ratings';
import RightColumn from '../components/RightColumn';
import { getActiveVideoRating } from '../reducers/index';

function mapStateToProps(state) {
  return {
    activeVideo: state.activeVideo,
    rating: getActiveVideoRating(state)
  };
}

const actions = {
  ...activeVideoActions,
  ...ratingsActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RightColumn);
