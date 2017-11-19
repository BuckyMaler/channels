import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import VideoList from '../../app/components/VideoList';

function setup() {
  const props = {
    channelId: 'UCO1cgjhGzsSYb1rsB4bFe4Q',
    videos: [],
    isFetching: false,
    error: false,
    pageToken: '',
    fetchVideos: jest.fn(),
    updateActiveVideo: jest.fn()
  };

  const enzymeWrapper = shallow(<VideoList {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('VideoList', () => {
  it('should render self with loader', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      isFetching: true
    });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with error message', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      error: true
    });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with videos', () => {
    const { enzymeWrapper } = setup();
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
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should call fetchVideos on channel id change', () => {
    const { props, enzymeWrapper } = setup();

    expect(props.fetchVideos).toHaveBeenCalledTimes(0);

    enzymeWrapper.setProps({
      channelId: 'UCyIe-61Y8C4_o-zZCtO4ETQ'
    });

    expect(props.fetchVideos).toHaveBeenCalledTimes(1);

    enzymeWrapper.setProps({
      channelId: 'UC7O6CntQoAI-wYyJxYiqNUg'
    });

    expect(props.fetchVideos).toHaveBeenCalledTimes(2);

    enzymeWrapper.setProps({
      channelId: 'UC7O6CntQoAI-wYyJxYiqNUg'
    });

    expect(props.fetchVideos).toHaveBeenCalledTimes(2);
  });
});
