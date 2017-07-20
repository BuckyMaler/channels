import accessToken from '../../app/reducers/accessToken';
import actionTypes from '../../app/constants/actionTypes';

describe('accessToken reducer', () => {
  it('should return the initial state', () => {
    expect(accessToken(undefined, {})).toMatchSnapshot();
  });

  it('should handle REQUEST_ACCESS_TOKEN', () => {
    expect(accessToken(undefined, { type: actionTypes.REQUEST_ACCESS_TOKEN })).toMatchSnapshot();
  });

  it('should handle RECEIVE_ACCESS_TOKEN', () => {
    const state = accessToken(undefined, { type: actionTypes.REQUEST_ACCESS_TOKEN });
    const action = {
      type: actionTypes.RECEIVE_ACCESS_TOKEN,
      payload: '1/BYafNRmup5QmMT8NmWJemosgtOF4GCu8-sqMIO7nHBk'
    };
    expect(accessToken(state, action)).toMatchSnapshot();
  });

  it('should handle ACCESS_TOKEN_ERROR', () => {
    const state = accessToken(undefined, { type: actionTypes.REQUEST_ACCESS_TOKEN });
    expect(accessToken(state, { type: actionTypes.ACCESS_TOKEN_ERROR })).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    expect(accessToken(undefined, { type: 'unknown' })).toMatchSnapshot();
  });
});
