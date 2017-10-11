import channels from '../../app/reducers/channels';
import actionTypes from '../../app/constants/actionTypes';
import ChannelType from '../../app/dataTypes/channelType';

describe('channels reducer', () => {
  it('should return the initial state', () => {
    expect(channels(undefined, {})).toEqual({
      byId: {},
      allIds: [],
      activeId: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_CHANNELS_REQUEST', () => {
    const action = { type: actionTypes.FETCH_CHANNELS_REQUEST };
    expect(channels(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      activeId: '',
      isFetching: true,
      error: false
    });
  });

  it('should handle FETCH_CHANNELS_SUCCESS', () => {
    const state = {
      byId: {},
      allIds: [],
      activeId: '',
      isFetching: true,
      error: false
    };
    const action = {
      type: actionTypes.FETCH_CHANNELS_SUCCESS,
      payload: [
        { id: 'UCyIe-61Y8C4_o-zZCtO4ETQ' },
        { id: 'UCO1cgjhGzsSYb1rsB4bFe4Q' }
      ]
    };

    ChannelType.from = jest.fn(item => item);

    expect(channels(state, action)).toEqual({
      byId: {
        'UCyIe-61Y8C4_o-zZCtO4ETQ': {
          id: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
        },
        'UCO1cgjhGzsSYb1rsB4bFe4Q': {
          id: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
        }
      },
      allIds: [
        'UCyIe-61Y8C4_o-zZCtO4ETQ',
        'UCO1cgjhGzsSYb1rsB4bFe4Q'
      ],
      activeId: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_CHANNELS_FAILURE', () => {
    const state = {
      byId: {},
      allIds: [],
      activeId: '',
      isFetching: true,
      error: false
    };
    const action = { type: actionTypes.FETCH_CHANNELS_FAILURE };
    expect(channels(state, action)).toEqual({
      byId: {},
      allIds: [],
      activeId: '',
      isFetching: false,
      error: true
    });
  });

  it('should handle UPDATE_ACTIVE_CHANNEL', () => {
    const state = {
      byId: {
        'UCyIe-61Y8C4_o-zZCtO4ETQ': {
          id: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
        },
        'UCO1cgjhGzsSYb1rsB4bFe4Q': {
          id: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
        }
      },
      allIds: [
        'UCyIe-61Y8C4_o-zZCtO4ETQ',
        'UCO1cgjhGzsSYb1rsB4bFe4Q'
      ],
      activeId: 'UCyIe-61Y8C4_o-zZCtO4ETQ',
      isFetching: false,
      error: false
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
    };
    expect(channels(state, action)).toEqual({
      byId: {
        'UCyIe-61Y8C4_o-zZCtO4ETQ': {
          id: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
        },
        'UCO1cgjhGzsSYb1rsB4bFe4Q': {
          id: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
        }
      },
      allIds: [
        'UCyIe-61Y8C4_o-zZCtO4ETQ',
        'UCO1cgjhGzsSYb1rsB4bFe4Q'
      ],
      activeId: 'UCO1cgjhGzsSYb1rsB4bFe4Q',
      isFetching: false,
      error: false
    });
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(channels(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      activeId: '',
      isFetching: false,
      error: false
    });
  });
});
