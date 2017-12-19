// @flow
import React from 'react';
import styles from './Comment.scss';

const Comment = ({
  author,
  avatar,
  description,
  publishedAt
}: {
  author: string,
  avatar: string,
  description: string,
  publishedAt: Date
}) => (
  <li className={styles.comment}>
    <img className={styles.avatar} src={avatar} alt={author} />
    <div>
      <span className={styles.author}>{author}</span>
      <span className={styles.date}>{publishedAt}</span>
      <p className={styles.description}>{description}</p>
    </div>
  </li>
);

export default Comment;
