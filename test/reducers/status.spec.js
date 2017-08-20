import status from '../../app/reducers/status';
import actionTypes from '../../app/constants/actionTypes';

describe('status reducer', () => {
  it('should return the initial state', () => {
    expect(status(undefined, {})).toMatchSnapshot();
  });

  it('should handle UPDATE_STATUS', () => {
    const action = {
      type: actionTypes.UPDATE_STATUS,
      payload: {
        thumbnail: 'https://yt3.ggpht.com/photo.jpg',
        title: 'DevTips'
      }
    };
    expect(status(undefined, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(status(undefined, action)).toMatchSnapshot();
  });
});
