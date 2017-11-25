import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RightColumn from '../../app/components/RightColumn';

jest.mock('../../app/containers/Comments', () => 'Comments');

function setup() {
  const props = {
    activeVideo: {},
    rating: {},
    fetchRatings: jest.fn(),
    postRating: jest.fn(),
    updateActiveVideoCounts: jest.fn()
  };

  const enzymeWrapper = shallow(<RightColumn {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('RightColumn', () => {
  describe('when no active video', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  describe('when active video', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.setProps({
        activeVideo: {
          id: 'XsFQEUP1MxI',
          title: 'Unit testing in JavaScript Part 2 - Your first tests',
          thumbnail: 'https://i.ytimg.com/hqdefault.jpg',
          description: 'Today, we are continuing our journey on unit testing in JavaScript.',
          publishedAt: '6 days ago',
          viewCount: '10,276',
          likeCount: '624',
          dislikeCount: '3'
        }
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  it('should call fetchRatings on activeVideo id change', () => {
    const { props, enzymeWrapper } = setup();

    expect(props.fetchRatings).toHaveBeenCalledTimes(0);

    enzymeWrapper.setProps({
      activeVideo: {
        id: 'XsFQEUP1MxI'
      }
    });

    expect(props.fetchRatings).toHaveBeenCalledTimes(1);

    enzymeWrapper.setProps({
      activeVideo: {
        id: 'Eu35xM76kKY'
      }
    });

    expect(props.fetchRatings).toHaveBeenCalledTimes(2);

    enzymeWrapper.setProps({
      activeVideo: {
        id: 'Eu35xM76kKY'
      }
    });

    expect(props.fetchRatings).toHaveBeenCalledTimes(2);
  });
});
