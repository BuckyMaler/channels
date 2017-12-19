// @flow
import React from 'react';
import { IconInfo } from './Icons';
import styles from './BlankState.scss';

const BlankState = ({
  color,
  message
}: {
  color: string,
  message: string
}) => (
  <div className={[styles.blankState, styles[color]].join(' ')}>
    <IconInfo className={styles.iconInfo} />
    <p className={styles.message}>{message}</p>
  </div>
);

export default BlankState;
