// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, SearchBarState } from '../constants/typeAliases';

const initialState = {
  disabled: true,
  placeholder: 'Search Channels',
  value: ''
};

export default function searchBar(state: SearchBarState = initialState, { type, payload }: Action): SearchBarState {
  switch (type) {
    case actionTypes.ENABLE_SEARCH_BAR:
      return {
        ...state,
        disabled: false,
        placeholder: !payload ? 'Search' : `Search ${payload}`
      };
    default:
      return state;
  }
}
