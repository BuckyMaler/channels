import ratings from '../../app/reducers/ratings';
import actionTypes from '../../app/constants/actionTypes';
import RatingType from '../../app/dataTypes/ratingType';

describe('ratings reducer', () => {
  it('should return the initial state', () => {
    expect(ratings(undefined, {})).toEqual({
      byId: {},
      allIds: [],
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_RATINGS_REQUEST', () => {
    const action = { type: actionTypes.FETCH_RATINGS_REQUEST };
    expect(ratings(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      isFetching: true,
      error: false
    });
  });

  it('should handle FETCH_RATINGS_SUCCESS', () => {
    const state = {
      byId: {},
      allIds: [],
      isFetching: true,
      error: false
    };
    const action = {
      type: actionTypes.FETCH_RATINGS_SUCCESS,
      payload: [{ videoId: 'XsFQEUP1MxI' }]
    };

    RatingType.from = jest.fn(item => item);

    expect(ratings(state, action)).toEqual({
      byId: {
        'XsFQEUP1MxI': {
          videoId: 'XsFQEUP1MxI'
        }
      },
      allIds: ['XsFQEUP1MxI'],
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_RATINGS_FAILURE', () => {
    const state = {
      byId: {},
      allIds: [],
      isFetching: true,
      error: false
    };
    const action = { type: actionTypes.FETCH_RATINGS_FAILURE };
    expect(ratings(state, action)).toEqual({
      byId: {},
      allIds: [],
      isFetching: false,
      error: true
    });
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(ratings(undefined, action)).toEqual({
      byId: {},
      allIds: [],
      isFetching: false,
      error: false
    });
  });
});
