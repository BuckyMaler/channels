// @flow
import React from 'react';
import styles from './CommentForm.scss';

const CommentForm = ({
  description,
  handleChange,
  handleSubmit,
  handleReset
}: {
  description: string,
  handleChange: (event: any) => void,
  handleSubmit: () => void,
  handleReset: () => void
}) => (
  <form className={styles.commentForm} onSubmit={handleSubmit}>
    <textarea
      className={styles.textarea}
      placeholder="Add a public comment..."
      value={description}
      onChange={handleChange}
    />
    <div className={styles.btns}>
      <button className={styles.cancelBtn} type="reset" value="Cancel" onClick={handleReset}>Cancel</button>
      <button className={styles.submitBtn} type="submit" value="Comment">Comment</button>
    </div>
  </form>
);

export default CommentForm;
