// @flow
import React, { Component } from 'react';
import Status from './Status';
import SearchBar from './SearchBar';
import ChannelList from './ChannelList';
import ChannelType from '../dataTypes/channelType';
import placeholder from '../images/placeholder.jpg';
import styles from './Navigation.scss';

export default class Navigation extends Component {
  props: {
    channels: ChannelType[],
    activeChannel: ?ChannelType,
    isFetching: boolean,
    error: boolean,
    fetchChannels: () => void,
    updateActiveChannel: (id: string) => void
  };

  state = {
    channelListIsOpen: false
  };

  toggleChannelList() {
    this.setState(prevState => ({
      channelListIsOpen: !prevState.channelListIsOpen
    }));
  }

  render() {
    const {
      channels,
      activeChannel,
      isFetching,
      error,
      fetchChannels,
      updateActiveChannel
    } = this.props;
    const {
      channelListIsOpen
    } = this.state;
    return (
      <div className={styles.navigation}>
        <Status
          title={activeChannel ? activeChannel.title : 'Channels'}
          thumbnail={activeChannel ? activeChannel.thumbnail : placeholder}
          toggleChannelList={() => this.toggleChannelList()}
        />
        <SearchBar
          disabled={!!activeChannel}
          placeholder={activeChannel ? `Search ${activeChannel.title}` : 'The Mac App For YouTube Channels.'}
        />
        <ChannelList
          channels={channels}
          activeChannelId={activeChannel ? activeChannel.id : ''}
          isFetching={isFetching}
          error={error}
          channelListIsOpen={channelListIsOpen}
          fetchChannels={fetchChannels}
          updateActiveChannel={updateActiveChannel}
          toggleChannelList={() => this.toggleChannelList()}
        />
      </div>
    );
  }
}
