import * as statusActions from '../../app/actions/status';

describe('status actions', () => {
  it('should create an action to toggle the channel list', () => {
    expect(statusActions.toggleChannelList()).toMatchSnapshot();
  });

  it('should create an action to update status', () => {
    const title = 'DevTips';
    const thumbnail = 'https://yt3.ggpht.com/photo.jpg';
    expect(statusActions.updateStatus(title, thumbnail)).toMatchSnapshot();
  });
});
