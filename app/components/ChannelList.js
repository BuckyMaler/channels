// @flow
import React from 'react';
import BlankState from './core/BlankState';
import Channel from './core/Channel';
import ErrorState from './core/ErrorState';
import Loader from './core/Loader';
import type { PromiseAction } from '../constants/types';
import ChannelType from '../dataTypes/channelType';
import styles from './ChannelList.scss';

const ChannelList = ({
  channels,
  activeChannelId,
  isFetching,
  error,
  channelListIsOpen,
  fetchChannels,
  updateActiveChannel,
  toggleChannelList
}: {
  channels: ChannelType[],
  activeChannelId: string,
  isFetching: boolean,
  error: boolean,
  channelListIsOpen: boolean,
  fetchChannels: () => PromiseAction,
  updateActiveChannel: (channelId: string) => void,
  toggleChannelList: () => void
}) => (
  <div className={channelListIsOpen ? [styles.channelList, styles.isOpen].join(' ') : styles.channelList}>
    <div className={styles.closeTarget} onClick={toggleChannelList} />
    <div className={styles.modal}>
      {isFetching || error ? (
        isFetching ? (
          <Loader />
        ) : (
          <ErrorState
            color="black"
            message="Error requesting channels."
            retry={fetchChannels}
          />
        )
      ) : (
        channels.length ? (
          <ul className={styles.channels} onClick={toggleChannelList}>
            {channels.map(channel => (
              <Channel
                key={channel.id}
                title={channel.title}
                thumbnail={channel.thumbnail}
                videoCount={channel.videoCount}
                subscriberCount={channel.subscriberCount}
                isActive={channel.id === activeChannelId}
                handleClick={() => updateActiveChannel(channel.id)}
              />
            ))}
          </ul>
        ) : (
          <BlankState
            color="black"
            message="No channels found."
          />
        )
      )}
    </div>
  </div>
);

export default ChannelList;
