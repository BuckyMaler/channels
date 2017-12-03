// @flow
import React, { Component } from 'react';
import { IconChannels } from './core/Icons';
import TitleBar from './TitleBar';
import Player from './Player';
import RatingBar from './RatingBar';
import Comments from '../containers/Comments';
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

  state: {
    isPosting: boolean
  };

  postRating: (rating: string) => void

  constructor(props: any) {
    super(props);
    this.state = { isPosting: false };
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
