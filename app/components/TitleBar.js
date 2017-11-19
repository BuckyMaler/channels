// @flow
import React from 'react';
import styles from './TitleBar.scss';

const TitleBar = ({
  title
}: {
  title: string
}) => (
  <h3 className={[styles.title, styles['css-truncate'], styles['css-truncate-target']].join(' ')}>{title}</h3>
);

export default TitleBar;
