import actionTypes from '../../app/constants/actionTypes';
import comments from '../../app/reducers/comments';
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

  it('should handle FETCH_COMMENTS_SUCCESS', () => {
    CommentType.from = jest.fn(item => item);

    expect(comments(
      undefined,
      {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        payload: {
          items: [
            { id: '1' },
            { id: '2' }
          ],
          nextPageToken: 'token'
        }
      }
    )).toEqual({
      byId: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      allIds: ['1', '2'],
      pageToken: 'token',
      isFetching: false,
      error: false
    });

    expect(comments(
      {
        byId: {
          1: {
            id: '1'
          }
        },
        allIds: ['1'],
        pageToken: 'token',
        isFetching: false,
        error: false
      },
      {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        payload: {
          items: [{ id: '2' }],
          nextPageToken: 'next token'
        }
      }
    )).toEqual({
      byId: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      allIds: ['1', '2'],
      pageToken: 'next token',
      isFetching: false,
      error: false
    });
  });

  it('should handle POST_COMMENT_SUCCESS', () => {
    CommentType.from = jest.fn(item => item);

    expect(comments(
      undefined,
      {
        type: actionTypes.POST_COMMENT_SUCCESS,
        payload: {
          id: '1'
        }
      }
    )).toEqual({
      byId: {
        1: {
          id: '1'
        }
      },
      allIds: ['1'],
      pageToken: '',
      isFetching: false,
      error: false
    });

    expect(comments(
      {
        byId: {
          1: {
            id: '1'
          }
        },
        allIds: ['1'],
        pageToken: '',
        isFetching: false,
        error: false
      },
      {
        type: actionTypes.POST_COMMENT_SUCCESS,
        payload: {
          id: '2',
        }
      }
    )).toEqual({
      byId: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      allIds: ['2', '1'],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle UPDATE_ACTIVE_VIDEO', () => {
    const state = {
      byId: {
        1: {
          id: '1'
        }
      },
      allIds: ['1'],
      pageToken: 'token',
      isFetching: false,
      error: false
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: {
        id: '1'
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

  it('should handle an unknown action type', () => {
    const action = { type: 'UNKNOWN' };

    expect(comments(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      pageToken: '',
      isFetching: false,
      error: false
    });
  });
});
