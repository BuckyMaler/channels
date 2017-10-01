// @flow
import React from 'react';
import styles from './ErrorState.scss';

const ErrorState = ({
  message,
  retry
}: {
  message: string,
  retry?: () => Promise<any>
}) => (
  <p className={styles.message}>
    {message}
    {retry &&
      <span className={styles.retry} onClick={retry}>
        {' '}
        Try again.
      </span>
    }
  </p>
);

export default ErrorState;
