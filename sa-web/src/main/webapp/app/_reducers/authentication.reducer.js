// @flow
import { userConstants } from "../_constants";
import type { Action } from "../types/Action";
import type { User } from "../types/Custom";

type State = {
  user?: User,
  loggingIn?: boolean,
  error?: string
};

let user = localStorage.getItem("user");
user = user != "undefined" && user != null ? JSON.parse(user) : null;
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case userConstants.CURRENT_USER_REQUEST:
      return {};
    case userConstants.CURRENT_USER_SUCCESS:
      return { user: action.payload };
    case userConstants.CURRENT_USER_FAILURE:
      return {};
    case userConstants.LOGIN_REQUEST:
      return { loggingIn: true };
    case userConstants.LOGIN_SUCCESS:
      return { loggedIn: true };
    case userConstants.LOGIN_FAILURE:
      return { error: action.payload };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
