/* eslint-disable no-undef */
import type { User } from "../types";

const api = {
  baseUrl: __API__,
  url: __API__ + "/api"
};

export const userService = {
  login,
  currentUser,
  logout,
  register,
  forgetPass,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username: string, password: string, remember_me: boolean): Promise<any> {
  return $formPost(api.url + "/login", { username, password, remember_me });
}

function currentUser(): Promise<any> {
  return $get(api.baseUrl + "/currentUser").then((data: any) => {
    if (data && data.result != "anonymousUser") {
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
  return $get(api.url + "/logout");
}

function forgetPass(username: string): any {
  return $post(api.baseUrl + "/forgetPass", { email: username });
}

function getAll(): any {
  return $get(api.url + "/users");
}

function getById(id: number): any {
  return $get(api.url + `/users/${id}`);
}

function register(user: User): any {
  return $post(api.baseUrl + "/register", user);
}

function update(user: User): any {
  return $put(api.url + `/users/${user.id}`, user);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: number): any {
  return $delete(api.url + `/users/${id}`);
}
