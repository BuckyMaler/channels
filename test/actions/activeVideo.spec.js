import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as activeVideoActions from '../../app/actions/activeVideo';
import actionTypes from '../../app/constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('activeVideo actions', () => {
  it('should create an action to update the active video', () => {
    const video = {
      id: '1'
    };

    const expectedAction = [{
      type: actionTypes.UPDATE_ACTIVE_VIDEO,
      payload: video
    }];
    const store = mockStore({ activeVideo: {} });

    store.dispatch(activeVideoActions.updateActiveVideo(video));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should not create an action to update the active video', () => {
    const video = {
      id: '1'
    };

    const store = mockStore({ activeVideo: video });

    store.dispatch(activeVideoActions.updateActiveVideo(video));
    expect(store.getActions()).toEqual([]);
  });
});
