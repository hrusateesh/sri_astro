/* @flow */
import { combineReducers } from "redux";
import { reducer as toastr } from "react-redux-toastr";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";

import type { Action } from "../types/Action";

const reducers = {
  toastr,
  authentication,
  registration,
  users,
  alert
};

export type Reducers = typeof reducers;
export default combineReducers<Object, Action>({ ...reducers });
