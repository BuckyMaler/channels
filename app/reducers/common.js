// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/types';

export function createIsFetching(resource: string): (state: boolean, action: Action) => boolean {
  return function isFetching(state: boolean = false, action: Action): boolean {
    switch (action.type) {
      case actionTypes[`FETCH_${resource}_REQUEST`]:
        return true;
      case actionTypes[`FETCH_${resource}_SUCCESS`]:
      case actionTypes[`FETCH_${resource}_FAILURE`]:
        return false;
      default:
        return state;
    }
  };
}

export function createError(resource: string): (state: boolean, action: Action) => boolean {
  return function error(state: boolean = false, action: Action): boolean {
    switch (action.type) {
      case actionTypes[`FETCH_${resource}_REQUEST`]:
      case actionTypes[`FETCH_${resource}_SUCCESS`]:
        return false;
      case actionTypes[`FETCH_${resource}_FAILURE`]:
        return true;
      default:
        return state;
    }
  };
}
