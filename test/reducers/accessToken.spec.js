import accessToken from '../../app/reducers/accessToken';
import actionTypes from '../../app/constants/actionTypes';

describe('accessToken reducer', () => {
  it('should return the initial state', () => {
    expect(accessToken(undefined, {})).toMatchSnapshot();
  });

  it('should handle FETCH_ACCESS_TOKEN_REQUEST', () => {
    const action = { type: actionTypes.FETCH_ACCESS_TOKEN_REQUEST };
    expect(accessToken(undefined, action)).toMatchSnapshot();
  });

  it('should handle FETCH_ACCESS_TOKEN_SUCCESS', () => {
    const state = {
      token: '',
      isFetching: true,
      error: false
    };
    const action = {
      type: actionTypes.FETCH_ACCESS_TOKEN_SUCCESS,
      payload: 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg'
    };
    expect(accessToken(state, action)).toMatchSnapshot();
  });

  it('should handle FETCH_ACCESS_TOKEN_FAILURE', () => {
    const state = {
      token: '',
      isFetching: true,
      error: false
    };
    const action = { type: actionTypes.FETCH_ACCESS_TOKEN_FAILURE };
    expect(accessToken(state, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(accessToken(undefined, action)).toMatchSnapshot();
  });
});
