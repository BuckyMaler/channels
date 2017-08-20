import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as channelActions from '../../app/actions/channel';
import ChannelType from '../../app/dataTypes/channelType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('channel actions', () => {
  it('creates TOGGLE_CHANNEL_LIST, UPDATE_ACTIVE_CHANNEL, UPDATE STATUS, and ENABLE_SEARCH_BAR when a channel is selected', () => {
    const store = mockStore({});
    store.dispatch(
      channelActions.selectChannel(
        new ChannelType(
          'DevTips',
          'https://yt3.ggpht.com/photo.jpg',
          '292',
          '232937',
          false,
          '8ef09d6c-1eda-4e1e-aeec-e3ddff47dd45'
        )
      )
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should create an action to update the active channel', () => {
    const id = '8ef09d6c-1eda-4e1e-aeec-e3ddff47dd45';
    expect(channelActions.updateActiveChannel(id)).toMatchSnapshot();
  });
});
