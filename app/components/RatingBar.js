// @flow
import React from 'react';
import { IconThumbUp, IconThumbDown } from './core/Icons';
import { commaSeparateNumber } from '../utils/utils';
import styles from './RatingBar.scss';

const RatingBar = ({
  likeCount,
  dislikeCount,
  like,
  dislike,
  postLike,
  postDislike
}: {
  likeCount: string,
  dislikeCount: string,
  like: boolean,
  dislike: boolean,
  postLike: (type: string) => void,
  postDislike: (type: string) => void
}) => (
  <div className={styles.ratingBar}>
    <p className={styles.statistics}>
      {commaSeparateNumber(likeCount)} <span>likes &</span> {commaSeparateNumber(dislikeCount)} <span>dislikes</span>
    </p>
    <div className={styles.rating}>
      <label>
        <IconThumbUp className={like ? styles.active : styles.inactive} />
        <input type="checkbox" name="like" checked={like} onChange={postLike} />
      </label>
      <label>
        <IconThumbDown className={dislike ? styles.active : styles.inactive} />
        <input type="checkbox" name="dislike" checked={dislike} onChange={postDislike} />
      </label>
    </div>
  </div>
);

export default RatingBar;
