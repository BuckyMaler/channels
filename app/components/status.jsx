// @flow
import React from 'react';
import { IconArrowDropDown } from './icons';
import styles from './status.scss';

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
    <img className={styles.thumbnail} src={thumbnail} />
    <h1 className={styles.title}>{title}</h1>
    <IconArrowDropDown styles={styles} />
  </div>
);

export default Status;
