// @flow
import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Loader from './core/Loader';
import ErrorState from './core/ErrorState';
import InfiniteScroll from './core/InfiniteScroll';
import CommentType from '../dataTypes/commentType';
import styles from './Comments.scss';

export default class Comments extends Component {
  props: {
    activeVideo: any,
    comments: CommentType[],
    isFetching: boolean,
    error: boolean,
    pageToken: string,
    fetchComments: () => Promise<any>,
    postComment: (description: string) => Promise<any>
  };

  state: {
    description: string,
    isPosting: boolean
  };

  handleChange: (event: any) => void;
  handleSubmit: () => void;
  handleReset: () => void;

  constructor(props: any) {
    super(props);
    this.state = {
      description: '',
      isPosting: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments();
  }

  componentWillReceiveProps(nextProps: any) {
    const { id } = this.props.activeVideo;
    const { id: nextId } = nextProps.activeVideo;
    if (id !== nextId) {
      this.props.fetchComments();
    }
  }

  handleChange(event: any) {
    const { value } = event.target;
    this.setState({ description: value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    this.setState({ isPosting: true });
    this.props.postComment(this.state.description)
      .then(
        () => this.handleReset(),
        () => undefined
      )
      .then(() => this.setState({ isPosting: false }));
  }

  handleReset() {
    this.setState({ description: '' });
  }

  render() {
    const {
      comments,
      isFetching,
      error,
      pageToken,
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
            <Loader className={styles.loader} />
          ) : (
            <ErrorState
              message={'Error requesting comments.'}
              className={styles.errorState}
            />
          )}
        </div>
      );
    }

    return (
      <div className={styles.comments}>
        <InfiniteScroll
          isFetching={isFetching}
          pageToken={pageToken}
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
