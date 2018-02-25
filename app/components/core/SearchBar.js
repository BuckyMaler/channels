// @flow
import React from 'react';
import { IconSearch, IconCancel } from './Icons';
import styles from './SearchBar.scss';

const SearchBar = ({
  disabled,
  placeholder,
  value,
  handleChange,
  handleReset
}: {
  disabled: boolean,
  placeholder: string,
  value: string,
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  handleReset: () => void
}) => (
  <div className={styles.searchBar}>
    <IconSearch className={disabled ? [styles.iconSearch, styles.isDisabled].join(' ') : styles.iconSearch} />
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
  </div>
);

export default SearchBar;
