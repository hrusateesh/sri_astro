import { userConstants } from '../_constants';

let user = localStorage.getItem('user');
user = (user != 'undefined')?JSON.parse(user):null;
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.CURRENT_USER_REQUEST:
      return {};
    case userConstants.CURRENT_USER_SUCCESS:
      return {
        user: action.user
      };
    case userConstants.CURRENT_USER_FAILURE:
      return {};
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}