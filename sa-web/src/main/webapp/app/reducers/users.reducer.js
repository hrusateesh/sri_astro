/* eslint-disable no-unused-vars */
import { userConstants } from 'Constants';
import type { Action } from '../types';
import type { User, ErrorObj } from '../types';
import type { Exact } from 'Types';

type State = {
  items?: Array<*> | any,
  loading?: boolean,
  error?: any
};

export function users(state: State = {}, action: Action): Exact<State> {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.payload
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.payload
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      if (!state.items) return { ...state };
      return {
        ...state,
        items: state.items.map((user: User) => {
          user.id === action.payload ? { ...user, deleting: true } : user;
        })
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state.
      if (!state.items) return {};
      return {
        items: state.items.filter((user: User) => {
          user.id !== action.payload;
        })
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      if (!state.items) return { ...state };
      return {
        ...state,
        items: state.items.map(
          (user: User): User => {
            let err: any = action.payload; // should be ErrorObj
            if (user.id === err.request) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...userCopy } = user;
              // return copy of user with 'deleteError:[error]' property
              return { ...userCopy, deleteError: err.error };
            }
            return user;
          }
        )
      };
    default:
      return state;
  }
}
