import channelList from '../../app/reducers/channelList';
import actionTypes from '../../app/constants/actionTypes';
import ChannelType from '../../app/dataTypes/channelType';

describe('channelList reducer', () => {
  it('should return the initial state', () => {
    expect(channelList(undefined, {})).toMatchSnapshot();
  });

  it('should handle REQUEST_CHANNELS', () => {
    const action = { type: actionTypes.REQUEST_CHANNELS };
    expect(channelList(undefined, action)).toMatchSnapshot();
  });

  it('should handle RECEIVE_CHANNELS', () => {
    ChannelType.from = jest.fn().mockImplementation(json => new ChannelType(json.title));

    const stateBefore = channelList(undefined, { type: actionTypes.REQUEST_CHANNELS });
    const action = {
      type: actionTypes.RECEIVE_CHANNELS,
      payload: [
        { title: 'DevTips' },
        { title: 'Fun Fun Function' }
      ]
    };
    const stateAfter = channelList(stateBefore, action);

    expect(stateAfter.channels.length).toBe(action.payload.length);
  });

  it('should handle CHANNELS_ERROR', () => {
    const state = channelList(undefined, { type: actionTypes.REQUEST_CHANNELS });
    const action = { type: actionTypes.CHANNELS_ERROR };
    expect(channelList(state, action)).toMatchSnapshot();
  });

  it('should handle TOGGLE_CHANNEL_LIST', () => {
    const action = { type: actionTypes.TOGGLE_CHANNEL_LIST };
    expect(channelList(undefined, action)).toMatchSnapshot();
  });

  it('should handle UPDATE_ACTIVE_CHANNEL', () => {
    const state = {
      channels: [
        new ChannelType(
          'DevTips',
          'https://yt3.ggpht.com/photo.jpg',
          '292',
          '232937',
          false,
          '8ef09d6c-1eda-4e1e-aeec-e3ddff47dd45'
        ),
        new ChannelType(
          'Fun Fun Function',
          'https://yt3.ggpht.com/photo.jpg',
          '114',
          '98801',
          false,
          'bc91ca60-42dd-4694-bfbf-88edf8ca2805'
        )
      ],
      isFetching: false,
      error: false,
      isOpen: false
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: 'bc91ca60-42dd-4694-bfbf-88edf8ca2805'
    };
    expect(channelList(state, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(channelList(undefined, action)).toMatchSnapshot();
  });
});
