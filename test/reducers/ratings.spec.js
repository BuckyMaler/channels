import actionTypes from '../../app/constants/actionTypes';
import ratings from '../../app/reducers/ratings';
import RatingType from '../../app/dataTypes/ratingType';

describe('ratings reducer', () => {
  it('should return initial state', () => {
    expect(ratings(undefined, {})).toEqual({
      byId: {},
      allIds: [],
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_RATINGS_SUCCESS', () => {
    RatingType.from = jest.fn(item => ({ id: item.videoId }));

    expect(ratings(
      undefined,
      {
        type: actionTypes.FETCH_RATINGS_SUCCESS,
        payload: [
          { videoId: '1' },
          { videoId: '2' }
        ]
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
      isFetching: false,
      error: false
    });

    expect(ratings(
      {
        byId: {
          1: {
            id: '1'
          }
        },
        allIds: ['1'],
        isFetching: false,
        error: false
      },
      {
        type: actionTypes.FETCH_RATINGS_SUCCESS,
        payload: [{ videoId: '2' }]
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
      isFetching: false,
      error: false
    });
  });

  it('should handle POST_RATING_SUCCESS', () => {
    RatingType.from = jest.fn(item => ({
      id: item.videoId,
      like: item.like,
      dislike: item.dislike
    }));

    const state = {
      byId: {
        1: {
          id: '1',
          like: false,
          dislike: false
        }
      },
      allIds: ['1'],
      isFetching: false,
      error: false
    };
    const action = {
      type: actionTypes.POST_RATING_SUCCESS,
      payload: {
        videoId: '1',
        like: true,
        dislike: false
      }
    };

    expect(ratings(state, action)).toEqual({
      byId: {
        1: {
          id: '1',
          like: true,
          dislike: false
        }
      },
      allIds: ['1'],
      isFetching: false,
      error: false
    });
  });

  it('should handle an unknown action type', () => {
    const action = { type: 'UNKNOWN' };

    expect(ratings(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      isFetching: false,
      error: false
    });
  });
});
