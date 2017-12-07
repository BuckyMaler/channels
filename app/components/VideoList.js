// @flow
import React, { Component } from 'react';
import Video from './core/Video';
import Loader from './core/Loader';
import BlankState from './core/BlankState';
import ErrorState from './core/ErrorState';
import InfiniteScroll from './core/InfiniteScroll';
import VideoType from '../dataTypes/videoType';
import styles from './VideoList.scss';

export default class VideoList extends Component {
  props: {
    channelId: string,
    videos: VideoType[],
    isFetching: boolean,
    error: boolean,
    pageToken: string,
    fetchVideos: () => Promise<any>,
    updateActiveVideo: (video: VideoType) => void
  };

  componentDidMount() {
    this.props.fetchVideos();
  }

  componentWillReceiveProps(nextProps: any) {
    const id = this.props.channelId;
    const nextId = nextProps.channelId;
    if (id !== nextId) {
      this.props.fetchVideos();
    }
  }

  render() {
    const {
      videos,
      isFetching,
      error,
      pageToken,
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
              message={'Error requesting videos.'}
              color={'black'}
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
            isFetching={isFetching}
            pageToken={pageToken}
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
            message={'No videos found.'}
            color={'black'}
          />
        )}
      </div>
    );
  }
}
