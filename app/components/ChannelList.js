// @flow
import React from 'react';
import Channel from './Channel';
import Loader from './Loader';
import BlankState from './BlankState';
import ErrorState from './ErrorState';
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
  fetchChannels: () => void,
  updateActiveChannel: (id: string) => void,
  toggleChannelList: () => void
}) => {
  if (isFetching || error) {
    return (
      <div className={channelListIsOpen ? `${styles.channelList} ${styles['channelList--isOpen']}` : styles.channelList}>
        <div className={styles.closeTarget} onClick={toggleChannelList} />
        <div className={styles.modal}>
          {isFetching ? (
            <div className={styles.loader}>
              <Loader />
            </div>
          ) : (
            <div className={styles.errorState}>
              <ErrorState
                message={'Error requesting channels.'}
                retry={fetchChannels}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={channelListIsOpen ? `${styles.channelList} ${styles['channelList--isOpen']}` : styles.channelList}>
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
          <div className={styles.blankState}>
            <BlankState
              message={'No channels found.'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelList;
