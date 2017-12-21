import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activeVideoActions from '../actions/activeVideo';
import * as searchActions from '../actions/search';
import Search from '../components/Search';

function mapStateToProps(state, ownProps) {
  return {
    query: state.search.query,
    results: state.search.results,
    pageToken: state.search.pageToken,
    isFetching: state.search.isFetching,
    error: state.search.error,
    activeChannel: ownProps.activeChannel
  };
}

const actions = {
  ...activeVideoActions,
  ...searchActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
