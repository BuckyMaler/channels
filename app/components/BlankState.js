// @flow
import React from 'react';
import styles from './BlankState.scss';

const BlankState = ({
  message
}: {
  message: string
}) => (
  <p className={styles.message}>{message}</p>
);

export default BlankState;
