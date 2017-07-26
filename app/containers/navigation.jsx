import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from '../components/navigation/navigation';

function mapStateToProps(state) {
  return {
    toggle: state.toggle,
    searchBar: state.searchBar
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
