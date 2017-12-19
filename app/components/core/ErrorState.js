// @flow
import React from 'react';
import { IconError } from './Icons';
import type { PromiseAction } from '../../constants/types';
import styles from './ErrorState.scss';

const ErrorState = ({
  color,
  message,
  retry
}: {
  color: string,
  message: string,
  retry?: () => PromiseAction
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

ErrorState.defaultProps = {
  retry: undefined
};

export default ErrorState;
