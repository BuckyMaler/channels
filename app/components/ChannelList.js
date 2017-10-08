// @flow
import React from 'react';
import Channel from './core/Channel';
import Loader from './core/Loader';
import BlankState from './core/BlankState';
import ErrorState from './core/ErrorState';
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
  fetchChannels: () => Promise<any>,
  updateActiveChannel: (channelId: string) => void,
  toggleChannelList: () => void
}) => {
  if (isFetching || error) {
    return (
      <div className={channelListIsOpen ? styles.channelListIsOpen : ''}>
        <div className={styles.closeTarget} onClick={toggleChannelList} />
        <div className={styles.modal}>
          {isFetching ? (
            <Loader />
          ) : (
            <ErrorState
              message={'Error requesting channels.'}
              retry={fetchChannels}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={channelListIsOpen ? styles.channelListIsOpen : ''}>
      <div className={styles.closeTarget} onClick={toggleChannelList} />
      <div className={styles.modal}>
        {channels.length ? (
          <ul className={styles.channels} onClick={toggleChannelList}>
            {channels.map(channel => (
              <Channel
                key={channel.id}
                title={channel.title}
                thumbnail={channel.thumbnail}
                videoCount={channel.videoCount}
                subscriberCount={channel.subscriberCount}
                isActive={channel.id === activeChannelId}
                updateActiveChannel={() => updateActiveChannel(channel.id)}
              />
            ))}
          </ul>
        ) : (
          <BlankState
            message={'No channels found.'}
          />
        )}
      </div>
    </div>
  );
};

export default ChannelList;
