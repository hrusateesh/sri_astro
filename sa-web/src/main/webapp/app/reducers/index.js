/* @flow */
import { combineReducers } from "redux";

import { fetch } from "./fetch.reducer";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";

import type { Action } from "../types";

const reducers = {
  fetch,
  authentication,
  registration,
  users,
  alert
};

export type Reducers = typeof reducers;
export default combineReducers<Object, Action>({ ...reducers });
