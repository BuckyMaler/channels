// @flow
import React from 'react';
import Video from './core/Video';
import Loader from './core/Loader';
import BlankState from './core/BlankState';
import ErrorState from './core/ErrorState';
import InfiniteScroll from './core/InfiniteScroll';
import VideoType from '../dataTypes/videoType';
import styles from './SearchResults.scss';

const SearchResults = ({
  results,
  isFetching,
  error,
  pageToken,
  fetchSearch,
  searchResultsIsOpen
}: {
  results: VideoType[],
  isFetching: boolean,
  error: boolean,
  pageToken: string,
  fetchSearch: () => Promise<any>,
  searchResultsIsOpen: boolean
}) => {
  if ((isFetching && !pageToken) || error) {
    return (
      <div className={searchResultsIsOpen ? styles.searchResultsIsOpen : styles.searchResults}>
        {isFetching ? (
          <Loader
            className={styles.loader}
          />
        ) : (
          <ErrorState
            message={'Error requesting videos.'}
            className={styles.errorState}
          />
        )}
      </div>
    );
  }

  return (
    <div className={searchResultsIsOpen ? styles.searchResultsIsOpen : styles.searchResults}>
      {results.length ? (
        <InfiniteScroll isFetching={isFetching} pageToken={pageToken} loadMore={fetchSearch} className={styles.infiniteScroll}>
          <ul className={styles.results}>
            {results.map(result => (
              <Video
                key={result.id}
                title={result.title}
                thumbnail={result.thumbnail}
                publishedAt={result.publishedAt}
                viewCount={result.viewCount}
              />
            ))}
          </ul>
        </InfiniteScroll>
      ) : (
        <BlankState
          message={'No videos found.'}
          className={styles.blankState}
        />
      )}
    </div>
  );
};

export default SearchResults;
