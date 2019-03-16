// @flow
import {userConstants} from '../_constants';
import {userService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';
import type {User} from '../types/Custom';
import type {Dispatch, GetState} from '../types/Store';

type ThunkAction = (dispatch: Dispatch, getState?: GetState) => any;

export const userActions = {
  currentUser,
  login,
  logout,
  register,
  getAll,
  delete: _delete
};

function currentUser(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({type: userConstants.CURRENT_USER_REQUEST});
    userService.currentUser().then(
      (user: User) => {
        dispatch({type: userConstants.CURRENT_USER_SUCCESS, payload: user});
      },
      (error: any) => {
        dispatch({type: userConstants.CURRENT_USER_FAILURE, payload: error});
      }
    );
  };
}

function login(username: string, password: string, remember_me: boolean): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({type: userConstants.LOGIN_REQUEST});
    userService.login(username, password, remember_me).then(
      () => {
        dispatch({type: userConstants.LOGIN_SUCCESS, payload: username});
        dispatch(currentUser());
      },
      () => {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          payload: 'Invalid Username or Password'
        });
        // dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function logout(): ThunkAction {
  return (dispatch: Dispatch) => {
    userService.logout().then(
      () => {
        dispatch({type: 'USER_LOGOUT'});
      },
      (error: any) => {
        dispatch({type: 'USER_LOGOUT'});
        // eslint-disable-next-line no-console
        console.log(error);
      }
    );
  };
}

function register(user: User): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({type: userConstants.REGISTER_REQUEST, payload: user});

    userService.register(user).then(
      () => {
        dispatch({type: userConstants.REGISTER_SUCCESS});
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      (error: any) => {
        dispatch({type: userConstants.REGISTER_FAILURE, payload: error});
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function getAll(): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({type: userConstants.GETALL_REQUEST});
    userService.getAll().then(
      (users: Array<User>) => {
        dispatch({type: userConstants.GETALL_SUCCESS, payload: users});
      },
      (error: any) => {
        dispatch({type: userConstants.GETALL_FAILURE, payload: error});
      }
    );
  };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: number): ThunkAction {
  return (dispatch: Dispatch) => {
    dispatch({type: userConstants.DELETE_REQUEST, payload: id});

    userService.delete(id).then(
      () => {
        dispatch({type: userConstants.DELETE_SUCCESS, payload: id});
      },
      (error: any) => {
        dispatch({
          type: userConstants.DELETE_FAILURE,
          payload: {request: id, error}
        });
      }
    );
  };
}
