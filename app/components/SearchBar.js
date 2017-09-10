// @flow
import React from 'react';
import { IconSearch, IconCancel } from './Icons';
import styles from './SearchBar.scss';

const SearchBar = ({
  disabled,
  placeholder
}: {
  disabled: boolean,
  placeholder: string
}) => (
  <form className={styles.searchBar}>
    {disabled && <IconSearch styles={styles} />}
    <input
      className={styles.searchInput}
      disabled={!disabled}
      placeholder={placeholder}
    />
    <IconCancel styles={styles} />
  </form>
);

export default SearchBar;
