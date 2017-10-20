import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Status from '../../app/components/Status';

function setup() {
  const props = {
    title: 'DevTips',
    thumbnail: 'https://yt3.ggpht.com/photo.jpg',
    toggleChannelList: jest.fn()
  };

  const enzymeWrapper = shallow(<Status {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Status', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should call toggleChannelList', () => {
    const { props, enzymeWrapper } = setup();

    enzymeWrapper.simulate('click');

    expect(props.toggleChannelList).toBeCalled();
  });
});
