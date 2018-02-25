// @flow
import React, { Component } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './core/SearchBar';
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
      <form
        className={styles.search}
        style={query ? { zIndex: '1' } : {}}
        onSubmit={this.handleSubmit}
      >
        <SearchBar
          disabled={!activeChannel}
          placeholder={activeChannel ? `Search ${activeChannel.title}` : ''}
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
          handleReset={this.handleReset}
          selectResult={this.selectResult}
        />
      </form>
    );
  }
}
