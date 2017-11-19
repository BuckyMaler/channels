// @flow
import React, { Component } from 'react';
import { IconChannels } from './core/Icons';
import TitleBar from './TitleBar';
import Player from './Player';
import RatingBar from './RatingBar';
import RatingType from '../dataTypes/ratingType';
import styles from './RightColumn.scss';

export default class RightColumn extends Component {
  props: {
    activeVideo: any,
    rating: ?RatingType,
    fetchRatings: () => Promise<any>,
    postRating: (type: string) => Promise<any>,
    updateActiveVideoCounts: (prevState: RatingType, rating: string) => void
  };

  postRating: (rating: string) => void

  constructor(props: any) {
    super(props);
    this.postRating = this.postRating.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    const { id } = this.props.activeVideo;
    const { id: nextId } = nextProps.activeVideo;
    if (id !== nextId) {
      this.props.fetchRatings();
    }
  }

  postRating(rating: string): void {
    this.props.postRating(rating).then(prevState => {
      this.props.updateActiveVideoCounts(prevState, rating);
    });
  }

  render() {
    const {
      activeVideo,
      rating
    } = this.props;
    if (!Object.keys(activeVideo).length) {
      return (
        <div className={styles.rightColumn}>
          <IconChannels styles={styles} />
        </div>
      );
    }

    return (
      <div className={styles.rightColumn}>
        <TitleBar title={activeVideo.title} />
        <Player id={activeVideo.id} />
        {rating && <RatingBar
          likeCount={activeVideo.likeCount}
          dislikeCount={activeVideo.dislikeCount}
          like={rating.like}
          dislike={rating.dislike}
          postLike={rating.like ?
            () => this.postRating('none') :
            () => this.postRating('like')}
          postDislike={rating.dislike ?
            () => this.postRating('none') :
            () => this.postRating('dislike')}
        />}
      </div>
    );
  }
}
