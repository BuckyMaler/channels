import searchBar from '../../app/reducers/searchBar';
import actionTypes from '../../app/constants/actionTypes';

describe('searchBar reducer', () => {
  it('should return initial state', () => {
    expect(searchBar(undefined, {})).toMatchSnapshot();
  });

  it('should handle ENABLE_SEARCH_BAR', () => {
    const action = {
      type: actionTypes.ENABLE_SEARCH_BAR,
      payload: 'DevTips'
    };
    expect(searchBar(undefined, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(searchBar(undefined, action)).toMatchSnapshot();
  });
});
