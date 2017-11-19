import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/Search';
import * as searchActions from '../actions/search';
import * as activeVideoActions from '../actions/activeVideo';
import { getActiveChannel } from '../reducers/index';

function mapStateToProps(state) {
  return {
    activeChannel: getActiveChannel(state),
    query: state.search.query,
    results: state.search.results,
    isFetching: state.search.isFetching,
    error: state.search.error,
    pageToken: state.search.pageToken
  };
}

const actions = {
  ...searchActions,
  ...activeVideoActions
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
