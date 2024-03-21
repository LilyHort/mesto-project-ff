// @todo: Темплейт карточки

import { openPopup } from "./modal.js";
import { addLike, deleteLike } from "./API.js"

const cardTemplate = document.querySelector("#card-template").content.querySelector('.card');
const popupDelete = document.querySelector(".popup_type_delete-card");

// @todo: Функция создания карточки

function createCard(item, deleteElement, openImage, addLikeButtonActiveClass) {
    const card = cardTemplate.cloneNode(true);
    const deleteButton = card.querySelector(".card__delete-button");
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const likeButton = card.querySelector(".card__like-button");
    const likeCounter = card.querySelector(".card__like-counter");

    card.dataset.card_id = item._id;

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    likeCounter.textContent = item.likes.length;

    cardImage.addEventListener("click", openImage);

    likeButton.addEventListener("click", (event) => addLikeButtonActiveClass(event, item._id));

    // Проверяем есть ли наш лайк на картинке

    if (item.likes.find(el => el._id == sessionStorage.userId)) {
        likeButton.classList.toggle("card__like-button_is-active");
    }

    if (item.owner._id != sessionStorage.userId) {
        deleteButton.remove();
    }
    else {
        console.log(`Add card: ${item._id} Owner: ${item.owner._id} User: ${sessionStorage.userId}`)
        deleteButton.addEventListener("click", () => deleteElement(item._id));
    }
    return card;
}

// Функция удаления карточки

function deleteElement(cardId) {
    popupDelete.dataset.card_id = cardId;
    openPopup(popupDelete);
}

// Добавление лайка

function addLikeButtonActiveClass(event, cardId) {
    const card = event.target.closest('.places__item');
    const likeCounter = card.querySelector(".card__like-counter");
    if (!event.target.classList.contains("card__like-button_is-active")) {
        addLike(cardId)
            .then((data) => {
                event.target.classList.toggle("card__like-button_is-active");
                likeCounter.textContent = data.likes.length;
            })
            .catch((err) => console.log(err))
    }
    else {
        deleteLike(cardId)
            .then((data) => {
                event.target.classList.toggle("card__like-button_is-active");
                likeCounter.textContent = data.likes.length;
            })
            .catch((err) => console.log(err))
    }
}

export { createCard, deleteElement, addLikeButtonActiveClass }
