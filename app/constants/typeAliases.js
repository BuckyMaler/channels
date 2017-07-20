// @flow
export type Action = {
  type: string,
  payload?: any
};

export type AccessTokenState = {
  accessToken: string,
  isFetching?: boolean,
  error?: boolean
};
