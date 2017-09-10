import channels from '../../app/reducers/channels';
import actionTypes from '../../app/constants/actionTypes';
import ChannelType from '../../app/dataTypes/channelType';

describe('channels reducer', () => {
  it('should return the initial state', () => {
    expect(channels(undefined, {})).toMatchSnapshot();
  });

  it('should handle FETCH_CHANNELS_REQUEST', () => {
    const action = { type: actionTypes.FETCH_CHANNELS_REQUEST };
    expect(channels(undefined, action)).toMatchSnapshot();
  });

  it('should handle FETCH_CHANNELS_SUCCESS', () => {
    const state = channels(undefined, { type: actionTypes.FETCH_CHANNELS_REQUEST });
    const action = {
      type: actionTypes.FETCH_CHANNELS_SUCCESS,
      payload: [
        { id: 'UCyIe-61Y8C4_o-zZCtO4ETQ' },
        { id: 'UCO1cgjhGzsSYb1rsB4bFe4Q' }
      ]
    };

    ChannelType.from = jest.fn(item => item);

    expect(channels(state, action)).toMatchSnapshot();
  });

  it('should handle FETCH_CHANNELS_FAILURE', () => {
    const state = channels(undefined, { type: actionTypes.FETCH_CHANNELS_REQUEST });
    const action = { type: actionTypes.FETCH_CHANNELS_FAILURE };
    expect(channels(state, action)).toMatchSnapshot();
  });

  it('should handle UPDATE_ACTIVE_CHANNEL', () => {
    const state = channels(
      undefined,
      {
        type: actionTypes.FETCH_CHANNELS_SUCCESS,
        payload: [
          { id: 'UCyIe-61Y8C4_o-zZCtO4ETQ' },
          { id: 'UCO1cgjhGzsSYb1rsB4bFe4Q' }
        ]
      }
    );
    const action = {
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
    };

    ChannelType.from = jest.fn(item => item);

    expect(channels(state, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(channels(undefined, action)).toMatchSnapshot();
  });
});
