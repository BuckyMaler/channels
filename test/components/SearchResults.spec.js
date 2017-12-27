import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import SearchResults from '../../app/components/SearchResults';

function setup() {
  const props = {
    results: [],
    pageToken: '',
    isFetching: false,
    error: false,
    searchResultsIsOpen: true,
    fetchSearch: jest.fn(),
    selectResult: jest.fn()
  };

  const enzymeWrapper = shallow(<SearchResults {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('SearchResults', () => {
  it('should render self with loader', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({ isFetching: true });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with error', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({ error: true });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with no results', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with results', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      results: [
        {
          id: '1',
          title: 'title',
          thumbnail: 'thumbnail.jpg',
          publishedAt: 'publishedAt',
          viewCount: '1'
        },
        {
          id: '2',
          title: 'title',
          thumbnail: 'thumbnail.jpg',
          publishedAt: 'publishedAt',
          viewCount: '1'
        }
      ],
      pageToken: 'token'
    });
    let tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();

    enzymeWrapper.setProps({
      isFetching: true
    });
    tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });
});
