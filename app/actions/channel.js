// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';

export function selectChannel(id: string): Action {
  return {
    type: actionTypes.SELECT_CHANNEL,
    payload: id
  };
}
