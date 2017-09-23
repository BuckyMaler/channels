// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import styles from './InfiniteScroll.scss';

export default class InfiniteScroll extends Component {
  props: {
    children: Children,
    isFetching: boolean,
    pageToken: string,
    loadMore: () => Promise<any>
  };

  state: any;
  container: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.state = {
      isComplete: false
    };
  }

  handleScroll() {
    const { isFetching, pageToken, loadMore } = this.props;
    if (isFetching || this.state.isComplete) {
      return;
    }
    const { scrollTop, scrollHeight, offsetHeight } = this.container;
    if (scrollTop > scrollHeight - (offsetHeight * 2)) {
      loadMore().then(action => {
        if (action.payload.nextPageToken === pageToken) {
          this.setState(prevState => ({
            isComplete: !prevState.isComplete
          }));
        }
      });
    }
  }

  render() {
    return (
      <div className={styles.infiniteScroll} ref={node => { this.container = node; }} onScroll={this.handleScroll.bind(this)}>
        {this.props.children}
      </div>
    );
  }
}
