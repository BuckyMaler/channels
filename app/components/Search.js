// @flow
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import ChannelType from '../dataTypes/channelType';
import VideoType from '../dataTypes/videoType';
import styles from './Search.scss';

export default class Search extends Component {
  props: {
    activeChannel: ?ChannelType,
    query: string,
    results: VideoType[],
    isFetching: boolean,
    error: boolean,
    pageToken: string,
    fetchSearch: () => Promise<any>,
    updateSearch: (query: string) => void,
    clearSearch: () => void,
    updateActiveVideo: (video: VideoType) => void
  };

  handleChange: () => void
  handleSubmit: () => void
  handleReset: () => void
  handleSelect: (result: VideoType) => void

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event: any): void {
    const { value } = event.target;
    if (!value) {
      this.handleReset();
    } else {
      this.props.updateSearch(value);
    }
    this.props.fetchSearch();
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
  }

  handleReset(): void {
    this.props.clearSearch();
  }

  handleSelect(video: VideoType): void {
    this.props.updateActiveVideo(video);
    this.handleReset();
  }

  render() {
    const {
      activeChannel,
      query,
      results,
      isFetching,
      error,
      pageToken,
      fetchSearch
    } = this.props;
    return (
      <form className={query ? styles.searchIsActive : styles.search} onSubmit={this.handleSubmit}>
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
          isFetching={isFetching}
          error={error}
          pageToken={pageToken}
          fetchSearch={fetchSearch}
          searchResultsIsOpen={!!query}
          handleSelect={this.handleSelect}
        />
      </form>
    );
  }
}
