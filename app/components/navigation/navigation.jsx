// @flow
import React from 'react';
import Toggle from './toggle';
import SearchBar from './searchBar';
import ChannelList from './channelList';
import type { ToggleState, SearchBarState, ChannelListState } from '../../constants/typeAliases';
import styles from './navigation.scss';

const Navigation = ({
  toggle,
  searchBar,
  channelList,
  fetchChannels,
  selectChannel,
  toggleVisibility
}: {
  toggle: ToggleState,
  searchBar: SearchBarState,
  channelList: ChannelListState,
  fetchChannels: () => void,
  selectChannel: (id: string) => void,
  toggleVisibility: () => void
}) => (
  <div className={styles.navigation}>
    <Toggle
      thumbnail={toggle.thumbnail}
      title={toggle.title}
      toggleVisibility={toggleVisibility}
    />
    <SearchBar
      disabled={searchBar.disabled}
      placeholder={searchBar.placeholder}
      value={searchBar.value}
    />
    <ChannelList
      channels={channelList.channels}
      isFetching={channelList.isFetching}
      error={channelList.error}
      isOpen={channelList.isOpen}
      fetchChannels={fetchChannels}
      selectChannel={selectChannel}
      toggleVisibility={toggleVisibility}
    />
  </div>
);

export default Navigation;
