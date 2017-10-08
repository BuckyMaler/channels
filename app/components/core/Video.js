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
  description?: string,
  publishedAt: string,
  viewCount: string
}) => (
  <li className={description !== undefined ? styles.videoWithDescription : styles.video}>
    <img className={styles.thumbnail} src={thumbnail} alt={title} />
    <div className={styles.information}>
      <h3 className={[styles.title, styles['css-truncate'], styles['css-truncate-target']].join(' ')}>{title}</h3>
      <span className={styles.date}>{publishedAt}</span>
      <span className={styles.views}>{viewCount} views</span>
      {description !== undefined &&
        <p className={styles.description}>{description}</p>
      }
    </div>
  </li>
);

export default Video;
