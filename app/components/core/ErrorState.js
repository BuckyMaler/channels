// @flow
import React from 'react';
import { IconError } from './Icons';
import styles from './ErrorState.scss';

const ErrorState = ({
  message,
  color,
  retry
}: {
  message: string,
  color: string,
  retry?: () => Promise<any>
}) => (
  <div className={[styles.errorState, styles[color]].join(' ')}>
    <IconError className={styles.iconError} />
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
