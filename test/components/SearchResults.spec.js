import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchResults from '../../app/components/SearchResults';

function setup() {
  const props = {
    results: [],
    isFetching: false,
    error: false,
    pageToken: '',
    fetchSearch: () => jest.fn(),
    searchResultsIsOpen: false,
    handleSelect: () => jest.fn()
  };

  const enzymeWrapper = shallow(<SearchResults {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('SearchResults', () => {
  describe('when closed', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  describe('when opened', () => {
    const { props, enzymeWrapper } = setup();
    beforeEach(() => {
      enzymeWrapper.setProps({
        searchResultsIsOpen: true
      });
    });

    afterEach(() => {
      enzymeWrapper.setProps({
        ...props
      });
    });

    it('should render self with loader', () => {
      enzymeWrapper.setProps({
        isFetching: true
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });

    it('should render self with error message', () => {
      enzymeWrapper.setProps({
        error: true
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });

    it('should render self with results', () => {
      enzymeWrapper.setProps({
        results: [
          {
            id: '4y_G6BayFz0',
            publishedAt: 'a year ago',
            thumbnail: 'https://i.ytimg.com/hqdefault.jpg',
            title: 'Professional Advice from Adobe MAX Conference',
            viewCount: '5,463'
          },
          {
            id: 'Flze-rwT7lM',
            publishedAt: '7 months ago',
            thumbnail: 'https://i.ytimg.com/vi/Flze-rwT7lM/hqdefault.jpg',
            title: 'If You Want to Survive in Design, You Better Learn to Code',
            viewCount: '39,430'
          }
        ]
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });

    it('should render self with no results', () => {
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });
});
