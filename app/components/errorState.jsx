// @flow
import React from 'react';
import styles from './errorState.scss';

const ErrorState = ({
  message,
  retry
}: {
  message: string,
  retry: () => void
}) => (
  <p className={styles.message}>
    {message}{' '}
    <span className={styles.retry} onClick={retry}>Try again.</span>
  </p>
);

export default ErrorState;
