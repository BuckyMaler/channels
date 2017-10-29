import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LeftColumn from '../components/LeftColumn';
import * as channelsActions from '../actions/channels';
import { getActiveChannel, getChannels } from '../reducers/index';

function mapStateToProps(state) {
  return {
    activeChannel: getActiveChannel(state),
    channels: getChannels(state),
    isFetching: state.channels.isFetching,
    error: state.channels.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(channelsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftColumn);
