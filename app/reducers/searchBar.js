// @flow
import type { Action, SearchBarState } from '../constants/typeAliases';

const initialState = {
  disabled: true,
  placeholder: 'Search Channels',
  value: ''
};

export default function searchBar(state: SearchBarState = initialState, { type, payload }: Action): SearchBarState {
  switch (type) {
    default:
      return state;
  }
}
