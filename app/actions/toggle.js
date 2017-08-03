// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';

export function toggleVisibility(): Action {
  return {
    type: actionTypes.TOGGLE_VISIBILITY
  };
}
