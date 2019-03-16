// @flow
import type { Action } from "../types/Action";
import { alertConstants } from "../_constants";

export const alertActions = {
  success,
  error,
  clear
};

function success(message: string): Action {
  return { type: alertConstants.SUCCESS, payload: message };
}

function error(message: string): Action {
  return { type: alertConstants.ERROR, payload: message };
}

function clear(): Action {
  return { type: alertConstants.CLEAR };
}
