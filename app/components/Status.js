// @flow
import React from 'react';
import { IconArrowDropDown } from './Icons';
import styles from './Status.scss';

const Status = ({
  thumbnail,
  title,
  toggleChannelList
}: {
  thumbnail: string,
  title: string,
  toggleChannelList: () => void
}) => (
  <div className={styles.status} onClick={toggleChannelList}>
    <img className={styles.thumbnail} src={thumbnail} alt={title} />
    <h1 className={`${styles.title} ${styles['css-truncate']} ${styles['css-truncate-target']}`}>{title}</h1>
    <IconArrowDropDown styles={styles} />
  </div>
);

export default Status;
