// @flow
import React from 'react';
import styles from './SelectChannel.scss';

const SelectChannel = ({
  toggleChannelList
}: {
  toggleChannelList: () => void
}) => (
  <div className={styles.selectChannel}>
    <div className={styles.prompt}>
      <p className={styles.message}>
        No Active Channel
        <span>{"Well don't just sit there..."}</span>
      </p>
      <button className={styles.select} onClick={toggleChannelList}>
        Select a Channel
      </button>
    </div>
  </div>
);

export default SelectChannel;
