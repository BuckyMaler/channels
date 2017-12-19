// @flow
import React from 'react';
import Video from './core/Video';
import Loader from './core/Loader';
import BlankState from './core/BlankState';
import ErrorState from './core/ErrorState';
import InfiniteScroll from './core/InfiniteScroll';
import VideoType from '../dataTypes/videoType';
import type { PromiseAction } from '../constants/types';
import styles from './SearchResults.scss';

const SearchResults = ({
  results,
  pageToken,
  isFetching,
  error,
  searchResultsIsOpen,
  fetchSearch,
  selectResult
}: {
  results: VideoType[],
  pageToken: string,
  isFetching: boolean,
  error: boolean,
  searchResultsIsOpen: boolean,
  fetchSearch: () => PromiseAction,
  selectResult: (result: VideoType) => void
}) => (
  <div className={searchResultsIsOpen ? [styles.searchResults, styles.isOpen].join(' ') : styles.searchResults}>
    {(isFetching && !pageToken) || error ? (
      isFetching ? (
        <Loader />
      ) : (
        <ErrorState
          color="black"
          message="Error requesting videos."
        />
      )
    ) : (
      results.length ? (
        <InfiniteScroll
          pageToken={pageToken}
          maxHeight="350px"
          isFetching={isFetching}
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
                isSearchResult={true}
                handleClick={() => selectResult(result)}
              />
            ))}
          </ul>
        </InfiniteScroll>
      ) : (
        <BlankState
          color="black"
          message="No videos found."
        />
      )
    )}
  </div>
);

export default SearchResults;
