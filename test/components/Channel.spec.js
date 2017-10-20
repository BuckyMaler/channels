import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Channel from '../../app/components/core/Channel';

function setup() {
  const props = {
    title: 'DevTips',
    thumbnail: 'https://yt3.ggpht.com/photo.jpg',
    videoCount: '292',
    subscriberCount: '243,600',
    isActive: false,
    updateActiveChannel: jest.fn()
  };

  const enzymeWrapper = shallow(<Channel {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Channel', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should call updateActiveChannel', () => {
    const { props, enzymeWrapper } = setup();
    const channelId = 'UCfWZwsP8trUy5uHJg8gcGIQ';

    enzymeWrapper.simulate('click', channelId);

    expect(props.updateActiveChannel).toBeCalled();
    expect(props.updateActiveChannel).toBeCalledWith(channelId);
  });
});
