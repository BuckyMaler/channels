// @flow
import React from 'react';
import ChannelList from './ChannelList';
import Status from './Status';
import type { PromiseAction } from '../constants/types';
import Search from '../containers/Search';
import ChannelType from '../dataTypes/channelType';
import placeholder from '../images/placeholder.jpg';
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
  fetchChannels: () => PromiseAction,
  updateActiveChannel: (channelId: string) => void,
  toggleChannelList: () => void
}) => (
  <div className={styles.navigation}>
    <Status
      title={activeChannel ? activeChannel.title : 'Channels'}
      thumbnail={activeChannel ? activeChannel.thumbnail : placeholder}
      toggleChannelList={toggleChannelList}
    />
    <Search />
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
