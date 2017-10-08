// @flow
import React from 'react';
import { IconSpinner } from './Icons';
import styles from './Loader.scss';

const Loader = ({
  className
}: {
  className?: string
}) => (
  <div className={[styles.loader, className].join(' ')}>
    <IconSpinner className={styles.iconSpinner} />
  </div>
);

export default Loader;
