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
  activeVideo: any,
  comments: CommentType[],
  pageToken: string,
  isFetching: boolean,
  error: boolean,
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
    const { id } = this.props.activeVideo;
    const { id: nextId } = nextProps.activeVideo;
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
    this.props.postComment(this.state.description)
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
    return (
      <div className={styles.comments}>
        {(isFetching && !pageToken) || error ? (
          isFetching ? (
            <Loader />
          ) : (
            <ErrorState
              color="white"
              message="Error requesting comments."
            />
          )
        ) : (
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
        )}
      </div>
    );
  }
}
