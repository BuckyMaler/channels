import { shallow } from 'enzyme';
import React from 'react';
import RatingBar from '../../app/components/RatingBar';

function setup() {
  const props = {
    rating: undefined,
    activeVideoId: '',
    likeCount: '',
    dislikeCount: '',
    fetchRatings: jest.fn(),
    postRating: jest.fn(),
    updateActiveVideoCounts: jest.fn()
  };

  const enzymeWrapper = shallow(<RatingBar {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('RatingBar', () => {
  it('should call fetchRatings twice', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      activeVideoId: '1'
    });

    enzymeWrapper.setProps({
      activeVideoId: '1'
    });

    expect(props.fetchRatings).toHaveBeenCalledTimes(2);
  });

  it('should call postRating', () => {
    const { props, enzymeWrapper } = setup();

    props.postRating.mockReturnValue(Promise.resolve());
    enzymeWrapper.setProps({
      rating: {
        videoId: '1',
        like: true,
        dislike: false
      }
    });

    enzymeWrapper.find('[name="like"]').simulate('change');

    expect(props.postRating).toHaveBeenLastCalledWith('none');

    enzymeWrapper.find('[name="dislike"]').simulate('change');

    expect(props.postRating).toHaveBeenLastCalledWith('dislike');

    enzymeWrapper.setProps({
      rating: {
        videoId: '1',
        like: false,
        dislike: true
      }
    });

    enzymeWrapper.find('[name="like"]').simulate('change');

    expect(props.postRating).toHaveBeenLastCalledWith('like');

    enzymeWrapper.find('[name="dislike"]').simulate('change');

    expect(props.postRating).toHaveBeenLastCalledWith('none');
  });
});
