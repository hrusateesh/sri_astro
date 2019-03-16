import { userConstants } from "../_constants";
import type { Action } from "../types/Action";

type State = {
  registering?: boolean
};

export function registration(state: State = {}, action: Action): State {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}
