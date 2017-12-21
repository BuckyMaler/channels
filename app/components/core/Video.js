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
  isSearchResult,
  handleClick
}: {
  title: string,
  thumbnail: string,
  description?: string,
  publishedAt: string,
  viewCount: string,
  isSearchResult?: boolean,
  handleClick: (video: VideoType) => void
}) => (
  <li className={isSearchResult ? [styles.video, styles.isSearchResult].join(' ') : styles.video} onClick={handleClick}>
    <img className={styles.thumbnail} src={thumbnail} alt={title} />
    <div className={styles.information}>
      <h3 className={[styles.title, styles['css-truncate'], styles['css-truncate-target']].join(' ')}>{title}</h3>
      <span className={styles.date}>{publishedAt}</span>
      <span className={styles.views}>{viewCount} views</span>
      {!isSearchResult &&
        <p className={styles.description}>{description}</p>
      }
    </div>
  </li>
);

Video.defaultProps = {
  description: '',
  isSearchResult: false
};

export default Video;
