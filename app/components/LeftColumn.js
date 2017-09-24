// @flow
import React, { Component } from 'react';
import Navigation from './Navigation';
import VideoList from './VideoList';
import ChannelType from '../dataTypes/channelType';
import VideoType from '../dataTypes/videoType';
import styles from './LeftColumn.scss';

export default class LeftColumn extends Component {
  props: {
    activeChannel: ?ChannelType,
    channels: ChannelType[],
    isFetchingChannels: boolean,
    errorChannels: boolean,
    videos: VideoType[],
    isFetchingVideos: boolean,
    errorVideos: boolean,
    pageToken: string,
    fetchChannels: () => Promise<any>,
    updateActiveChannel: (channelId: string) => void,
    fetchVideos: () => Promise<any>
  };

  state: {
    channelListIsOpen: boolean
  };

  constructor(props: any) {
    super(props);
    this.state = {
      channelListIsOpen: false
    };
  }

  componentWillReceiveProps(nextProps: any) {
    const { activeChannel } = this.props;
    const id = activeChannel ? activeChannel.id : '';
    const { activeChannel: nextActiveChannel } = nextProps;
    const nextId = nextActiveChannel ? nextActiveChannel.id : '';
    if (id !== nextId) {
      this.props.fetchVideos();
    }
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
      isFetchingChannels,
      errorChannels,
      videos,
      isFetchingVideos,
      errorVideos,
      pageToken,
      fetchChannels,
      updateActiveChannel,
      fetchVideos
    } = this.props;
    const {
      channelListIsOpen
    } = this.state;
    return (
      <div className={styles.leftColumn}>
        <Navigation
          activeChannel={activeChannel}
          channels={channels}
          isFetching={isFetchingChannels}
          error={errorChannels}
          channelListIsOpen={channelListIsOpen}
          fetchChannels={fetchChannels}
          updateActiveChannel={updateActiveChannel}
          toggleChannelList={() => this.toggleChannelList()}
        />
        <VideoList
          activeChannel={activeChannel}
          videos={videos}
          isFetching={isFetchingVideos}
          error={errorVideos}
          pageToken={pageToken}
          fetchVideos={fetchVideos}
          toggleChannelList={() => this.toggleChannelList()}
        />
      </div>
    );
  }
}
