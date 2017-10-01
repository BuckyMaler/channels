// @flow
import React from 'react';
import styles from './Result.scss';

const Result = ({
  title,
  thumbnail,
  publishedAt,
  viewCount
}: {
  title: string,
  thumbnail: string,
  publishedAt: string,
  viewCount: string
}) => (
  <li className={styles.result}>
    <div className={styles.thumbnail}>
      <img src={thumbnail} alt={title} />
    </div>
    <div className={styles.information}>
      <h3 className={`${styles.title} ${styles['css-truncate']} ${styles['css-truncate-target']}`}>{title}</h3>
      <span className={styles.date}>{publishedAt}</span>
      <span className={styles.views}>{viewCount} views</span>
    </div>
  </li>
);

export default Result;
