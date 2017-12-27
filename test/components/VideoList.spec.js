import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import VideoList from '../../app/components/VideoList';

function setup() {
  const props = {
    videos: [],
    pageToken: '',
    isFetching: false,
    error: '',
    activeChannelId: '',
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

  it('should render self with no videos', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with videos', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      videos: [
        {
          id: '1',
          title: 'title',
          thumbnail: 'thumbnail.jpg',
          description: 'description',
          publishedAt: 'publishedAt',
          viewCount: '1'
        },
        {
          id: '2',
          title: 'title',
          thumbnail: 'thumbnail.jpg',
          description: 'description',
          publishedAt: 'publishedAt',
          viewCount: '1'
        }
      ],
      pageToken: 'token'
    });
    let tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();

    enzymeWrapper.setProps({
      isFetching: true
    });
    tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });
});
