// @flow
import React from 'react';
import Status from './Status';
import ChannelList from '../containers/ChannelList';
import Search from '../containers/Search';
import ChannelType from '../dataTypes/channelType';
import placeholder from '../images/placeholder.jpg';
import styles from './Navigation.scss';

const Navigation = ({
  activeChannel,
  channelListIsOpen,
  toggleChannelList
}: {
  activeChannel: ?ChannelType,
  channelListIsOpen: boolean,
  toggleChannelList: () => void
}) => (
  <div className={styles.navigation}>
    <Status
      title={activeChannel ? activeChannel.title : 'Channels'}
      thumbnail={activeChannel ? activeChannel.thumbnail : placeholder}
      toggleChannelList={toggleChannelList}
    />
    <Search
      activeChannel={activeChannel}
    />
    <ChannelList
      activeChannelId={activeChannel ? activeChannel.id : ''}
      channelListIsOpen={channelListIsOpen}
      toggleChannelList={toggleChannelList}
    />
  </div>
);

export default Navigation;
