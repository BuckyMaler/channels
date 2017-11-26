// @flow
import React from 'react';
import Comment from './core/Comment';
import CommentType from '../dataTypes/commentType';
import styles from './CommentList.scss';

const CommentList = ({
  comments
}: {
  comments: CommentType[]
}) => (
  <ul className={styles.commentList}>
    {comments.map(comment => (
      <Comment
        key={comment.id}
        author={comment.author}
        avatar={comment.avatar}
        description={comment.description}
        publishedAt={comment.publishedAt}
      />
    ))}
  </ul>
);

export default CommentList;
