// @flow
import React from 'react';
import Channel from './channel';
import Loader from '../loader';
import BlankState from '../blankState';
import ErrorState from '../errorState';
import ChannelType from '../../dataModels/channel';
import styles from './channelList.scss';

const ChannelList = ({
  channels,
  isFetching,
  error,
  isOpen,
  fetchChannels,
  selectChannel,
  toggleVisibility
}: {
  channels: ChannelType[],
  isFetching: boolean,
  error: boolean,
  isOpen: boolean,
  fetchChannels: () => void,
  selectChannel: (id: string) => void,
  toggleVisibility: () => void
}) => {
  if (isFetching || error) {
    return (
      <div className={isOpen ? `${styles.channelList} ${styles['channelList--isOpen']}` : styles.channelList}>
        <div className={styles.closeTarget} onClick={toggleVisibility} />
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
    <div className={isOpen ? `${styles.channelList} ${styles['channelList--isOpen']}` : styles.channelList}>
      <div className={styles.closeTarget} onClick={toggleVisibility} />
      <div className={styles.modal}>
        {channels.length ? (
          <ul className={styles.channels}>
            {channels.map(channel =>
              <Channel
                key={channel.id}
                title={channel.title}
                thumbnail={channel.thumbnail}
                videoCount={channel.videoCount}
                subscriberCount={channel.subscriberCount}
                isActive={channel.isActive}
                selectChannel={() => selectChannel(channel.id)}
              />
            )}
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
}

export default ChannelList;
