// @flow
import React from 'react';
import Result from './Result';
import Loader from './Loader';
import BlankState from './BlankState';
import ErrorState from './ErrorState';
import InfiniteScroll from './InfiniteScroll';
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
      <div className={searchResultsIsOpen ? `${styles.searchResults} ${styles['searchResults--isOpen']}` : styles.searchResults}>
        {isFetching ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <div className={styles.errorState}>
            <ErrorState
              message={'Error requesting videos.'}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={searchResultsIsOpen ? `${styles.searchResults} ${styles['searchResults--isOpen']}` : styles.searchResults}>
      {results.length ? (
        <InfiniteScroll isFetching={isFetching} pageToken={pageToken} loadMore={fetchSearch}>
          <ul className={styles.results}>
            {results.map(result => (
              <Result
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
        <div className={styles.blankState}>
          <BlankState
            message={'No videos found.'}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
