// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import type { Dispatch } from 'redux';
import type { Action } from '../types';

import rootReducer from 'Reducers';

export const store = createStore<Object, Action, Dispatch<Action>>(rootReducer, applyMiddleware(thunk, createLogger()));
