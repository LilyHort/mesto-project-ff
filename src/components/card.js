// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content.querySelector('.card');

// @todo: Функция создания карточки

function createCard(item, deleteElement, openImage, addLikeButtonActiveClass) {
    const card = cardTemplate.cloneNode(true);
    const deleteButton = card.querySelector(".card__delete-button");
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const likeButton = card.querySelector(".card__like-button");

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    cardImage.addEventListener("click", openImage);

    likeButton.addEventListener("click", addLikeButtonActiveClass);

    deleteButton.addEventListener("click", deleteElement);

    return card;
}

// @todo: Функция удаления карточки

function deleteElement(event) {
 const card = event.target.closest(".places__item");
 card.remove()
}

// Добавление лайка

function addLikeButtonActiveClass(event) {
    event.target.classList.toggle("card__like-button_is-active");
}

export {createCard, deleteElement, addLikeButtonActiveClass}