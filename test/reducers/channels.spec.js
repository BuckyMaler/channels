import actionTypes from '../../app/constants/actionTypes';
import channels from '../../app/reducers/channels';
import ChannelType from '../../app/dataTypes/channelType';

describe('channels reducer', () => {
  it('should return initial state', () => {
    expect(channels(undefined, {})).toEqual({
      byId: {},
      allIds: [],
      activeId: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_CHANNELS_SUCCESS', () => {
    ChannelType.from = jest.fn(item => item);

    const action = {
      type: actionTypes.FETCH_CHANNELS_SUCCESS,
      payload: [
        { id: '1' },
        { id: '2' }
      ]
    };

    expect(channels(undefined, action)).toEqual({
      byId: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      allIds: ['1', '2'],
      activeId: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle UPDATE_ACTIVE_CHANNEL', () => {
    const state = {
      byId: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      allIds: ['1', '2'],
      activeId: '',
      isFetching: false,
      error: false
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: '1'
    };

    expect(channels(state, action)).toEqual({
      byId: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      allIds: ['1', '2'],
      activeId: '1',
      isFetching: false,
      error: false
    });
  });

  it('should handle an unknown action type', () => {
    const action = { type: 'UNKNOWN' };

    expect(channels(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      activeId: '',
      isFetching: false,
      error: false
    });
  });
});
