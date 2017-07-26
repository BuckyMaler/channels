// @flow
import type { Action, ToggleState as State } from '../constants/typeAliases';
import placeholder from '../images/placeholder.jpg';

const initialState = {
  thumbnail: placeholder,
  title: 'Channels'
};

export default function toggle(state: State = initialState, { type, payload }: Action): State {
  switch (type) {
    default:
      return state;
  }
}
