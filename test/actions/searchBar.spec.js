import * as searchBarActions from '../../app/actions/searchBar';

describe('search bar actions', () => {
  it('should create an action to enable the search bar', () => {
    expect(searchBarActions.enableSearchBar('DevTips')).toMatchSnapshot();
  });
});
