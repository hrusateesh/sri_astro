// @flow
// Workaround described here : https://github.com/facebook/flow/issues/2405#issuecomment-253153366
export type Exact<T> = T & $Shape<T>;

export type EmptyComponent = void => null;
