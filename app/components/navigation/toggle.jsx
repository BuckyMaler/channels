// @flow
import React from 'react';
import { IconArrowDropDown } from '../icons';
import styles from './toggle.scss';

const Toggle = ({
  thumbnail,
  title
}: {
  thumbnail: string,
  title: string
}) => (
  <div className={styles.toggle}>
    <img className={styles.thumbnail} src={thumbnail} />
    <h1 className={styles.title}>{title}</h1>
    <IconArrowDropDown styles={styles} />
  </div>
);

export default Toggle;
