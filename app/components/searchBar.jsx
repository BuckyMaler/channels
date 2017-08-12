// @flow
import React from 'react';
import { IconSearch, IconCancel } from './icons';
import styles from './searchBar.scss';

const SearchBar = ({
  disabled,
  placeholder,
  value
}: {
  disabled: boolean,
  placeholder: string,
  value: string
}) => (
  <form className={styles.searchBar}>
    <IconSearch styles={styles} />
    <input
      className={styles.searchInput}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
    />
    <IconCancel
      styles={styles}
      value={value}
    />
  </form>
);

export default SearchBar;
