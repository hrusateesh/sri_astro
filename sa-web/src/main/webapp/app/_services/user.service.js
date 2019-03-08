import config from 'config';
import * as qs from 'qs';

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

function login(username, password, remember_me) {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: qs.stringify({username,password, remember_me}),
    };
    return $fetch(`${config.apiUrl}/login`, options);
}

function currentUser() {
    return $getJSON(`${config.apiBaseUrl}/currentUser`)
        .then(data => {
            if(data.result != 'anonymousUser') {
                localStorage.setItem('user', JSON.stringify(data.result));
                return data.result;
            } else {
                localStorage.removeItem('user');
                return Promise.reject('anonymousUser');
            }
        });
}

function logout() {
    localStorage.removeItem('user');
    return $getJSON(`${config.apiUrl}/logout`);
}

function getAll() {
    return $getJSON(`${config.apiUrl}/users`);
}

function getById(id) {
    return $getJSON(`${config.apiUrl}/users/${id}`);
}

function register(user) {
    return $post(`${config.apiUrl}/users/register`, user);
}

function update(user) {
    return $put(`${config.apiUrl}/users/${user.id}`, user);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return $delete(`${config.apiUrl}/users/${id}`);
}
