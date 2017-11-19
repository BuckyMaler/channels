import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Video from '../../app/components/core/Video';

function setup() {
  const props = {
    title: 'Professional Advice from Adobe MAX Conference',
    thumbnail: 'https://i.ytimg.com/hqdefault.jpg',
    publishedAt: 'a year ago',
    viewCount: '5,463',
    handleClick: jest.fn()
  };

  const enzymeWrapper = shallow(<Video {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Video', () => {
  describe('without description', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  describe('with description', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.setProps({
        description: 'I visited Adobe Max and asked all my design heroes for advice.'
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  it('should handle click', () => {
    const { props, enzymeWrapper } = setup();

    enzymeWrapper.simulate('click');

    expect(props.handleClick).toBeCalled();
  });
});
