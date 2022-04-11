class Api {
  constructor({ address, token }) {
    this.address = address
    this.token = token
  }

  getInitialCards() {
    return fetch(`${this.address}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => this._getResponseData(res))
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(id, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this.address}/cards/${id}/likes`, {
      method,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._getResponseData(res))
  }

    deleteCard(id) {
    return fetch(`${this.address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._getResponseData(res))
  }

  editProfile(data) {
    return fetch(`${this.address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }
    )
      .then(res => this._getResponseData(res))
  }

  editAvatar(data) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.link
      })
    }
    )
      .then(res => this._getResponseData(res))
  }

  addNewCard(data) {
    return fetch(`${this.address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    }
    )
      .then(res => this._getResponseData(res))
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-32",
  token: "aa423f91-d0a1-4966-9ae7-163cc71f5190"
})

export default api;