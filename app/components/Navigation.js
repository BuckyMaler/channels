// @flow
import React from 'react';
import Status from './Status';
import SearchBar from './SearchBar';
import ChannelList from './ChannelList';
import placeholder from '../images/placeholder.jpg';
import ChannelType from '../dataTypes/channelType';
import styles from './Navigation.scss';

const Navigation = ({
  activeChannel,
  channels,
  isFetching,
  error,
  channelListIsOpen,
  fetchChannels,
  updateActiveChannel,
  toggleChannelList
}: {
  activeChannel: ?ChannelType,
  channels: ChannelType[],
  isFetching: boolean,
  error: boolean,
  channelListIsOpen: boolean,
  fetchChannels: () => Promise<any>,
  updateActiveChannel: (channelId: string) => void,
  toggleChannelList: () => void
}) => (
  <div className={styles.navigation}>
    <Status
      title={activeChannel ? activeChannel.title : 'Channels'}
      thumbnail={activeChannel ? activeChannel.thumbnail : placeholder}
      toggleChannelList={toggleChannelList}
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
      toggleChannelList={toggleChannelList}
    />
  </div>
);

export default Navigation;
