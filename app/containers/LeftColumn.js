import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as channelsActions from '../actions/channels';
import LeftColumn from '../components/LeftColumn';
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
