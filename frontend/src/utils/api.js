class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // Метод для загрузки начальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  // Метод для добавления новой карточки
  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  // Метод для обновления данных пользователя
  updateUserInformation(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  // Метод для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    };
  };

  // Метод для добавления лайка
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: []
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  // Метод для удаления лайка
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  };

  // Метод изменения аватара
  updateAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: item.avatar
      })
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

const api = new Api('http://localhost:4000');

export default api;
