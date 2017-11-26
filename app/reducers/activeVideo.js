// @flow
import actionTypes from '../constants/actionTypes';
import type { Action } from '../constants/typeAliases';

function activeVideo(state: any = {}, { type, payload }: Action): any {
  switch (type) {
    case actionTypes.UPDATE_ACTIVE_VIDEO:
    case actionTypes.UPDATE_ACTIVE_VIDEO_COUNTS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export default activeVideo;
