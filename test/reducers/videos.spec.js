import videos from '../../app/reducers/videos';
import actionTypes from '../../app/constants/actionTypes';
import VideoType from '../../app/dataTypes/videoType';

describe('video reducer', () => {
  it('should return initial state', () => {
    expect(videos(undefined, {})).toMatchSnapshot();
  });

  it('should handle FETCH_VIDEOS_REQUEST', () => {
    const action = { type: actionTypes.FETCH_VIDEOS_REQUEST };
    expect(videos(undefined, action)).toMatchSnapshot();
  });

  it('should handle FETCH_VIDEOS_SUCCESS', () => {
    VideoType.from = jest.fn(item => item);

    expect(
      videos(
        {
          byId: {},
          allIds: [],
          pageToken: '',
          isFetching: true,
          error: false
        },
        {
          type: actionTypes.FETCH_VIDEOS_SUCCESS,
          payload: {
            items: [
              { id: 'M8l2aGMjKHI' },
              { id: 'GcSACxUbqtg' }
            ],
            nextPageToken: 'CBQQAA'
          }
        }
      )
    ).toMatchSnapshot();

    expect(
      videos(
        {
          byId: {
            'M8l2aGMjKHI': {
              id: 'M8l2aGMjKHI'
            },
            'GcSACxUbqtg': {
              id: 'GcSACxUbqtg'
            }
          },
          allIds: [
            'M8l2aGMjKHI',
            'GcSACxUbqtg'
          ],
          pageToken: 'CBQQAA',
          isFetching: true,
          error: false
        },
        {
          type: actionTypes.FETCH_VIDEOS_SUCCESS,
          payload: {
            items: [
              { id: 'Flze-rwT7lM' },
              { id: 'L4TIM6W7u-M' }
            ],
            nextPageToken: 'CCgQAA'
          }
        }
      )
    ).toMatchSnapshot();
  });

  it('should handle FETCH_VIDEOS_FAILURE', () => {
    const state = {
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: true,
      error: false
    };
    const action = { type: actionTypes.FETCH_VIDEOS_FAILURE };
    expect(videos(state, action)).toMatchSnapshot();
  });

  it('should handle UPDATE_ACTIVE_CHANNEL', () => {
    const state = {
      byId: {
        'M8l2aGMjKHI': {
          id: 'M8l2aGMjKHI'
        },
        'GcSACxUbqtg': {
          id: 'GcSACxUbqtg'
        }
      },
      allIds: [
        'M8l2aGMjKHI',
        'GcSACxUbqtg'
      ],
      pageToken: 'CBQQAA',
      isFetching: false,
      error: false
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
    };
    expect(videos(state, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(videos(undefined, action)).toMatchSnapshot();
  });
});
