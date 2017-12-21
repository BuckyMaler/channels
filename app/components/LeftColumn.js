// @flow
import React, { Component } from 'react';
import Navigation from './Navigation';
import SelectChannel from './SelectChannel';
import VideoList from '../containers/VideoList';
import ChannelType from '../dataTypes/channelType';
import styles from './LeftColumn.scss';

type Props = {
  activeChannel: ?ChannelType
};

type State = {
  channelListIsOpen: boolean
};

export default class LeftColumn extends Component<Props, State> {
  state = {
    channelListIsOpen: false
  };

  toggleChannelList = (): void => {
    this.setState(prevState => ({
      channelListIsOpen: !prevState.channelListIsOpen
    }));
  }

  render() {
    const {
      activeChannel
    } = this.props;
    const {
      channelListIsOpen
    } = this.state;
    return (
      <div className={styles.leftColumn}>
        <Navigation
          activeChannel={activeChannel}
          channelListIsOpen={channelListIsOpen}
          toggleChannelList={this.toggleChannelList}
        />
        {activeChannel ? (
          <VideoList
            activeChannelId={activeChannel.id}
          />
        ) : (
          <SelectChannel
            toggleChannelList={this.toggleChannelList}
          />
        )}
      </div>
    );
  }
}
