import API_ADDRESS from './constants';

class Authorization {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  register(newUser) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: newUser.password,
        email: newUser.email
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  authorize(user) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: user.password,
        email: user.email
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  };
};

const auth = new Authorization(API_ADDRESS);

export default auth;
