import activeVideo from '../../app/reducers/activeVideo';
import actionTypes from '../../app/constants/actionTypes';

describe('activeVideo reducer', () => {
  it('should return the initial state', () => {
    expect(activeVideo(undefined, {})).toEqual({});
  });

  it('should handle UPDATE_ACTIVE_VIDEO', () => {
    const state = {
      id: 'XsFQEUP1MxI',
      title: 'Unit testing in JavaScript Part 2 - Your first tests',
      thumbnail: 'https://i.ytimg.com/hqdefault.jpg',
      description: 'Today, we are continuing our journey on unit testing in JavaScript.',
      publishedAt: '6 days ago',
      viewCount: '10,276',
      likeCount: '624',
      dislikeCount: '3'
    };
    const action = {
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: {
        likeCount: '625',
        dislikeCount: '2'
      }
    };
    expect(activeVideo(state, action)).toEqual({
      id: 'XsFQEUP1MxI',
      title: 'Unit testing in JavaScript Part 2 - Your first tests',
      thumbnail: 'https://i.ytimg.com/hqdefault.jpg',
      description: 'Today, we are continuing our journey on unit testing in JavaScript.',
      publishedAt: '6 days ago',
      viewCount: '10,276',
      likeCount: '625',
      dislikeCount: '2'
    });
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(activeVideo(undefined, action)).toEqual({});
  });
});
