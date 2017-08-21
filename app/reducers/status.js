// @flow
import actionTypes from '../constants/actionTypes';
import type { Action, StatusState } from '../constants/typeAliases';
import placeholder from '../images/placeholder.jpg';

const initialState = {
  thumbnail: placeholder,
  title: 'Channels'
};

export default function status(state: StatusState = initialState, { type, payload }: Action): StatusState {
  switch (type) {
    case actionTypes.UPDATE_STATUS:
      return {
        title: payload.title,
        thumbnail: payload.thumbnail
      };
    default:
      return state;
  }
}
