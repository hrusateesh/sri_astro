// @flow
// Workaround described here : https://github.com/facebook/flow/issues/2405#issuecomment-253153366
export type Exact<T> = T & $Shape<T>;
export type EmptyComponent = void => null;
import type { Action } from './Action';
import type { User, ErrorObj, Alert } from './Custom';
import type { State } from './State';
import type { Store, GetState, Dispatch, Thunk } from './Store';
export type { Action, User, ErrorObj, Alert, State, Store, GetState, Dispatch, Thunk };
