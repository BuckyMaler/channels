import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activeVideoActions from '../actions/activeVideo';
import * as searchActions from '../actions/search';
import Search from '../components/Search';
import { getActiveChannel } from '../reducers/index';

function mapStateToProps(state) {
  return {
    activeChannel: getActiveChannel(state),
    query: state.search.query,
    results: state.search.results,
    pageToken: state.search.pageToken,
    isFetching: state.search.isFetching,
    error: state.search.error
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
