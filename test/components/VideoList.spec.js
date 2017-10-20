import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import VideoList from '../../app/components/VideoList';

function setup() {
  const props = {
    activeChannel: undefined,
    videos: [],
    isFetching: false,
    error: false,
    pageToken: '',
    fetchVideos: jest.fn(),
    toggleChannelList: jest.fn()
  };

  const enzymeWrapper = shallow(<VideoList {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('VideoList', () => {
  describe('with no active channel', () => {
    it('should render self with notification', () => {
      const { enzymeWrapper } = setup();
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  describe('with active channel', () => {

    const { props, enzymeWrapper } = setup();
    beforeEach(() => {
      enzymeWrapper.setProps({
        activeChannel: {
          id: 'UCyIe-61Y8C4_o-zZCtO4ETQ',
          subscriberCount: '243,643',
          thumbnail: 'https://yt3.ggpht.com/photo.jpg',
          title: 'DevTips',
          videoCount: '292'
        }
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

    it('should render self with videos', () => {
      enzymeWrapper.setProps({
        videos: [
          {
            description: 'I visited Adobe Max and asked all my design heroes for advice.',
            id: '4y_G6BayFz0',
            publishedAt: 'a year ago',
            thumbnail: 'https://i.ytimg.com/hqdefault.jpg',
            title: 'Professional Advice from Adobe MAX Conference',
            viewCount: '5,463'
          },
          {
            description: 'Wired Article',
            id: 'Flze-rwT7lM',
            publishedAt: '7 months ago',
            thumbnail: 'https://i.ytimg.com/vi/Flze-rwT7lM/hqdefault.jpg',
            title: 'If You Want to Survive in Design, You Better Learn to Code',
            viewCount: '39,430'
          }
        ]
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });

    it('should render self with no videos', () => {
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  it('should call toggleChannelList', () => {
    const { props, enzymeWrapper } = setup();
    const select = enzymeWrapper.find('.select');

    select.simulate('click');

    expect(props.toggleChannelList).toBeCalled();
  });
});
