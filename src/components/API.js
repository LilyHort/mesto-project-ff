// Запрос к серверу
// fetch('https://mesto.nomoreparties.co/v1/wff-cohort-8/', {
//   headers: {
//     authorization: '9b76b4e2-72c5-47c7-aa5b-879cc0bf4fd1'
//   }
// })
// .then((res) => {
//     return res.json(); // возвращаем результат работы метода и идём в следующий then
//   })

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
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
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
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

// Возвращает все карточки

function getInitialCards ()  {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  };

  // Добавляет новую карточку

  function addNewCard (cardName, cardLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(
            {
            name: cardName,
            link: cardLink
            })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }


export {getUserInfo, updateUserInfo, getInitialCards, addNewCard}

// Информация о пользователе


// fetch ("https://nomoreparties.co/v1/:wff-cohort-8/users/me"), {
//     method: "GET",
//     headers: {
//         authorization: '9b76b4e2-72c5-47c7-aa5b-879cc0bf4fd1'
//       }
// }
// .then((res) => {
// return res.json(); // возвращаем результат работы метода и идём в следующий then
//   })
// .then((res) => console.log(res))
 
// .then(res => console.log(res))

// Загрузка карточек с сервера

// fetch ("https://nomoreparties.co/v1/wff-cohort-8/cards"), {
//     method: "GET",
//     headers: {
//         authorization: '9b76b4e2-72c5-47c7-aa5b-879cc0bf4fd1'
//       }
// }
