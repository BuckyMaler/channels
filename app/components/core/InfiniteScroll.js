// @flow
import * as React from 'react';
import type { PromiseAction } from '../../constants/types';
import styles from './InfiniteScroll.scss';

type Props = {
  children: React.Node,
  pageToken: string,
  isFetching: boolean,
  maxHeight?: string,
  loadMore: () => PromiseAction
};

type State = {
  isComplete: boolean
};

export default class InfiniteScroll extends React.Component<Props, State> {
  container: ?HTMLDivElement;

  static defaultProps = {
    maxHeight: ''
  };

  state = {
    isComplete: false
  };

  handleScroll = (): void => {
    const { pageToken, isFetching, loadMore } = this.props;
    if (!this.container
        || !pageToken
        || isFetching
        || this.state.isComplete) {
      return;
    }
    const { scrollTop, scrollHeight, offsetHeight } = this.container;
    if (scrollTop > scrollHeight - (offsetHeight * 2)) {
      // eslint-disable-next-line promise/catch-or-return
      loadMore().then(action => {
        // eslint-disable-next-line promise/always-return
        if (action.payload && action.payload.nextPageToken === pageToken) {
          this.setState({ isComplete: true });
        }
      });
    }
  }

  render() {
    const {
      children,
      maxHeight
    } = this.props;
    return (
      <div
        className={styles.infiniteScroll}
        style={maxHeight ? { maxHeight } : {}}
        ref={node => { this.container = node; }}
        onScroll={this.handleScroll}
      >
        {children}
      </div>
    );
  }
}
