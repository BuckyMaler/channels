// @flow
import React from 'react';
import BlankState from './core/BlankState';
import ErrorState from './core/ErrorState';
import InfiniteScroll from './core/InfiniteScroll';
import Loader from './core/Loader';
import Modal from './core/Modal';
import Video from './core/Video';
import type { PromiseAction } from '../constants/types';
import VideoType from '../dataTypes/videoType';
import styles from './SearchResults.scss';

const SearchResults = ({
  results,
  pageToken,
  isFetching,
  error,
  searchResultsIsOpen,
  fetchSearch,
  handleReset,
  selectResult
}: {
  results: VideoType[],
  pageToken: string,
  isFetching: boolean,
  error: boolean,
  searchResultsIsOpen: boolean,
  fetchSearch: () => PromiseAction,
  handleReset: () => void,
  selectResult: (result: VideoType) => void
}) => {
  if ((isFetching && !pageToken) || error) {
    return (
      <Modal
        isOpen={searchResultsIsOpen}
        stylesProp={styles}
        handleClick={handleReset}
      >
        {isFetching ? (
          <Loader />
        ) : (
          <ErrorState
            color="black"
            message="Error requesting videos."
          />
        )}
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={searchResultsIsOpen}
      stylesProp={styles}
      handleClick={handleReset}
    >
      {results.length ? (
        <InfiniteScroll
          pageToken={pageToken}
          isFetching={isFetching}
          maxHeight="350px"
          loadMore={fetchSearch}
        >
          <ul className={styles.searchResults}>
            {results.map(result => (
              <Video
                key={result.id}
                title={result.title}
                thumbnail={result.thumbnail}
                publishedAt={result.publishedAt}
                viewCount={result.viewCount}
                isSearchResult
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
      )}
    </Modal>
  );
};

export default SearchResults;
