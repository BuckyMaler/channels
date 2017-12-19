// @flow
import React, { Component } from 'react';
import Player from './Player';
import RatingBar from './RatingBar';
import TitleBar from './TitleBar';
import { IconChannels } from './core/Icons';
import type { PromiseAction } from '../constants/types';
import Comments from '../containers/Comments';
import RatingType from '../dataTypes/ratingType';
import styles from './RightColumn.scss';

type Props = {
  activeVideo: any,
  rating: ?RatingType,
  fetchRatings: () => PromiseAction,
  postRating: (type: string) => Promise<RatingType>,
  updateActiveVideoCounts: (prevState: RatingType, rating: string) => void
};

type State = {
  isPosting: boolean
};

export default class RightColumn extends Component<Props, State> {
  state = {
    isPosting: false
  };

  componentWillReceiveProps(nextProps: Props) {
    const { id } = this.props.activeVideo;
    const { id: nextId } = nextProps.activeVideo;
    if (id !== nextId) {
      this.props.fetchRatings();
    }
  }

  postRating = (rating: string): void => {
    this.setState({ isPosting: true });
    this.props.postRating(rating)
      .then(
        prevRating => this.props.updateActiveVideoCounts(prevRating, rating),
        () => undefined
      )
      .then(() => this.setState({ isPosting: false }));
  }

  render() {
    const {
      activeVideo,
      rating
    } = this.props;
    const {
      isPosting
    } = this.state;
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
        <RatingBar
          likeCount={activeVideo.likeCount}
          dislikeCount={activeVideo.dislikeCount}
          rating={rating}
          isPosting={isPosting}
          postRating={this.postRating}
        />
        <Comments />
      </div>
    );
  }
}
