// @flow
import React from 'react';
import { IconSearch, IconCancel } from './Icons';
import styles from './SearchBar.scss';

const SearchBar = ({
  disabled,
  placeholder,
  value,
  handleChange,
  handleSubmit,
  handleReset
}: {
  disabled: boolean,
  placeholder: string,
  value: string,
  handleChange: () => void,
  handleSubmit: () => void,
  handleReset: () => void
}) => (
  <form className={styles.searchBar} onSubmit={handleSubmit} onBlur={handleReset}>
    {disabled && <IconSearch styles={styles} />}
    <input
      className={styles.searchInput}
      disabled={!disabled}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
    {value &&
      <button className={styles.searchButton} type="reset" onClick={handleReset}>
        <IconCancel styles={styles} />
      </button>
    }
  </form>
);

export default SearchBar;
