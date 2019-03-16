// @flow
import { alertConstants } from "../_constants";
import type { Action } from "../types/Action";

type State = {
  type?: string,
  message?: string
};

export function alert(state: State = {}, action: Action): State {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "alert-success",
        message: action.payload
      };
    case alertConstants.ERROR:
      return {
        type: "alert-danger",
        message: action.payload
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
