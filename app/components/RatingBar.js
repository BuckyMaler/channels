// @flow
import React from 'react';
import { IconThumbUp, IconThumbDown } from './core/Icons';
import RatingType from '../dataTypes/ratingType';
import { commaSeparateNumber } from '../utils/utils';
import styles from './RatingBar.scss';

const RatingBar = ({
  likeCount,
  dislikeCount,
  rating,
  isPosting,
  postRating
}: {
  likeCount: string,
  dislikeCount: string,
  rating: ?RatingType,
  isPosting: boolean,
  postRating: (type: string) => void
}) => (
  <div className={styles.ratingBar}>
    <p className={styles.statistics}>
      {commaSeparateNumber(likeCount)} <span>likes &</span> {commaSeparateNumber(dislikeCount)} <span>dislikes</span>
    </p>
    {rating &&
      <div className={styles.rating}>
        <label>
          <IconThumbUp className={rating.like ? styles.active : styles.inactive} />
          <input
            type="checkbox"
            name="like"
            checked={rating.like}
            disabled={isPosting}
            onChange={rating.like ?
              () => postRating('none') :
              () => postRating('like')}
          />
        </label>
        <label>
          <IconThumbDown className={rating.dislike ? styles.active : styles.inactive} />
          <input
            type="checkbox"
            name="dislike"
            checked={rating.dislike}
            disabled={isPosting}
            onChange={rating.dislike ?
              () => postRating('none') :
              () => postRating('dislike')}
          />
        </label>
      </div>
    }
  </div>
);

export default RatingBar;
