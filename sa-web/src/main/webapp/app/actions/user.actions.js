// @flow
import { userConstants } from "Constants";
import { userService } from "Services";
import { successAlert, fetchFailAlert } from "./";
import { history } from "Helpers";

import type { User, Dispatch } from "../types";

// type ThunkAction = (dispatch: Dispatch, getState?: GetState) => any;

const currUserLoading = () => ({ type: userConstants.CURRENT_USER_REQUEST });
const currUserLoaded = (user: User) => ({ type: userConstants.CURRENT_USER_SUCCESS, payload: user });
const currUserLoadError = () => ({ type: userConstants.CURRENT_USER_FAILURE });

export const currentUser = () => (dispatch: Dispatch) => {
  dispatch(currUserLoading());
  userService.currentUser().then(
    (user: User) => dispatch(currUserLoaded(user)),
    () => {
      dispatch(currUserLoadError());
      dispatch(fetchFailAlert());
    }
  );
};

const userLoggingin = (username: string) => ({ type: userConstants.LOGIN_REQUEST, payload: username });
const userLoggedin = (username: string) => ({ type: userConstants.LOGIN_SUCCESS, payload: username });
const userLoginError = (error: string) => ({ type: userConstants.LOGIN_FAILURE, payload: error });

export const login = (username: string, password: string, remember_me: boolean) => (dispatch: Dispatch) => {
  dispatch(userLoggingin(username));
  userService.login(username, password, remember_me).then(
    () => {
      dispatch(userLoggedin(username));
      dispatch(currentUser());
    },
    (error: any) => {
      dispatch(userLoginError(error.status && error.status == 401 ? "Invalid Username or Password" : error));
      if (!(error.status && error.status == 401)) {
        dispatch(fetchFailAlert());
      }
    }
  );
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
  userService.logout();
};

const registering = (user: User) => ({ type: userConstants.REGISTER_REQUEST, payload: user });
const registered = (displayName: string) => ({ type: userConstants.REGISTER_SUCCESS, payload: displayName });
const registerError = (error: string) => ({ type: userConstants.REGISTER_FAILURE, payload: error });

export const register = (user: User) => (dispatch: Dispatch) => {
  dispatch(registering(user));

  userService.register(user).then(
    () => {
      dispatch(registered(user.displayName));
      history.push("/signupSuccess");
      dispatch(successAlert("Registration successful"));
    },
    (error: any) => {
      dispatch(registerError(error));
      dispatch(fetchFailAlert());
    }
  );
};

const forgetPassRequest = (username: string) => ({ type: userConstants.FORGET_PASS_REQUEST, payload: username });
const forgetPassRequested = () => ({ type: userConstants.FORGET_PASS_SUCCESS });
const forgetPassRequestError = (error: string) => ({ type: userConstants.FORGET_PASS_FAILURE, payload: error });

export const forgetPass = (username: string) => (dispatch: Dispatch) => {
  dispatch(forgetPassRequest(username));
  userService.forgetPass(username).then(
    () => {
      dispatch(forgetPassRequested());
    },
    (error: any) => {
      dispatch(forgetPassRequestError(error));
      dispatch(fetchFailAlert());
    }
  );
};

const loadingAllUsers = () => ({ type: userConstants.GETALL_REQUEST });
const loadedAllUsers = (users: Array<User>) => ({ type: userConstants.GETALL_SUCCESS, payload: users });
const loadingAllUsersError = (error: string) => ({ type: userConstants.GETALL_FAILURE, payload: error });

export const getAll = () => (dispatch: Dispatch) => {
  dispatch(loadingAllUsers());
  userService.getAll().then(
    (users: Array<User>) => {
      dispatch(loadedAllUsers(users));
    },
    (error: any) => {
      dispatch(loadingAllUsersError(error));
      dispatch(fetchFailAlert());
    }
  );
};

// prefixed function name with underscore because delete is a reserved word in javascript
export const _delete = (id: number) => (dispatch: Dispatch) => {
  dispatch({ type: userConstants.DELETE_REQUEST, payload: id });

  userService.delete(id).then(
    () => {
      dispatch({ type: userConstants.DELETE_SUCCESS, payload: id });
    },
    (error: any) => {
      dispatch({
        type: userConstants.DELETE_FAILURE,
        payload: { request: id, error }
      });
      dispatch(fetchFailAlert());
    }
  );
};

export const userActions = {
  currentUser,
  login,
  logout,
  register,
  forgetPass,
  getAll,
  delete: _delete
};
