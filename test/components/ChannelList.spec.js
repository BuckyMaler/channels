import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ChannelList from '../../app/components/ChannelList';

function setup() {
  const props = {
    channels: [],
    isFetching: false,
    error: false,
    activeChannelId: '',
    channelListIsOpen: true,
    toggleChannelList: jest.fn(),
    fetchChannels: jest.fn(),
    updateActiveChannel: jest.fn()
  };

  const enzymeWrapper = shallow(<ChannelList {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('ChannelList', () => {
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

  it('should render self with no channels', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with channels', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      channels: [
        {
          id: '1',
          title: 'title',
          thumbnail: 'thumbnail.jpg',
          videoCount: '1',
          subscriberCount: '1'
        },
        {
          id: '2',
          title: 'title',
          thumbnail: 'thumbnail.jpg',
          videoCount: '1',
          subscriberCount: '1'
        }
      ]
    });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });
});
