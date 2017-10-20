import React from 'react';
import { shallow } from 'enzyme';
import LeftColumn from '../../app/components/LeftColumn';

function setup() {
  const props = {
    activeChannel: undefined,
    channels: [],
    isFetchingChannels: false,
    errorChannels: false,
    videos: [],
    isFetchingVideos: false,
    errorVideos: false,
    pageToken: '',
    fetchChannels: jest.fn(),
    updateActiveChannel: jest.fn(),
    fetchVideos: jest.fn()
  };

  const enzymeWrapper = shallow(<LeftColumn {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('LeftColumn', () => {
  it('should call fetchVideos on active channel change', () => {
    const { props, enzymeWrapper } = setup();

    expect(props.fetchVideos).toHaveBeenCalledTimes(0);

    enzymeWrapper.setProps({
      activeChannel: {
        id: 'UCyIe-61Y8C4_o-zZCtO4ETQ',
        subscriberCount: '243,643',
        thumbnail: 'https://yt3.ggpht.com/photo.jpg',
        title: 'DevTips',
        videoCount: '292'
      }
    });

    expect(props.fetchVideos).toHaveBeenCalledTimes(1);

    enzymeWrapper.setProps({
      activeChannel: {
        id: 'UC7O6CntQoAI-wYyJxYiqNUg',
        subscriberCount: '18,655',
        thumbnail: 'https://yt3.ggpht.com/photo.jpg',
        title: 'Ihatetomatoes',
        videoCount: '140'
      }
    });

    expect(props.fetchVideos).toHaveBeenCalledTimes(2);

    enzymeWrapper.setProps({
      activeChannel: {
        id: 'UC7O6CntQoAI-wYyJxYiqNUg',
        subscriberCount: '18,655',
        thumbnail: 'https://yt3.ggpht.com/photo.jpg',
        title: 'Ihatetomatoes',
        videoCount: '140'
      }
    });

    expect(props.fetchVideos).toHaveBeenCalledTimes(2);
  });

  it('should update channelListIsOpen', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.state('channelListIsOpen')).toBe(false);

    enzymeWrapper.instance().toggleChannelList();

    expect(enzymeWrapper.state('channelListIsOpen')).toBe(true);
  });
});
