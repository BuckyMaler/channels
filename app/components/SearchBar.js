// @flow
import React from 'react';
import { IconSearch, IconCancel } from './core/Icons';
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
    {!disabled && <IconSearch className={styles.iconSearch} />}
    <input
      className={styles.searchInput}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
    {value &&
      <button className={styles.resetBtn} type="reset" onClick={handleReset}>
        <IconCancel className={styles.iconCancel} />
      </button>
    }
  </form>
);

export default SearchBar;
