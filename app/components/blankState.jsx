// @flow
import React from 'react';
import styles from './blankState.scss';

const BlankState = ({
  message
}: {
  message: string
}) => (
  <p className={styles.message}>{message}</p>
);

export default BlankState;
