// @flow
import React from 'react';
import Video from './Video';
import Loader from './Loader';
import BlankState from './BlankState';
import ErrorState from './ErrorState';
import InfiniteScroll from './InfiniteScroll';
import ChannelType from '../dataTypes/channelType';
import VideoType from '../dataTypes/videoType';
import styles from './VideoList.scss';

const VideoList = ({
  activeChannel,
  videos,
  isFetching,
  error,
  pageToken,
  fetchVideos,
  toggleChannelList
}: {
  activeChannel: ?ChannelType,
  videos: VideoType[],
  isFetching: boolean,
  error: boolean,
  pageToken: string,
  fetchVideos: () => Promise<any>,
  toggleChannelList: () => void
}) => {
  if (!activeChannel) {
    return (
      <div className={styles.videoList}>
        <div className={styles.notification}>
          <p className={styles.message}>
            No Active Channel
            <span>{"Well don't just sit there..."}</span>
          </p>
          <button className={styles.select} onClick={toggleChannelList}>Select a Channel</button>
        </div>
      </div>
    );
  }

  if ((isFetching && !pageToken) || error) {
    return (
      <div className={styles.videoList}>
        {isFetching ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <div className={styles.errorState}>
            <ErrorState
              message={'Error requesting videos.'}
              retry={fetchVideos}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.videoList}>
      {videos.length ? (
        <InfiniteScroll isFetching={isFetching} pageToken={pageToken} loadMore={fetchVideos}>
          <ul className={styles.videos}>
            {videos.map(video => (
              <Video
                key={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                description={video.description}
                publishedAt={video.publishedAt}
                viewCount={video.viewCount}
              />
            ))}
          </ul>
        </InfiniteScroll>
      ) : (
        <div className={styles.blankState}>
          <BlankState
            message={'No videos found.'}
          />
        </div>
      )}
    </div>
  );
};

export default VideoList;
