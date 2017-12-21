// @flow
import React, { Component } from 'react';
import { IconThumbUp, IconThumbDown } from './core/Icons';
import type { PromiseAction } from '../constants/types';
import RatingType from '../dataTypes/ratingType';
import { commaSeparateNumber } from '../utils/utils';
import styles from './RatingBar.scss';

type Props = {
  rating: ?RatingType,
  activeVideoId: string,
  likeCount: string,
  dislikeCount: string,
  fetchRatings: () => PromiseAction,
  postRating: (type: string) => Promise<RatingType>,
  updateActiveVideoCounts: (prevRating: RatingType, rating: string) => void
};

type State = {
  isPosting: boolean
};

export default class RatingBar extends Component<Props, State> {
  state = {
    isPosting: false
  };

  componentDidMount() {
    this.props.fetchRatings();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { activeVideoId: id } = this.props;
    const { activeVideoId: nextId } = nextProps;
    if (id !== nextId) {
      this.props.fetchRatings();
    }
  }

  handleChange = (rating: string): void => {
    this.setState({ isPosting: true });
    this.props.postRating(rating) // eslint-disable-line promise/catch-or-return
      .then(
        prevRating => this.props.updateActiveVideoCounts(prevRating, rating),
        () => undefined
      )
      .then(() => this.setState({ isPosting: false }));
  }

  render() {
    const {
      rating,
      likeCount,
      dislikeCount
    } = this.props;
    const {
      isPosting
    } = this.state;
    return (
      <div className={styles.ratingBar}>
        <p className={styles.statistics}>
          {commaSeparateNumber(likeCount)}
          <span> likes & </span>
          {commaSeparateNumber(dislikeCount)}
          <span> dislikes</span>
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
                  () => this.handleChange('none') :
                  () => this.handleChange('like')}
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
                  () => this.handleChange('none') :
                  () => this.handleChange('dislike')}
              />
            </label>
          </div>
        }
      </div>
    );
  }
}
