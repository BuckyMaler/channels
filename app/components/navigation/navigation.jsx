// @flow
import React from 'react';
import Toggle from './toggle';
import SearchBar from './searchBar';
import type { ToggleState, SearchBarState } from '../../constants/typeAliases';
import styles from './navigation.scss';

const Navigation = ({
  toggle,
  searchBar
}: {
  toggle: ToggleState,
  searchBar: SearchBarState
}) => (
  <div className={styles.navigation}>
    <Toggle
      thumbnail={toggle.thumbnail}
      title={toggle.title}
    />
    <SearchBar
      disabled={searchBar.disabled}
      placeholder={searchBar.placeholder}
      value={searchBar.value}
    />
  </div>
);

export default Navigation;
