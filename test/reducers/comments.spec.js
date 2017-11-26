import comments from '../../app/reducers/comments';
import actionTypes from '../../app/constants/actionTypes';
import CommentType from '../../app/dataTypes/commentType';

describe('comments reducer', () => {
  it('should return initial state', () => {
    expect(comments(undefined, {})).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_COMMENTS_REQUEST', () => {
    const action = { type: actionTypes.FETCH_COMMENTS_REQUEST };
    expect(comments(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: true,
      error: false
    });
  });

  it('should handle FETCH_COMMENTS_SUCCESS', () => {
    CommentType.from = jest.fn(item => item);

    expect(
      comments(
        {
          byId: {},
          allIds: [],
          pageToken: '',
          isFetching: true,
          error: false
        },
        {
          type: actionTypes.FETCH_COMMENTS_SUCCESS,
          payload: {
            items: [
              { id: 'z12sgfaakziic3eei23sjz3yxpfbhbybw04' },
              { id: 'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k' }
            ],
            nextPageToken: 'QURTSl'
          }
        }
      )
    ).toEqual({
      byId: {
        'z12sgfaakziic3eei23sjz3yxpfbhbybw04': {
          id: 'z12sgfaakziic3eei23sjz3yxpfbhbybw04'
        },
        'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k': {
          id: 'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k'
        }
      },
      allIds: [
        'z12sgfaakziic3eei23sjz3yxpfbhbybw04',
        'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k'
      ],
      pageToken: 'QURTSl',
      isFetching: false,
      error: false
    });

    expect(
      comments(
        {
          byId: {
            'z12sgfaakziic3eei23sjz3yxpfbhbybw04': {
              id: 'z12sgfaakziic3eei23sjz3yxpfbhbybw04'
            },
            'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k': {
              id: 'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k'
            }
          },
          allIds: [
            'z12sgfaakziic3eei23sjz3yxpfbhbybw04',
            'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k'
          ],
          pageToken: 'QURTSl',
          isFetching: true,
          error: false
        },
        {
          type: actionTypes.FETCH_COMMENTS_SUCCESS,
          payload: {
            items: [
              { id: 'z121ulvbpt2vt3qrl04chhbj4z32spyw120' },
              { id: 'z13pj1gx5ovotnyng23jhxcbwtmbwnbvy' }
            ],
            nextPageToken: '9pMXJJ'
          }
        }
      )
    ).toEqual({
      byId: {
        'z12sgfaakziic3eei23sjz3yxpfbhbybw04': {
          id: 'z12sgfaakziic3eei23sjz3yxpfbhbybw04'
        },
        'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k': {
          id: 'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k'
        },
        'z121ulvbpt2vt3qrl04chhbj4z32spyw120': {
          id: 'z121ulvbpt2vt3qrl04chhbj4z32spyw120'
        },
        'z13pj1gx5ovotnyng23jhxcbwtmbwnbvy': {
          id: 'z13pj1gx5ovotnyng23jhxcbwtmbwnbvy'
        }
      },
      allIds: [
        'z12sgfaakziic3eei23sjz3yxpfbhbybw04',
        'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k',
        'z121ulvbpt2vt3qrl04chhbj4z32spyw120',
        'z13pj1gx5ovotnyng23jhxcbwtmbwnbvy'
      ],
      pageToken: '9pMXJJ',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_COMMENTS_FAILURE', () => {
    const state = {
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: true,
      error: false
    };
    const action = { type: actionTypes.FETCH_COMMENTS_FAILURE };
    expect(comments(state, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: true
    });
  });

  it('should handle UPDATE_ACTIVE_VIDEO', () => {
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
      pageToken: '9pMXJJ',
      isFetching: false,
      error: false
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: {
        id: 'XsFQEUP1MxI',
        title: 'Unit testing in JavaScript Part 2 - Your first tests',
        thumbnail: 'https://i.ytimg.com/hqdefault.jpg',
        description: 'Today, we are continuing our journey on unit testing in JavaScript.',
        publishedAt: '6 days ago',
        viewCount: '10,276',
        likeCount: '625',
        dislikeCount: '2'
      }
    };
    expect(comments(state, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(comments(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });
});
