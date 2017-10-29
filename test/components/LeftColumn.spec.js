import React from 'react';
import { shallow, mount } from 'enzyme';
import LeftColumn from '../../app/components/LeftColumn';

function setup() {
  const props = {
    activeChannel: undefined,
    channels: [],
    isFetching: false,
    error: false,
    fetchChannels: jest.fn(),
    updateActiveChannel: jest.fn()
  };

  const enzymeWrapper = shallow(<LeftColumn {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('LeftColumn', () => {
  it('should update channelListIsOpen', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.state('channelListIsOpen')).toBe(false);

    enzymeWrapper.instance().toggleChannelList();

    expect(enzymeWrapper.state('channelListIsOpen')).toBe(true);
  });
});
