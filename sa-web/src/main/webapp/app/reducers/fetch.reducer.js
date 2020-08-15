// @flow
import { appConstants } from "Constants";
import type { Action } from "../types";

type State = {
  type?: string,
  message?: string,
};

export function fetch(state: State = {}, action: Action): State {
  if (action.payload && action.payload.readyState != undefined) {
    action.payload = appConstants.fetchError;
  }
  return state;
}
