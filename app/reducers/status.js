// @flow
import type { Action, StatusState } from '../constants/typeAliases';
import placeholder from '../images/placeholder.jpg';

const initialState = {
  thumbnail: placeholder,
  title: 'Channels'
};

export default function toggle(state: StatusState = initialState, { type, payload }: Action): StatusState {
  switch (type) {
    default:
      return state;
  }
}
