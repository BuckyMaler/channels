// @flow
import React from 'react';
import styles from './Video.scss';

const Video = ({
  title,
  thumbnail,
  description,
  publishedAt,
  viewCount
}: {
  title: string,
  thumbnail: string,
  description: string,
  publishedAt: string,
  viewCount: string
}) => (
  <li className={styles.video}>
    <div className={styles.thumbnail}>
      <img src={thumbnail} alt={title} />
    </div>
    <div className={styles.information}>
      <h3 className={`${styles.title} ${styles['css-truncate']} ${styles['css-truncate-target']}`}>{title}</h3>
      <span className={styles.date}>{publishedAt}</span>
      <span className={styles.views}>{viewCount} views</span>
      <p className={styles.description}>{description}</p>
    </div>
  </li>
);

export default Video;
