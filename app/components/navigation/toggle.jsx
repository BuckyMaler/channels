// @flow
import React from 'react';
import { IconArrowDropDown } from '../icons';
import styles from './toggle.scss';

const Toggle = ({
  thumbnail,
  title,
  toggleVisibility
}: {
  thumbnail: string,
  title: string,
  toggleVisibility: () => void
}) => (
  <div className={styles.toggle} onClick={toggleVisibility}>
    <img className={styles.thumbnail} src={thumbnail} />
    <h1 className={styles.title}>{title}</h1>
    <IconArrowDropDown styles={styles} />
  </div>
);

export default Toggle;
