// @flow
import React from 'react';
import styles from './BlankState.scss';

const BlankState = ({
  message,
  className
}: {
  message: string,
  className?: string
}) => (
  <div className={[styles.blankState, className].join(' ')}>
    <p className={styles.message}>{message}</p>
  </div>
);

export default BlankState;
