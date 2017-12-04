// @flow
import React from 'react';
import VideoType from '../../dataTypes/videoType';
import styles from './Video.scss';

const Video = ({
  title,
  thumbnail,
  description,
  publishedAt,
  viewCount,
  handleClick
}: {
  title: string,
  thumbnail: string,
  description?: string,
  publishedAt: string,
  viewCount: string,
  handleClick: (video: VideoType) => void
}) => (
  <li className={description != null ? styles.videoWithDescription : styles.video} onClick={handleClick}>
    <img className={styles.thumbnail} src={thumbnail} alt={title} />
    <div className={styles.information}>
      <h3 className={[styles.title, styles['css-truncate'], styles['css-truncate-target']].join(' ')}>{title}</h3>
      <span className={styles.date}>{publishedAt}</span>
      <span className={styles.views}>{viewCount} views</span>
      {description &&
        <p className={styles.description}>{description}</p>
      }
    </div>
  </li>
);

export default Video;
