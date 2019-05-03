import type { User, ErrorObj } from "./Custom";

export type Action =
  | { type: "USER_REGISTER_REQUEST", payload: User }
  | { type: "USER_REGISTER_SUCCESS", payload?: any }
  | { type: "USER_REGISTER_FAILURE", payload: string }
  | { type: "USER_LOGIN_REQUEST", payload?: any }
  | { type: "USER_LOGIN_SUCCESS", payload: string }
  | { type: "USER_LOGIN_FAILURE", payload: string }
  | { type: "CURRENT_USER_REQUEST", payload?: any }
  | { type: "CURRENT_USER_SUCCESS", payload: User }
  | { type: "CURRENT_USER_FAILURE", payload: string }
  | { type: "FORGET_PASS_REQUEST", payload?: any }
  | { type: "FORGET_PASS_SUCCESS", payload: string }
  | { type: "FORGET_PASS_FAILURE", payload: string }
  | { type: "USERS_GETALL_REQUEST", payload?: any }
  | { type: "USERS_GETALL_SUCCESS", payload: Array<User> }
  | { type: "USERS_GETALL_FAILURE", payload: string }
  | { type: "USER_DELETE_REQUEST", payload: number }
  | { type: "USER_DELETE_SUCCESS", payload: number }
  | { type: "USER_DELETE_FAILURE", payload: ErrorObj }
  | { type: "USER_LOGOUT", payload?: any }
  | { type: "ALERT_SUCCESS", payload: string }
  | { type: "ALERT_ERROR", payload: string }
  | { type: "ALERT_CLEAR", payload?: any };
