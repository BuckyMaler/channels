import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChannelList from '../../app/components/ChannelList';

function setup() {
  const props = {
    channels: [],
    activeChannelId: '',
    isFetching: false,
    error: false,
    channelListIsOpen: false,
    fetchChannels: jest.fn(),
    updateActiveChannel: jest.fn(),
    toggleChannelList: jest.fn()
  };

  const enzymeWrapper = shallow(<ChannelList {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('ChannelList', () => {
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
        channelListIsOpen: true
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

    it('should render self with channels', () => {
      enzymeWrapper.setProps({
        channels: [
          {
            id: 'UCyIe-61Y8C4_o-zZCtO4ETQ',
            subscriberCount: '243,643',
            thumbnail: 'https://yt3.ggpht.com/photo.jpg',
            title: 'DevTips',
            videoCount: '292'
          },
          {
            id: 'UC7O6CntQoAI-wYyJxYiqNUg',
            subscriberCount: '18,655',
            thumbnail: 'https://yt3.ggpht.com/photo.jpg',
            title: 'Ihatetomatoes',
            videoCount: '140'
          }
        ]
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });

    it('should render self with no channels', () => {
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  it('should call toggleChannelList', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      channels: [{
        id: 'UCyIe-61Y8C4_o-zZCtO4ETQ',
        subscriberCount: '243,643',
        thumbnail: 'https://yt3.ggpht.com/photo.jpg',
        title: 'DevTips',
        videoCount: '292'
      }]
    });
    const closeTarget = enzymeWrapper.find('.closeTarget');
    const channels = enzymeWrapper.find('.channels');

    closeTarget.simulate('click');

    expect(props.toggleChannelList).toHaveBeenCalledTimes(1);

    channels.simulate('click');

    expect(props.toggleChannelList).toHaveBeenCalledTimes(2);
  });
});
