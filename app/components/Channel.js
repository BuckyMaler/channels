// @flow
import React from 'react';
import styles from './Channel.scss';

const Channel = ({
  title,
  thumbnail,
  videoCount,
  subscriberCount,
  isActive,
  updateActiveChannel
}: {
  title: string,
  thumbnail: string,
  videoCount: string,
  subscriberCount: string,
  isActive: boolean,
  updateActiveChannel: (id: string) => void
}) => (
  <li className={isActive ? `${styles.channel} ${styles['channel--isActive']}` : styles.channel} onClick={updateActiveChannel}>
    <img className={styles.thumbnail} src={thumbnail} alt={title} />
    <div>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.subscribers}>{subscriberCount} subscribers</span>
      <span className={styles.videos}>{videoCount} videos</span>
    </div>
  </li>
);

export default Channel;
