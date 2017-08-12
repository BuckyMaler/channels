// @flow
import React from 'react';
import styles from './channel.scss';

const Channel = ({
  title,
  thumbnail,
  videoCount,
  subscriberCount,
  isActive,
  selectChannel
}: {
  title: string,
  thumbnail: string,
  videoCount: string,
  subscriberCount: string,
  isActive: boolean,
  selectChannel: (id: string) => void
}) => (
  <li className={isActive ? `${styles.channel} ${styles['channel--isActive']}` : styles.channel} onClick={selectChannel}>
    <img className={styles.thumbnail} src={thumbnail} />
    <div>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.subscribers}>{subscriberCount} subscribers</span>
      <span className={styles.videos}>{videoCount} videos</span>
    </div>
  </li>
);

export default Channel;
