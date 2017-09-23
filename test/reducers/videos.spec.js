import videos from '../../app/reducers/videos';
import actionTypes from '../../app/constants/actionTypes';
import VideoType from '../../app/dataTypes/videoType';

describe('video reducer', () => {
  it('should return initial state', () => {
    expect(videos(undefined, {})).toMatchSnapshot();
  });

  it('should handle FETCH_VIDEOS_REQUEST', () => {
    const action = { type: actionTypes.FETCH_VIDEOS_REQUEST };
    expect(videos(undefined, action)).toMatchSnapshot();
  });

  it('should handle FETCH_VIDEOS_SUCCESS', () => {
    const state = videos(undefined, { type: actionTypes.FETCH_VIDEOS_REQUEST });
    const action = {
      type: actionTypes.FETCH_VIDEOS_SUCCESS,
      payload: {
        items: [
          { id: 'UCyIe-61Y8C4_o-zZCtO4ETQ' },
          { id: 'UCO1cgjhGzsSYb1rsB4bFe4Q' }
        ],
        nextPageToken: 'CBQQAA'
      }
    };

    VideoType.from = jest.fn(item => item);

    expect(videos(state, action)).toMatchSnapshot();
  });

  it('should handle FETCH_VIDEOS_FAILURE', () => {
    const state = videos(undefined, { type: actionTypes.FETCH_VIDEOS_REQUEST });
    const action = { type: actionTypes.FETCH_VIDEOS_FAILURE };
    expect(videos(state, action)).toMatchSnapshot();
  });

  it('should handle UPDATE_ACTIVE_CHANNEL', () => {
    const state = videos(
      undefined,
      {
        type: actionTypes.FETCH_VIDEOS_SUCCESS,
        payload: {
          items: [
            { id: 'UCyIe-61Y8C4_o-zZCtO4ETQ' },
            { id: 'UCO1cgjhGzsSYb1rsB4bFe4Q' }
          ],
          nextPageToken: 'CBQQAA'
        }
      }
    );
    const action = {
      type: actionTypes.UPDATE_ACTIVE_CHANNEL,
      payload: 'UCO1cgjhGzsSYb1rsB4bFe4Q'
    };

    VideoType.from = jest.fn(item => item);

    expect(videos(state, action)).toMatchSnapshot();
  });

  it('should handle unknown action type', () => {
    const action = { type: 'unknown' };
    expect(videos(undefined, action)).toMatchSnapshot();
  });
});
