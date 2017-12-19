// @flow
import React from 'react';
import styles from './Channel.scss';

const Channel = ({
  title,
  thumbnail,
  videoCount,
  subscriberCount,
  isActive,
  handleClick
}: {
  title: string,
  thumbnail: string,
  videoCount: string,
  subscriberCount: string,
  isActive: boolean,
  handleClick: (channelId: string) => void
}) => (
  <li className={isActive ? [styles.channel, styles.isActive].join(' ') : styles.channel} onClick={handleClick}>
    <img className={styles.thumbnail} src={thumbnail} alt={title} />
    <div>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.subscribers}>{subscriberCount} subscribers</span>
      <span className={styles.videos}>{videoCount} videos</span>
    </div>
  </li>
);

export default Channel;
