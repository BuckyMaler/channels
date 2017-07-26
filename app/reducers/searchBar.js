// @flow
import type { Action, SearchBarState as State } from '../constants/typeAliases';

const initialState = {
  disabled: true,
  placeholder: 'Search Channels',
  value: ''
};

export default function searchBar(state: State = initialState, { type, payload }: Action): State {
  switch (type) {
    default:
      return state;
  }
}
