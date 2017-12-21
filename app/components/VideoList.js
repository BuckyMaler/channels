// @flow
import React, { Component } from 'react';
import BlankState from './core/BlankState';
import ErrorState from './core/ErrorState';
import InfiniteScroll from './core/InfiniteScroll';
import Loader from './core/Loader';
import Video from './core/Video';
import type { PromiseAction } from '../constants/types';
import VideoType from '../dataTypes/videoType';
import styles from './VideoList.scss';

type Props = {
  videos: VideoType[],
  pageToken: string,
  isFetching: boolean,
  error: boolean,
  activeChannelId: string,
  fetchVideos: () => PromiseAction,
  updateActiveVideo: (video: VideoType) => void
};

export default class VideoList extends Component<Props> {
  componentDidMount() {
    this.props.fetchVideos();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { activeChannelId: id } = this.props;
    const { activeChannelId: nextId } = nextProps;
    if (id !== nextId) {
      this.props.fetchVideos();
    }
  }

  render() {
    const {
      videos,
      pageToken,
      isFetching,
      error,
      fetchVideos,
      updateActiveVideo
    } = this.props;
    if ((isFetching && !pageToken) || error) {
      return (
        <div className={styles.videoList}>
          {isFetching ? (
            <Loader />
          ) : (
            <ErrorState
              color="black"
              message="Error requesting videos."
              retry={fetchVideos}
            />
          )}
        </div>
      );
    }

    return (
      <div className={styles.videoList}>
        {videos.length ? (
          <InfiniteScroll
            pageToken={pageToken}
            isFetching={isFetching}
            loadMore={fetchVideos}
          >
            <ul className={styles.videos}>
              {videos.map(video => (
                <Video
                  key={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  description={video.description}
                  publishedAt={video.publishedAt}
                  viewCount={video.viewCount}
                  handleClick={() => updateActiveVideo(video)}
                />
              ))}
            </ul>
          </InfiniteScroll>
        ) : (
          <BlankState
            color="black"
            message="No videos found."
          />
        )}
      </div>
    );
  }
}
