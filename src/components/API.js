import {checkResponse} from "../utils/utils.js";

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '9b76b4e2-72c5-47c7-aa5b-879cc0bf4fd1',
    'Content-Type': 'application/json'
  }
};

// Возвращает информацию о пользователе

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// Обнавляет информацию о пользователе

function updateUserInfo(nameUser, aboutUser) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(
      {
        name: nameUser,
        about: aboutUser
      })
  })
  .then(checkResponse)
}

// Возвращает все карточки

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
};

// Добавляет новую карточку

function addNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(
      {
        name: cardName,
        link: cardLink
      })
  })
  .then(checkResponse)
}

// Удаление каточки с сервера

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(checkResponse)
}


// Обновление аватара пользователя

function updateAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(
      {
        avatar: url

      })
  })
  .then(checkResponse)
}

// Добавление лайка 

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  })
  .then(checkResponse)
}

// Удаление лайка

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(checkResponse)
}

export { getUserInfo, updateUserInfo, getInitialCards, addNewCard, deleteCard, addLike, deleteLike, updateAvatar }
