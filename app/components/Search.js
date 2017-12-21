// @flow
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import type { PromiseAction } from '../constants/types';
import ChannelType from '../dataTypes/channelType';
import VideoType from '../dataTypes/videoType';
import styles from './Search.scss';

type Props = {
  query: string,
  results: VideoType[],
  pageToken: string,
  isFetching: boolean,
  error: boolean,
  activeChannel: ?ChannelType,
  fetchSearch: () => PromiseAction,
  updateSearch: (query: string) => void,
  clearSearch: () => void,
  updateActiveVideo: (video: VideoType) => void
};

export default class Search extends Component<Props> {
  handleChange = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    if (!value) {
      this.handleReset();
    } else {
      this.props.updateSearch(value);
    }
    this.props.fetchSearch();
  }

  handleSubmit = (event: SyntheticInputEvent<HTMLFormElement>): void => {
    event.preventDefault();
  }

  handleReset = (): void => {
    this.props.clearSearch();
  }

  selectResult = (result: VideoType): void => {
    this.props.updateActiveVideo(result);
    this.handleReset();
  }

  render() {
    const {
      query,
      results,
      pageToken,
      isFetching,
      error,
      activeChannel,
      fetchSearch
    } = this.props;
    return (
      <form className={query ? [styles.search, styles.isActive].join(' ') : styles.search} onSubmit={this.handleSubmit}>
        <div className={styles.closeTarget} onClick={this.handleReset} />
        <SearchBar
          disabled={!activeChannel}
          placeholder={activeChannel ? `Search ${activeChannel.title}` : 'The Mac App For YouTube Channels.'}
          value={query}
          handleChange={this.handleChange}
          handleReset={this.handleReset}
        />
        <SearchResults
          results={results}
          pageToken={pageToken}
          isFetching={isFetching}
          error={error}
          searchResultsIsOpen={!!query}
          fetchSearch={fetchSearch}
          selectResult={this.selectResult}
        />
      </form>
    );
  }
}
