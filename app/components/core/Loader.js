// @flow
import React from 'react';
import { IconSpinner } from './Icons';
import styles from './Loader.scss';

const Loader = () => (
  <div className={styles.loader}>
    <IconSpinner className={styles.iconSpinner} />
  </div>
);

export default Loader;
