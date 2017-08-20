// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';

export function enableSearchBar(title: string): Action {
  return {
    type: actionTypes.ENABLE_SEARCH_BAR,
    payload: title
  };
}
