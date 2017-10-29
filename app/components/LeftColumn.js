// @flow
import React, { Component } from 'react';
import Navigation from './Navigation';
import VideoList from '../containers/VideoList';
import SelectChannel from './SelectChannel';
import ChannelType from '../dataTypes/channelType';
import styles from './LeftColumn.scss';

export default class LeftColumn extends Component {
  props: {
    activeChannel: ?ChannelType,
    channels: ChannelType[],
    isFetching: boolean,
    error: boolean,
    fetchChannels: () => Promise<any>,
    updateActiveChannel: (channelId: string) => void
  };

  state: {
    channelListIsOpen: boolean
  };

  constructor(props: any) {
    super(props);
    this.state = { channelListIsOpen: false };
  }

  componentDidMount() {
    this.props.fetchChannels();
  }

  toggleChannelList(): void {
    this.setState(prevState => ({
      channelListIsOpen: !prevState.channelListIsOpen
    }));
  }

  render() {
    const {
      activeChannel,
      channels,
      isFetching,
      error,
      fetchChannels,
      updateActiveChannel
    } = this.props;
    const {
      channelListIsOpen
    } = this.state;
    return (
      <div className={styles.leftColumn}>
        <Navigation
          activeChannel={activeChannel}
          channels={channels}
          isFetching={isFetching}
          error={error}
          channelListIsOpen={channelListIsOpen}
          fetchChannels={fetchChannels}
          updateActiveChannel={updateActiveChannel}
          toggleChannelList={() => this.toggleChannelList()}
        />
        {activeChannel ? (
          <VideoList />
        ) : (
          <SelectChannel
            toggleChannelList={() => this.toggleChannelList()}
          />
        )}
      </div>
    );
  }
}
