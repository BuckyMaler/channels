import accessToken from '../../app/reducers/accessToken';
import actionTypes from '../../app/constants/actionTypes';

describe('accessToken reducer', () => {
  it('should return the initial state', () => {
    expect(accessToken(undefined, {})).toMatchSnapshot();
  });

  it('should handle REQUEST_ACCESS_TOKEN', () => {
    const action = { type: actionTypes.REQUEST_ACCESS_TOKEN };
    expect(accessToken(undefined, action)).toMatchSnapshot();
  });

  it('should handle RECEIVE_ACCESS_TOKEN', () => {
    const state = accessToken(undefined, { type: actionTypes.REQUEST_ACCESS_TOKEN });
    const action = {
      type: actionTypes.RECEIVE_ACCESS_TOKEN,
      payload: 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg'
    };
    expect(accessToken(state, action)).toMatchSnapshot();
  });

  it('should handle ACCESS_TOKEN_ERROR', () => {
    const state = accessToken(undefined, { type: actionTypes.REQUEST_ACCESS_TOKEN });
    const action = { type: actionTypes.ACCESS_TOKEN_ERROR };
    expect(accessToken(state, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(accessToken(undefined, action)).toMatchSnapshot();
  });
});
