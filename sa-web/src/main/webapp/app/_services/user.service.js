/* eslint-disable no-undef */
import config from "config";
import * as qs from "qs";
import type { User } from "../types/Custom";

export const userService = {
  login,
  currentUser,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username: string, password: string, remember_me: boolean): any {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: qs.stringify({ username, password, remember_me })
  };
  // $FlowFixMe: suppressing this error until we can refactor
  return $fetch(`${config.apiUrl}/login`, options);
}

function currentUser(): any {
  // $FlowFixMe: suppressing this error until we can refactor
  return $getJSON(`${config.apiBaseUrl}/currentUser`).then((data: any) => {
    if (data.result != "anonymousUser") {
      localStorage.setItem("user", JSON.stringify(data.result));
      return data.result;
    } else {
      localStorage.removeItem("user");
      return Promise.reject("anonymousUser");
    }
  });
}

function logout(): any {
  localStorage.removeItem("user");
  // $FlowFixMe: suppressing this error until we can refactor
  return $getJSON(`${config.apiUrl}/logout`);
}

function getAll(): any {
  // $FlowFixMe: suppressing this error until we can refactor
  return $getJSON(`${config.apiUrl}/users`);
}

function getById(id: number): any {
  // $FlowFixMe: suppressing this error until we can refactor
  return $getJSON(`${config.apiUrl}/users/${id}`);
}

function register(user: User): any {
  // $FlowFixMe: suppressing this error until we can refactor
  return $post(`${config.apiUrl}/users/register`, user);
}

function update(user: User): any {
  // $FlowFixMe: suppressing this error until we can refactor
  return $put(`${config.apiUrl}/users/${user.id}`, user);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: number): any {
  // $FlowFixMe: suppressing this error until we can refactor
  return $delete(`${config.apiUrl}/users/${id}`);
}
