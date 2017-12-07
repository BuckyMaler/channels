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
  searchResultsIsOpen,
  handleSelect
}: {
  results: VideoType[],
  isFetching: boolean,
  error: boolean,
  pageToken: string,
  fetchSearch: () => Promise<any>,
  searchResultsIsOpen: boolean,
  handleSelect: (video: VideoType) => void
}) => {
  if ((isFetching && !pageToken) || error) {
    return (
      <div className={searchResultsIsOpen ? [styles.searchResults, styles.isOpen].join(' ') : styles.searchResults}>
        {isFetching ? (
          <Loader />
        ) : (
          <ErrorState
            message={'Error requesting videos.'}
            color={'black'}
          />
        )}
      </div>
    );
  }

  return (
    <div className={searchResultsIsOpen ? [styles.searchResults, styles.isOpen].join(' ') : styles.searchResults}>
      {results.length ? (
        <InfiniteScroll
          isFetching={isFetching}
          pageToken={pageToken}
          maxHeight={'350px'}
          loadMore={fetchSearch}
        >
          <ul className={styles.results}>
            {results.map(result => (
              <Video
                key={result.id}
                title={result.title}
                thumbnail={result.thumbnail}
                publishedAt={result.publishedAt}
                viewCount={result.viewCount}
                handleClick={() => handleSelect(result)}
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
};

export default SearchResults;
