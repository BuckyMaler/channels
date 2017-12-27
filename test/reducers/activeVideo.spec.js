import actionTypes from '../../app/constants/actionTypes';
import activeVideo from '../../app/reducers/activeVideo';

describe('activeVideo reducer', () => {
  it('should return initial state', () => {
    expect(activeVideo(undefined, {})).toEqual({});
  });

  it('should handle UPDATE_ACTIVE_VIDEO', () => {
    const action = {
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: { id: '1' }
    };

    expect(activeVideo(undefined, action)).toEqual({ id: '1' });
  });

  it('should handle UPDATE_ACTIVE_VIDEO_COUNTS', () => {
    expect(activeVideo(
      {
        id: '1',
        likeCount: '0',
        dislikeCount: '0'
      },
      {
        type: actionTypes.UPDATE_ACTIVE_VIDEO_COUNTS,
        payload: {
          prevRating: {
            id: 1,
            like: false,
            dislike: false
          },
          rating: 'like'
        }
      }
    )).toEqual({
      id: '1',
      likeCount: '1',
      dislikeCount: '0'
    });

    expect(activeVideo(
      {
        id: '1',
        likeCount: '1',
        dislikeCount: '0'
      },
      {
        type: actionTypes.UPDATE_ACTIVE_VIDEO_COUNTS,
        payload: {
          prevRating: {
            id: 1,
            like: true,
            dislike: false
          },
          rating: 'none'
        }
      }
    )).toEqual({
      id: '1',
      likeCount: '0',
      dislikeCount: '0'
    });

    expect(activeVideo(
      {
        id: '1',
        likeCount: '0',
        dislikeCount: '1'
      },
      {
        type: actionTypes.UPDATE_ACTIVE_VIDEO_COUNTS,
        payload: {
          prevRating: {
            id: 1,
            like: false,
            dislike: true
          },
          rating: 'like'
        }
      }
    )).toEqual({
      id: '1',
      likeCount: '1',
      dislikeCount: '0'
    });
  });

  it('should handle an unknown action type', () => {
    const action = { type: 'UNKNOWN' };

    expect(activeVideo(undefined, action)).toEqual({});
  });
});
