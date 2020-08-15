// @flow
import type { Action } from "../types";

type State = {
  type?: string,
  message?: string,
};

export function alert(state: State = {}, action: Action): State {
  switch (action.type) {
    case "ALERT_SUCCESS":
      return {
        type: "alert-success",
        message: action.payload,
      };
    case "ALERT_ERROR":
      return {
        type: "alert-danger",
        message: action.payload,
      };
    case "ALERT_CLEAR":
      return {};
    default:
      return state;
  }
}
