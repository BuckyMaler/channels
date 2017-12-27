import actionTypes from '../../app/constants/actionTypes';
import accessToken from '../../app/reducers/accessToken';

describe('accessToken reducer', () => {
  it('should return initial state', () => {
    expect(accessToken(undefined, {})).toEqual({
      token: '',
      isFetching: false,
      error: false
    });
  });

  it('should handle FETCH_ACCESS_TOKEN_SUCCESS', () => {
    const action = {
      type: actionTypes.FETCH_ACCESS_TOKEN_SUCCESS,
      payload: 'token'
    };

    expect(accessToken(undefined, action)).toEqual({
      token: 'token',
      isFetching: false,
      error: false
    });
  });

  it('should handle an unknown action type', () => {
    const action = { type: 'UNKNOWN' };

    expect(accessToken(undefined, action)).toEqual({
      token: '',
      isFetching: false,
      error: false
    });
  });
});
