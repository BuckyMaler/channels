import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RatingBar from '../../app/components/RatingBar';

function setup() {
  const props = {
    likeCount: '',
    dislikeCount: '',
    rating: {},
    isPosting: false,
    postRating: jest.fn()
  };

  const enzymeWrapper = shallow(<RatingBar {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('RatingBar', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('like input should be checked', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      rating: {
        like: true,
        dislike: false
      }
    });
    const inputLike = enzymeWrapper.find('input[name="like"]');
    const inputDislike = enzymeWrapper.find('input[name="dislike"]');

    expect(inputLike.props().checked).toBe(true);
    expect(inputDislike.props().checked).toBe(false);
  });

  it('dislike input should be checked', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      rating: {
        like: false,
        dislike: true
      }
    });
    const inputLike = enzymeWrapper.find('input[name="like"]');
    const inputDislike = enzymeWrapper.find('input[name="dislike"]');

    expect(inputLike.props().checked).toBe(false);
    expect(inputDislike.props().checked).toBe(true);
  });
});
