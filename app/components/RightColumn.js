// @flow
import React from 'react';
import Player from './Player';
import TitleBar from './TitleBar';
import { IconChannels } from './core/Icons';
import Comments from '../containers/Comments';
import RatingBar from '../containers/RatingBar';
import styles from './RightColumn.scss';

const RightColumn = ({
  activeVideo
}: {
  activeVideo: any
}) => {
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
      <Player activeVideoId={activeVideo.id} />
      <RatingBar
        activeVideoId={activeVideo.id}
        likeCount={activeVideo.likeCount}
        dislikeCount={activeVideo.dislikeCount}
      />
      <Comments activeVideoId={activeVideo.id} />
    </div>
  );
};

export default RightColumn;
