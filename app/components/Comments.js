// @flow
import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import ErrorState from './core/ErrorState';
import InfiniteScroll from './core/InfiniteScroll';
import Loader from './core/Loader';
import type { PromiseAction } from '../constants/types';
import CommentType from '../dataTypes/commentType';
import styles from './Comments.scss';

type Props = {
  comments: CommentType[],
  pageToken: string,
  isFetching: boolean,
  error: boolean,
  activeVideoId: string,
  fetchComments: () => PromiseAction,
  postComment: (description: string) => PromiseAction
};

type State = {
  description: string,
  isPosting: boolean
};

export default class Comments extends Component<Props, State> {
  state = {
    description: '',
    isPosting: false
  };

  componentDidMount() {
    this.props.fetchComments();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { activeVideoId: id } = this.props;
    const { activeVideoId: nextId } = nextProps;
    if (id !== nextId) {
      this.props.fetchComments();
    }
  }

  handleChange = (event: SyntheticInputEvent<HTMLTextAreaElement>): void => {
    this.setState({ description: event.currentTarget.value });
  }

  handleSubmit = (event: SyntheticInputEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setState({ isPosting: true });
    this.props.postComment(this.state.description) // eslint-disable-line promise/catch-or-return
      .then(
        () => this.handleReset(),
        () => undefined
      )
      .then(() => this.setState({ isPosting: false }));
  }

  handleReset = (): void => {
    this.setState({ description: '' });
  }

  render() {
    const {
      comments,
      pageToken,
      isFetching,
      error,
      fetchComments
    } = this.props;
    const {
      description,
      isPosting
    } = this.state;
    if ((isFetching && !pageToken) || error) {
      return (
        <div className={styles.comments}>
          {isFetching ? (
            <Loader />
          ) : (
            <ErrorState
              color="white"
              message="Error requesting comments."
            />
          )}
        </div>
      );
    }

    return (
      <div className={styles.comments}>
        <InfiniteScroll
          pageToken={pageToken}
          isFetching={isFetching}
          loadMore={fetchComments}
        >
          <CommentForm
            description={description}
            isPosting={isPosting}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleReset={this.handleReset}
          />
          <CommentList
            comments={comments}
          />
        </InfiniteScroll>
      </div>
    );
  }
}
