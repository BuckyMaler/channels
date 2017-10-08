// @flow
import React from 'react';
import styles from './ErrorState.scss';

const ErrorState = ({
  message,
  retry,
  className
}: {
  message: string,
  retry?: () => Promise<any>,
  className?: string
}) => (
  <div className={[styles.errorState, className].join(' ')}>
    <p className={styles.message}>
      {message}
      {retry &&
        <span className={styles.retry} onClick={retry}>
          {' '}
          Try again.
        </span>
      }
    </p>
  </div>
);

export default ErrorState;
